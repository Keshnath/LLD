class Light {
    on(){
        console.log("The light is on");
    }
    off(){
        console.log("light is off")
    }
}

interface Command {
    execute() : void
}

class LightOnCommand implements Command {
    constructor(private light : Light){}
    execute(): void {
        this.light.on()
    }
}


class LightOffCommand implements Command {
    constructor(private light : Light){}
    execute(): void {
        this.light.on()
    }
}


class Button {
    constructor(private command : Command){}
    press ():void{
        this.command.execute()
    }
}


let light = new Light()
let onCommand = new LightOnCommand(light)
let offCommand = new LightOffCommand(light)
let button = new Button(onCommand)
button.press()
let offButton = new Button(offCommand)
button.press()
