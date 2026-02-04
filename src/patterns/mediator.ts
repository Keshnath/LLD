interface Mediator {
    notify(sender: object, event: string): void;
}

class BaseComponent {
    protected mediator : Mediator
    constructor(mediator : Mediator){
        this.mediator = mediator
    }
}

class ClickAbleBotton extends BaseComponent{

    click():void{
        console.log("button click")
        this.mediator.notify(this , 'click')
    }

}

class TextBox extends BaseComponent{
    addText(text : string):void{
        console.log("Text added")
        this.mediator.notify(this , "text adddedd by")
    }
}

class DialogMediator implements Mediator {
  private button!: ClickAbleBotton;
  private textBox!: TextBox;

  setButton(button: ClickAbleBotton) {
    this.button = button;
  }

  setTextBox(textBox: TextBox) {
    this.textBox = textBox;
  }

  notify(sender: object, event: string): void {
    if (sender === this.button && event === "click") {
      this.textBox.addText("Button was clicked!");
    }
  }
}


let mediator = new DialogMediator()
let button1 = new ClickAbleBotton(mediator)
let textBox = new TextBox(mediator)
mediator.setButton(button1)
mediator.setTextBox(textBox)
button1.click()
