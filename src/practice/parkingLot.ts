/*
Final Responsibilities
🏢 ParkingLot

Handle vehicle entry

Ask floors for spot

Create ticket

Handle vehicle exit

Calculate fee

🏬 Floor

Manage spots

Find available spot by size

Mark occupied/free

🅿️ Spot

Maintain size

Maintain occupancy state

Hold current vehicle

🚗 Vehicle

Store number

Store type

🎟 Ticket

Store vehicle

Store spot

Store entry time

Store exit time


💰 PricingService

Calculate duration

Apply pricing rules

Return total fee


✅ Step 1 — Understand problem
✅ Step 2 — Identify entities
✅ Step 3 — Define relationships
✅ Step 4 — Assign responsibilities
✅ Step 5 — Identify variation
✅ Step 6 — Introduce abstraction
✅ Step 7 — Walk through flows


*/

type VehicleType = "CAR" | "BIKE" | "TRUCK";
type SpotSize = "SMALL" | "MEDIUM" | "LARGE";

class Vehicle {
  constructor(
    public readonly vehicleNumber: string,
    public readonly vehicleType: VehicleType,
  ) {}
}

class Spot {
  private currentVehicle: Vehicle | null = null;

  constructor(
    public readonly spotId: string,
    public readonly size: SpotSize,
  ) {}

  public isAvailable(): boolean {
    return this.currentVehicle === null;
  }

  public canFitVehicle(vehicle: Vehicle): boolean {
    return this.size === this.getRequiredSize(vehicle.vehicleType);
  }

  public assignVehicle(vehicle: Vehicle): void {
    if (!this.isAvailable()) {
      throw new Error("Spot is already occupied");
    }

    if (!this.canFitVehicle(vehicle)) {
      throw new Error("Vehicle size does not match spot size");
    }

    this.currentVehicle = vehicle;
  }

  public removeVehicle(): void {
    this.currentVehicle = null;
  }

  private getRequiredSize(vehicleType: VehicleType): SpotSize {
    switch (vehicleType) {
      case "BIKE":
        return "SMALL";
      case "CAR":
        return "MEDIUM";
      case "TRUCK":
        return "LARGE";
      default:
        throw new Error("Invalid vehicle type");
    }
  }
}

class Floor {
  constructor(
    public readonly floorNumber: number,
    private readonly spots: Spot[],
  ) {}

  public findAndAssignSpot(vehicle: Vehicle): Spot | null {
    for (const spot of this.spots) {
      if (spot.isAvailable() && spot.canFitVehicle(vehicle)) {
        spot.assignVehicle(vehicle);
        return spot;
      }
    }
    return null;
  }
}

class Ticket {
  constructor(
    public readonly ticketId: string,
    public readonly vehicle: Vehicle,
    public readonly spot: Spot,
    public readonly entryTime: Date,
    public exitTime: Date | null = null,
    public totalAmount: number | null = null,
  ) {}

  public close(exitTime: Date, totalAmount: number): void {
    if (this.exitTime) {
      throw new Error("Ticket already closed");
    }

    this.exitTime = exitTime;
    this.totalAmount = totalAmount;
  }
}

class PricingService {
  private static rates: Record<VehicleType, number> = {
    BIKE: 10,
    CAR: 20,
    TRUCK: 30,
  };

  public calculate(ticket: Ticket): number {
    if (!ticket.exitTime) {
      throw new Error("Exit time not available");
    }

    const durationMs = ticket.exitTime.getTime() - ticket.entryTime.getTime();

    const durationHours = Math.ceil(durationMs / (1000 * 60 * 60));

    const rate = PricingService.rates[ticket.vehicle.vehicleType];

    return durationHours * rate;
  }
}

class ParkingLot {
  private ticketCount = 0;
  constructor(
    private readonly floors: Floor[],
    private readonly pricingService: PricingService,
  ) {}

  public handleEntry(vehicle: Vehicle): Ticket | null {
    for (const floor of this.floors) {
      const spot = floor.findAndAssignSpot(vehicle);

      if (spot) {
        const ticket = new Ticket(
          this.generateTicketId(),
          vehicle,
          spot,
          new Date(),
        );

        return ticket;
      }
    }

    return null;
  }

  public handleExit(ticket: Ticket): number {
    const exitTime = new Date();

    ticket.exitTime = exitTime;
    const fare = this.pricingService.calculate(ticket);

    ticket.close(exitTime, fare);

    ticket.spot.removeVehicle();

    return fare;
  }

  private generateTicketId(): string {
    const id = `tick-${Math.random()}-${this.ticketCount}`;
    this.ticketCount++;
    return id;
  }
}
