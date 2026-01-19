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






=============================================== Strategy Pattern ====================================================


Strategy Pattern defines a family of algorithms, puts each one in a separate class, and makes them interchangeable at runtime.

In LLD terms:
What changes → Strategy
What stays same → Context

Strategy Pattern allows us to define multiple algorithms behind a common interface and switch them at runtime without modifying the client code. It helps eliminate conditional logic and follows Open–Closed Principle.









TYPE_SCRIPT : 
    implements : In TypeScript, the implements keyword is used by a class to promise that it follows a specific contract defined by an interface.
    TS private ≠ JS #private