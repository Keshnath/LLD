class EditorMemento {
    constructor(private readonly data : string){}
    getData():string{
        return this.data
    }
}


class Editor {
    private content : string  = ""

    type(text:string){
        this.content += text
    }

    save():EditorMemento{
        return new EditorMemento(this.content)
    }

    restore(memento : EditorMemento){
        this.content = memento.getData()
    }

    show(){
        console.log(this.content)
    }

}

class ManageHistory {
    private mementos : EditorMemento[] = []

    push(memento : EditorMemento){
        this.mementos.push(memento)
    }
    pop() : EditorMemento | undefined{
        return this.mementos.pop()
    }

}

let editor = new Editor()
let h1 = new ManageHistory()
editor.type("hello")
h1.push(editor.save())

editor.type("World!");
h1.push(editor.save());

editor.show(); // Hello World!

editor.restore(h1.pop()!);
editor.show(); // Hello World!

editor.restore(h1.pop()!);
editor.show(); // Hello