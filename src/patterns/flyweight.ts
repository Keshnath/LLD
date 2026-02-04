
class TreeType{
    constructor(private name : string , private color : string , private texture : string ){}

    drwa(x : number , y : number):void{
        console.log(
            `draw ${this.name} with color ${this.color} with texture ${this.texture} at postion ${x} and ${y}`
        )
    }

}

class TreeTypeFactory {
    private static treeTypes = new Map<string , TreeType>()
    static getTreeType(name : string , color : string , texture : string):TreeType{
        const key = `${name}-${color}-${texture}`
        if(!this.treeTypes.has(key)){
            this.treeTypes.set(key , new TreeType(name , color , texture))
        }
        return this.treeTypes.get(key)!
    }
}


class Tree {
    constructor(public x : number , public y : number , private type : TreeType){
    }

    drawTree():void{
        this.type.drwa(this.x , this.y)
    }
}


let trees = []
 trees.push(new Tree(20 , 40 , TreeTypeFactory.getTreeType("one" , "color" , "texture")))
trees.push(new Tree(40 , 60 , TreeTypeFactory.getTreeType("two" , "colrr" , "texturw")))
trees.push(new Tree(60 , 80 , TreeTypeFactory.getTreeType("two" , "coloww" , "texturwe")))

trees.forEach((tree)=>tree.drawTree())