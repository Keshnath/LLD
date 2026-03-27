SOLID PRINCINPLES : 

1. Single Responsibility Principle : 
    If a requirement changes, how many reasons does this class break?
    if it is more than one than this is voilation !
    "Single Responsibility Principle states that a class should have only one reason to change, meaning it should encapsulate a
     single responsibility or business capability. "

     So basically in this if we have a class than it work is to done for one thing if there is something change than the whole logic should't be change 

                    export class UserService {
            constructor(
                private readonly userRepo: UserRepository,       these were the things which may change which alter the SRP 
                private readonly passwordHasher: PasswordHasher,
                private readonly emailService: EmailService
            ) {}

            async registerUser(email: string, password: string) {
                if (!email.includes("@")) {
                throw new Error("Invalid email");
                }

                if (password.length < 6) {
                throw new Error("Weak password");
                }

                const existingUser = await this.userRepo.findByEmail(email);
                if (existingUser) {
                throw new Error("User already exists");
                }

                const hashedPassword = await this.passwordHasher.hash(password);

                const user = new User(
                Date.now().toString(),
                email,
                hashedPassword,
                false
                );

                await this.userRepo.create(user);

                await this.emailService.sendVerificationEmail(email);

                return user;
            }
            }


2. Dependency Injection Principle : 
    
    High-level modules should not depend on low-level modules.
    Both should depend on abstractions.

    ❌ Business logic depending on MongoDB, bcrypt, nodemailer
    ✅ Business logic depending on interfaces

    “My core logic doesn’t care how things are done, only what is done.”

    export class UserService {
    private userRepo = new MongoUserRepository();
    private hasher = new BcryptHasher();
    }

    Service is hard-coupled
    Cannot replace MongoDB
    Cannot mock for tests
    Violates DIP

    here in this we inject the dependencies in the services on the server start so that that service is loosly coupled !

3. Open Close Principle : 

    Software entities should be open for extension but closed for modification.

    ⚠️ This does NOT mean:
    “Never change code”
    “Write everything generic”
    ✅ It means:
    “When requirements change, I add new code instead of editing stable code.”

    OCP Depends on Two Things (You Already Have Them)
    Abstractions (interfaces)	✅ DONE
    Dependency Injection	✅ DONE


4 .Liskov Substitution Principle (LSP) : 

    LSP is about behavioral contracts, not method signatures.(HOw method should behave method override same name different signature )
    Objects of a superclass should be replaceable with objects of its subclasses without breaking the program.
    Ask this:
    “If I swap one implementation with another,
    does the program still behave correctly?”

    If yes → LSP respected
    If no → LSP violated

    So this one is depends on we can say on the polymorphosm if we have derived the code and we are reusing it or creating a new method out of this 
    than it should follw the same return type as before , Overriding not give the new results 

    export interface PasswordHasher {
    hash(password: string): Promise<string>;
    }

    What does this interface promise?

    Implicit contract:
    Always returns a hashed string
    Never throws for valid input
    Deterministic for same algorithm

    export class BrokenPasswordHasher implements PasswordHasher {
    async hash(password: string): Promise<string> {
        if (password.length < 10) {
        throw new Error("Password too short");
        }
        return "hashed_" + password;
    }
    }

    One hasher throws
    Another does not
    Same input → different behavior
    👉 Swapping implementations breaks assumptions
    👉 LSP violated

    LSP in Repositories (Very Common Interview Trap)
    export interface UserRepository {
    findByEmail(email: string): Promise<User | null>;
    }
    async findByEmail(email: string): Promise<User | null> {
    throw new Error("Not implemented");
    }
     🚨 This violates LSP because:
    Caller expects null if not found
    Gets exception instead

    Correct !
    async findByEmail(email: string): Promise<User | null> {
    return null;
    }

    “Liskov Substitution Principle ensures that implementations of an abstraction can be substituted without altering the correctness of the system.
    I ensure this by keeping validation and error handling consistent and by defining clear behavioral contracts.”


5. Interface Segregation Principle (ISP) :

    Clients should not be forced to depend on interfaces they do not use.
    Ask this question:

    “Is this class forced to implement methods it doesn’t care about?”

    If yes → ISP violated
    If no → ISP respected

    ISP exists to prevent:
    Fat / god interfaces
    Fake implementations
    throw new Error("Not implemented")
    LSP violations

    Interface Segregation Principle states that clients should depend only on the methods they use.
    I apply this by designing small, focused interfaces instead of fat ones, which improves substitutability and prevents LSP violations.

    export interface UserRepository {
    create(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    deleteById(id: string): Promise<void>;
    update(user: User): Promise<User>;
    }

    Now imagine a service that only needs read access.
    🚨 Problem:
    That service is now coupled to write operations
    Fake implementations must implement unused methods
    LSP violations start creeping in

    class ReadOnlyUserService {
    constructor(private repo: UserRepository) {}

    async getUser(email: string) {
        return this.repo.findByEmail(email);
    }
    }

    But now you create:

    class InMemoryUserRepository implements UserRepository {
  async findByEmail() { return null; }

  async create() {
    throw new Error("Not supported");
  }

  async deleteById() {
    throw new Error("Not supported");
  }

  async update() {
    throw new Error("Not supported");
  }
}


so basially here we have to write the code for the user service which user don;t even need because of the interface design in such way
to overcome this we split the interfaces and into read and write and where we need the accumulated one we will extend the interfaces 





================================= PATTERNS =======================================

| File         | Responsibility         |
| ------------ | ---------------------- |
| `controller` | HTTP layer only        |
| `service`    | Business logic         |
| `repository` | DB access              |
| `schema`     | Mongoose schema        |
| `dto`        | Input validation shape |
| `module`     | Wiring (like NestJS)   |


====================================== Gama Categorization ========================

Gamma Categorization (often called Gamma Design Patterns) refers to the classification of design patterns introduced by the “Gang of Four” (GoF)—Erich Gamma and co-authors—in the book Design Patterns: Elements of Reusable Object-Oriented Software.

It’s a way to group design patterns by the kind of problem they solve.

Creational Patterns :
    👉 Focus on how objects are created
👉 Hide object-creation logic instead of using new everywhere
    Why needed?

    Control object creation
    Reduce tight coupling
    Improve flexibility and testability
    Common patterns:

    Singleton
    Factory Method
    Abstract Factory
    Builder
    Prototype

    // Instead of new User() everywhere
    const user = userFactory.create(type);

Structural Patterns : 
    👉 Focus on how classes and objects are composed
👉 Help form large structures while keeping them flexible

    Why needed?

    Simplify relationships
    Adapt incompatible interfaces
    Avoid tightly coupled systems

    Common patterns:
    Adapter
    Decorator
    Facade
    Composite
    Proxy
    Bridge

    // Wrapper around an existing service
const cachedUserService = new CacheDecorator(userService);

    Behavioral Patterns: 👉 Focus on communication between objects
    👉 Define how responsibilities are distributed

    Why needed?
    Reduce conditional logic
    Improve extensibility
    Cleanly handle different behaviors

    Common patterns:
    Strategy
    Observer
    Command
    Chain of Responsibility
    State
    Template Method
    Mediator

    // Strategy pattern
notificationService.send(new EmailStrategy());
notificationService.send(new SMSStrategy());

Creational	How objects are made
Structural	How objects are connected
Behavioral	How objects talk & act


================================== Builder ==============================================


Imagine you have a class with many optional fields:
User(
  id,
  name,
  email,
  phone?,
  address?,
  profileImage?,
  isVerified?,
  createdAt?
)
You end up with:
❌ Huge constructors
❌ Too many parameters
❌ Hard to read & maintain
❌ Bugs from wrong parameter order

Builder Pattern is used to construct complex objects step-by-step, allowing different representations using the same construction process.




=================================== Factories ===============================================

Encapsulate object creation logic and return objects without exposing the new keyword to the client.

In short:

Client asks for an object
Factory decides which class to instantiate
Client doesn’t care how

1) Factory Methond : 
2) Factory :
3) Abstract Factory : 



================================== Prototype =================================================

Create new objects by cloning existing objects instead of creating them from scratch.

“Don’t build from zero. Copy and tweak.”


When to Use
Object creation is expensive
You need many similar objects
Objects have complex configuration
You want to avoid constructor overloads

Prototype → defines clone() / deepCopy()
Concrete Prototype → implements cloning
Client → clones instead of using new


class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  deepCopy() {
    return new Point(this.x, this.y);
  }
}

const p1 = new Point(1, 2);
const p2 = p1.deepCopy();

p2.x = 10;

console.log(p1.x); // 1 ✅


Core components
Prototype Interface
Declares clone()
Concrete Prototype
Implements cloning logic
Client
Uses clone instead of new



========================================== Singleton ===================================================

Singleton = exactly ONE instance of a class for the entire application lifecycle.
Ensure single shared state
Control access to a global resource
Avoid multiple expensive initializations

Very common in backend systems:
Database connection pool
Logger
Cache (Redis client, in-memory cache)
Configuration manager
Feature flags service

class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }

    this.createdAt = new Date();
    Singleton.instance = this;
  }

  log(message) {
    console.log(`[Singleton]: ${message}`);
  }
}

// usage
const s1 = new Singleton();
const s2 = new Singleton();

console.log(s1 === s2); // true


“Classic Singleton hides dependencies and hurts testability.
In modern systems, we remove Singleton logic from the class and let DI or the application lifecycle manage single instances.

=========================================== Adapter / Converter ==============================================================


Think of Adapter as “making two incompatible things work together without changing them.”

👉 Old code stays untouched. New code fits in smoothly.

Use Adapter when:
You cannot change existing (legacy / 3rd-party) code
Interfaces don’t match
You want to reuse old functionality in a new system
Common backend scenarios (very relevant for you 👇):
Integrating 3rd-party APIs
Migrating legacy services
Normalizing responses from multiple vendors

class OldPaymentGateway {
  makePayment(amount) {
    console.log(`Paid ${amount} using Old Gateway`);
  }
}

class PaymentProcessor {
  pay(amount) {
    throw new Error("Method not implemented");
  }
}

class PaymentAdapter extends PaymentProcessor {
  constructor(oldGateway) {
    super();
    this.oldGateway = oldGateway;
  }

  pay(amount) {
    this.oldGateway.makePayment(amount);
  }
}


============================================== Bridge ============================================================

Abstraction  ──────▶  Implementation
     ↑                      ↑
RefinedAbstraction   ConcreteImplementation

It separates what a class does from how it does it.
👉 Avoid class explosion
👉 Avoid huge inheritance trees
👉 Make systems flexible without rewriting everything

Two sides of the bridge

Abstraction → What the client uses
Implementation → How the work is actually done

Bridge is chosen when TWO THINGS CHANGE FOR DIFFERENT REASONS

Remote HAS A device.

One thing gives orders, another thing knows how to execute them.





=============================================== Composite =========================================================

Composite pattern lets clients treat individual objects and compositions of objects uniformly by organizing them in a tree structure

class FileSystemItem {
  getSize() {
    throw new Error("Method not implemented");
  }
}


class File extends FileSystemItem {
  constructor(name, size) {
    super();
    this.name = name;
    this.size = size;
  }

  getSize() {
    return this.size;
  }
}


class Folder extends FileSystemItem {
  constructor(name) {
    super();
    this.name = name;
    this.children = [];
  }

  add(item) {
    this.children.push(item);
  }

  getSize() {
    return this.children.reduce(
      (total, item) => total + item.getSize(),
      0
    );
  }
}


const file1 = new File("a.txt", 10);
const file2 = new File("b.txt", 20);

const folder1 = new Folder("docs");
folder1.add(file1);
folder1.add(file2);

const root = new Folder("root");
root.add(folder1);
root.add(new File("c.txt", 5));

console.log(root.getSize()); // 35


================================================= Decorator Pattern ========================================

I want to add new behavior to an object without modifying its class and "without exploding subclasses"

Decorator Pattern lets you wrap an object to add new behavior "dynamically", without changing the original object.

Implement the same interface

Hold a reference to that interface

Delegate work + add extra behavior

A decorator HAS-A component and IS-A component.


===================================================  Facade Pattern ===========================================

Provide a simple interface to a complex subsystem.

Facade = “Don’t talk to 5 services. Talk to me.”

Imagine a user checkout flow:

InventoryService

PaymentService

ShippingService

NotificationService

Without Facade 👇
Client needs to know order, rules, dependencies, failure cases.

That’s tight coupling + high cognitive load.

it is act as orchastrat class which internally talk to multple class 


========================================================= Flyweight Pattern ===========================================

Don’t create the same heavy object again and again. Share it.
When you have tons of similar objects, Flyweight helps you reuse shared data instead of duplicating it.
Think memory optimization, not behavior.

Example multiple trees type in gaming arean which share same kind of texture and all 

Flyweight doesn’t model “real-world ownership”
It models “where the expensive behavior belongs”.

=========================================================== Proxy Pattern  =============================================



========================================================== Chain of responsibility ====================================

Imagine this flow:

You → Customer Support → Team Lead → Manager → Director

You raise a request.
If Customer Support can handle it → done.
If not → pass it up the chain.
No one knows who exactly will solve it — just that someone in the chain might.

That’s Chain of Responsibility in a nutshell.

Decouple the sender of a request from its receivers
by giving multiple objects a chance to handle it.


============================================================ Interpreter Pattern ========================================




============================================================= Mediator Pattern ===========================================

Move all communication logic into one central object (Mediator).
Components don’t talk to each other — they talk to the mediator.

Think of Air Traffic Control ✈️

Planes don’t talk to each other

All communication goes through ATC (Mediator)

1️⃣ Mediator Interface

Defines how components communicate.

2️⃣ Concrete Mediator

Contains the coordination logic.

3️⃣ Components (Colleagues)

Know only the mediator

Never reference each other directly


================================================================ Memento Pattern ===================================================

Think Ctrl + Z / Undo.

You’re typing in an editor

You hit save snapshot

Later you mess things up

You hit undo

Boom 💥 state restored

But you never directly poked into the editor’s internals

That’s Memento.

“I want to save and restore an object’s state
without breaking encapsulation.”


1️⃣ Originator

The real object

Has internal state

Creates & restores mementos

2️⃣ Memento

Snapshot of state

Usually immutable

No logic, just data

3️⃣ Caretaker

Manages history

Stores mementos

Never reads/modifies memento internals

👉 Caretaker = “I keep it safe, I don’t look inside 👀”

Caretaker  ---->  Memento  <----  Originator
                     ^
                     |
               (created & restored by Originator)


===================================================== Observer Pattern ==============================================

Observer Pattern defines a one-to-many dependency between objects so that
when one object changes state, all its dependents are notified automatically.

YouTube Channel

Subject → YouTube Channel
Observers → Subscribers
Event → New video uploaded

Observer decouples state change from side effects.



=========================================================== State Pattern ============================================ 

“An object behaves differently depending on its internal state.”

Problem statement:

You have an object whose behavior changes based on its current state.

Example:
A Traffic Light
A Vending Machine
A Document Editor
A Order lifecycle (Created → Paid → Shipped → Delivered)



State Pattern allows an object to alter its behavior when its internal state changes. The object will appear to change its class.

Context

The main object (e.g., Order, VendingMachine)

Holds a reference to a State

State (interface)

Declares behavior common to all states

Concrete States

Implement behavior for a specific state

State Transitions

States decide when & how to move to another state


=============================================== Strategy Pattern ====================================================


Strategy Pattern defines a family of algorithms, puts each one in a separate class, and makes them interchangeable at "runtime" the runtime is important .

In LLD terms:
What changes → Strategy
What stays same → Context

Strategy Pattern allows us to define multiple algorithms behind a common interface and switch them at runtime without modifying the client code. It helps eliminate conditional logic and follows Open–Closed Principle.


Strategy (interface) – common contract

Concrete Strategies – actual implementations

Context – uses a strategy, doesn’t know the details




////////////////////////////////////////////////////////////////////////////////////////////////////////////




“What is changing?”
“What might grow in the future?”
“What will make this code ugly in 6 months?”



=====


TYPE_SCRIPT : 
    implements : In TypeScript, the implements keyword is used by a class to promise that it follows a specific contract defined by an interface.
    TS private ≠ JS #private





1️⃣ Who owns this data?
2️⃣ Who changes this data?
3️⃣ Who is responsible for this behavior?



What are the functional requirements?
Any constraints?
Fixed or configurable?
What assumptions can I make?



✅ Step 2: Identify Core Entities (Nouns Only)

Write only nouns from the problem.

Example (Parking Lot):

ParkingLot
Floor
ParkingSpot
Vehicle
Ticket
Payment

✅ Step 3: Define Relationships

Ask:

Who contains whom?

Who owns whom?

Example:

ParkingLot → Floors
Floor → Spots
Spot → Vehicle
Ticket → Vehicle + Spot
Still no patterns.
Just structure.

✅ Step 4: Assign Responsibilities (VERY IMPORTANT)

For each entity, ask:

Object	What does it own?	What does it do?

Example:

Ticket:

Owns entryTime, exitTime

Calculates duration

Spot:

Owns occupancy

Can park / unpark

ParkingLot:

Orchestrates entry & exit

This step reduces 70% confusion.

Because responsibility becomes clear.


Step 5: Identify Variation Points

Ask:

What may change in future?

Examples:

Pricing logic

Spot allocation logic

Payment method

Only NOW think about abstraction.

If something may change → extract interface.

If not → keep simple.



Design from top to low and write code from low to high ---------------------




Entity Name:
  1. What it KNOWS (state/data)
  2. What it DOES (behavior)
  3. Why it owns this responsibility


  Whenever you see:

date

timestamp

status history

return date

fine

renew count

You are probably dealing with a relationship entity, not a core entity.

“Who owns the data required to validate the action?”