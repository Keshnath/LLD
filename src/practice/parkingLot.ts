/*

✅ Step 1 — Understand problem
✅ Step 2 — Identify entities
✅ Step 3 — Define relationships
✅ Step 4 — Assign responsibilities
✅ Step 5 — Identify variation
✅ Step 6 — Introduce abstraction
✅ Step 7 — Walk through flows

*/

enum VehicleType {
    BIKE = "BIKE" ,
    CAR ="CAR" ,
    TRUCK = "TRUCK"
}

class Vehicle {
    plateNumber : string  
    vehicleType : VehicleType 

    constructor(plateNumber : string , type : VehicleType){
        this.plateNumber = plateNumber 
        this.vehicleType = type
    }
}

enum ParkingSpotType {
    SMALL = "SMALL" ,
    MEDIUM = "MEDIUM",
    LARGE = "LARGE"
}

class ParkingSpot {
    vehicle : Vehicle | null = null 
    spotId : string 
    spotType : ParkingSpotType

    constructor(spotId : string , spotType : ParkingSpotType){
        this.spotId = spotId 
        this.spotType = spotType
    }

    isAvailable(){
        return this.vehicle === null 
    }

    parkVehicle(vehicle : Vehicle){
        this.vehicle = vehicle
    }

    unparkVehicle():void{
        this.vehicle = null
    }

    canFitVehicle(vehicle : Vehicle):boolean{
        if(vehicle.vehicleType === VehicleType.BIKE){
            return this.spotType === ParkingSpotType.SMALL
        }
        if(vehicle.vehicleType === VehicleType.CAR){
            return (this.spotType === ParkingSpotType.MEDIUM || this.spotType === ParkingSpotType.LARGE)
        }
        if(vehicle.vehicleType === VehicleType.TRUCK){
            return this.spotType === ParkingSpotType.LARGE
        }
        return false
    }
}

class Floor {
    floorNumber : string
    spots : ParkingSpot[] = []
    constructor(floorNumber : string){
        this.floorNumber = floorNumber
    }

    addSpot(spot : ParkingSpot){
        this.spots.push(spot)
    }

    removeSpot(spot : ParkingSpot){
        this.spots = this.spots.filter((currSpot : ParkingSpot)=> currSpot === spot)
    }

    findSpot(vehicle : Vehicle):ParkingSpot | null{
        for(let spot of this.spots){
            if(spot.isAvailable() && spot.canFitVehicle(vehicle)){
                return spot
            }
        }
        return null
    }

}

class Ticket {
    ticketId : string 
    vehicle : Vehicle
    entryTime : Date 
    spot : ParkingSpot 
    exitTime : Date | null = null 

    constructor(vehicle : Vehicle , spot : ParkingSpot){
        this.ticketId =Math.random().toString(36).substring(2)
        this.vehicle = vehicle 
        this.entryTime = new Date()
        this.spot = spot
    }
}