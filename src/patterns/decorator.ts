interface Coffee {
    cost(): number;
    description(): string;
}

class SimpleCoffee implements Coffee{   
    cost(): number {
         return 100
    }

    description(): string {
        return "this is simple coffee"
    }
}

abstract class CoffeeDecorator implements Coffee {
    protected coffee : Coffee
    constructor(coffee : Coffee){
        this.coffee = coffee
    }
    abstract cost(): number;
    abstract description(): string; 
}

// so basically what is happening here that we have a base coffee class and now we have to add new same kind of things but with some additonal 
// feature if we add it into the Simple coffee than it will voilate the O/C principle and single resposiblity 
 // so we have make a new abstract class which will be extend by and one and add new things into the upcoming classes 
 // it stops inheritence chaining !


 class MilkCoffee extends CoffeeDecorator{
    cost(): number {
         return this.coffee.cost() + 20
    }

    description(): string {
         return this.coffee.description() + "with extra milk!!!"
    }
 }

 class NewKindOfCoffee extends CoffeeDecorator{
    cost(): number {
         return this.coffee.cost() + 200
    }
    description(): string {
         return this.coffee.description() + "a new kind of cofee"
    }
 }

 let cof = new SimpleCoffee()
 console.log(cof.cost())
 console.log(cof.description())

 let milkcof = new MilkCoffee(cof)
 console.log(milkcof.cost())
 console.log(milkcof.description())

let newKa = new NewKindOfCoffee(cof)
 console.log(newKa.cost())
 console.log(newKa.description())
