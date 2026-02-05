interface Observer {
    update(data : number) : void
}

interface Subject {
    subscribe(observer : Observer) : void
    unsubscribe(observer : Observer) : void
    notify():void
}


class MobileUsers implements Observer {
    update(data: number): void {
        console.log("the temprature for mobile user is "+ data )
    }
}

class WebUsers implements Observer {
    update(data: number): void {
        console.log("the temprature for web user is "+ data )
        
    }
}


class WeatherSubject implements Subject {
    private temprature : number = 27
    private subscribers : Observer[] = [] 


    subscribe(observer : Observer){
        this.subscribers.push(observer)
    }

    unsubscribe(observer: Observer): void {
        this.subscribers = this.subscribers.filter((subs)=>subs !== observer)
    }

    addTemprature(temp : number):void{
        this.temprature = temp
        this.notify()
    }

    notify(): void {
        this.subscribers.forEach((sub)=>sub.update(this.temprature))
    }

}

let w = new WeatherSubject()
let mob = new MobileUsers()
let web = new WebUsers()

w.subscribe(mob)
w.subscribe(web)

w.addTemprature(100)