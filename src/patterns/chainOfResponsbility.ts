interface Handler {
    setNext(handler : Handler) : Handler
    handle(request : string ):void
}


abstract class BaseHandler implements Handler {
    private requestHandler : Handler | null = null 
    setNext(handler: Handler): Handler {
        this.requestHandler = handler
        return handler
    }
    handle(request: string): void {
        if(this.requestHandler){
            this.requestHandler.handle(request)
        }
    }
}


class AuthHandler extends BaseHandler {
    handle(request: string): void {
        if(request === "Auth"){
            console.log("this request is handle by auth")
        }else{
            super.handle(request)
        }
    }
}

class PaymentHandler extends BaseHandler {
    handle(request: string): void {
        if(request === "Pay"){
            console.log("this request is handle by Pay")
        }else{
            super.handle(request)
        }
    }
}

class LoggerHandler extends BaseHandler {
    handle(request: string): void {
        if(request === "Log"){
            console.log("this request is handle by Log")
        }else{
            super.handle(request)
        }
    }
}

let logger = new LoggerHandler()
let auth = new AuthHandler()
let pay = new PaymentHandler
logger.setNext(auth).setNext(pay)
logger.handle("Pay")



