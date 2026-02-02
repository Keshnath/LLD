interface Vehicle {
    drive(): void;
    currentSpeed(): number;
}

type VehicleCreator = ()=> Vehicle;

class Car implements Vehicle {
    drive(): void {
        console.log("Driving a car");
    }
     currentSpeed(): number {
        return 60;
    
     }


}

class Bike implements Vehicle {
    drive(): void {
        console.log("Riding a bike");
    }
     currentSpeed(): number {
        return 20;
    }
}


class VehicleFactory {
    private static registry  = new Map<string , VehicleCreator>()

    static registerVehicle(type: string, creator: VehicleCreator) {
        this.registry.set(type, creator);
    }

    static createVehicle(type: string): Vehicle {
        const creator = this.registry.get(type);
        if (!creator) {
            throw new Error(`Vehicle type ${type} is not registered.`);
        }
        return creator();
    }

}

VehicleFactory.registerVehicle("car", () => new Car());
VehicleFactory.registerVehicle("bike", () => new Bike)

// Usage
const myCar = VehicleFactory.createVehicle("car");  // we are not using the new for the VehicleFacory because it is a service not an instance
myCar.drive(); // Output: Driving a car
const myBike = VehicleFactory.createVehicle("bike");
myBike.drive(); // Output: Riding a bike

console.log(`Car speed: ${myCar.currentSpeed()} km/h`); // Output: Car speed: 60 km/h
console.log(`Bike speed: ${myBike.currentSpeed()} km/h`); // Output: Bike speed: 20 km/h

// const myTruck = VehicleFactory.createVehicle("truck"); // Throws Error: Vehicle type truck is not registered.   
// myTruck.drive();