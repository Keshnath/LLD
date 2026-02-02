class PaymentService {
    processPayment(amount: number): void {
        console.log(`Processing payment of $${amount}`);
    }
}

class NotificationService {
    sendNotification(message: string): void {
        console.log(message)
}}

class InventoryService {
    getAvailibility(productId : number){
        return true 
    }
}
class ShipmentService {
    shipPayment(address : string){
        console.log("Shipped to address !" , address)
    }
}


class FacadeMethod {
    private payment = new PaymentService()
    private notification = new NotificationService()
    private Inventory = new InventoryService()
    private Shipment = new ShipmentService()

    placeOrder(id :number , amount : number , address : string , message:string):void {
        if(!this.Inventory.getAvailibility(id)){
            throw new Error("Product not available !")
        }
        this.payment.processPayment(amount)
        this.Shipment.shipPayment(address)
        this.notification.sendNotification(message)
    }

}

let obj = new FacadeMethod()
obj.placeOrder(1 , 200 , "this is the address" , "this is the message!")