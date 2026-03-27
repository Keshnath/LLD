/*
Vending machine problem is the state pattern problem because as we know as per state change the behaviour of the machine changes 
Like - > Idle -> Processiong -> selection -> payment -> disperse and so on 

Final Functional Requirements

    The system should support multiple types of products (snacks and drinks)
    The user should be able to:
    Select a product
    Insert cash (coins/notes)
    The system should:
    Validate sufficient balance before dispensing
    Dispense the selected product
    Return change if required
    The system should handle:
    Insufficient funds
    Product out of stock
    Insufficient change (cancel transaction)
    The user should be able to cancel the transaction and get a refund

Final Non-Functional Requirements

    The system should support one user at a time (no concurrency)
    The system should be reliable (no partial transactions)


core Entities : 

    Product
        id, name
    
    1:M (vending Machine : Product)

    Slot 
        product
        quantity
        price
    1 : M Product

    MoneyInventory
        Map<denomination, count>
        addMoney()
        deductMoney()
        canReturnChange(amount)

    State (Interface / Abstract)
        handleSelectProduct()
        handleInsertMoney()
        handleDispense()

    Concrete States:
        IdleState
        HasMoneyState
        DispenseState

    VendingMachine
        currentState
        moneyInventory
        selectedSlot
        currentBalance

    

*/

class Product {
  constructor(public id: number, public name: string) {}
}

class Slot {
  public product: Product | null;
  public quantity: number;
  public price: number;

  constructor(
    public slotId: number,
    product: Product | null,
    quantity: number,
    price: number
  ) {
    this.product = product;
    this.quantity = quantity;
    this.price = price;
  }

  isAvailable(): boolean {
    return this.product !== null && this.quantity > 0;
  }

  dispense(): void {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }
}

class MoneyInventory {
  private cash: Map<number, number> = new Map(); // denomination → count

  addMoney(amount: number): void {
    this.cash.set(amount, (this.cash.get(amount) || 0) + 1);
  }

  deductMoney(amount: number): void {
    const count = this.cash.get(amount) || 0;
    if (count > 0) {
      this.cash.set(amount, count - 1);
    }
  }

  canReturnChange(amount: number): boolean {
    // Simplified logic (can improve later)
    let total = 0;
    for (let [denomination, count] of this.cash) {
      total += denomination * count;
    }
    return total >= amount;
  }
}

interface State {
  selectProduct(machine: VendingMachine, slotId: number): void;
  insertMoney(machine: VendingMachine, amount: number): void;
  dispense(machine: VendingMachine): void;
}

class IdleState implements State {
  selectProduct(machine: VendingMachine, slotId: number): void {
    const slot = machine.getSlot(slotId);

    if (!slot || !slot.isAvailable()) {
      console.log("Product not available");
      return;
    }

    machine.setSelectedSlot(slot);
    machine.setState(new HasMoneyState());
  }

  insertMoney(): void {
    console.log("Select product first");
  }

  dispense(): void {
    console.log("Select product and insert money first");
  }
}

class HasMoneyState implements State {
  selectProduct(): void {
    console.log("Product already selected");
  }

  insertMoney(machine: VendingMachine, amount: number): void {
    machine.addBalance(amount);

    const slot = machine.getSelectedSlot();
    if (slot && machine.getBalance() >= slot.price) {
      machine.setState(new DispenseState());
      machine.dispense();
    }
  }

  dispense(): void {
    console.log("Insert enough money first");
  }
}

class DispenseState implements State {
  selectProduct(): void {
    console.log("Processing current request");
  }

  insertMoney(): void {
    console.log("Already processing");
  }

  dispense(machine: VendingMachine): void {
    const slot = machine.getSelectedSlot();
    if (!slot) return;

    const change = machine.getBalance() - slot.price;

    if (!machine.getMoneyInventory().canReturnChange(change)) {
      console.log("Cannot return change. Refunding...");
      machine.refund();
      machine.setState(new IdleState());
      return;
    }

    slot.dispense();
    machine.getMoneyInventory().addMoney(machine.getBalance());

    console.log("Dispensed:", slot.product?.name);
    console.log("Returned change:", change);

    machine.reset();
    machine.setState(new IdleState());
  }
}

class VendingMachine {
  private slots: Map<number, Slot> = new Map();
  private moneyInventory: MoneyInventory = new MoneyInventory();
  private currentState: State = new IdleState();
  private selectedSlot: Slot | null = null;
  private currentBalance: number = 0;

  selectProduct(slotId: number) {
    this.currentState.selectProduct(this, slotId);
  }

  insertMoney(amount: number) {
    this.currentState.insertMoney(this, amount);
  }

  dispense() {
    this.currentState.dispense(this);
  }

  setState(state: State) {
    this.currentState = state;
  }

  addSlot(slot: Slot) {
    this.slots.set(slot.slotId, slot);
  }

  getSlot(slotId: number): Slot | null {
    return this.slots.get(slotId) || null;
  }

  setSelectedSlot(slot: Slot) {
    this.selectedSlot = slot;
  }

  getSelectedSlot(): Slot | null {
    return this.selectedSlot;
  }

  addBalance(amount: number) {
    this.currentBalance += amount;
  }

  getBalance(): number {
    return this.currentBalance;
  }

  getMoneyInventory(): MoneyInventory {
    return this.moneyInventory;
  }

  refund() {
    console.log("Refunding:", this.currentBalance);
    this.currentBalance = 0;
    this.selectedSlot = null;
  }

  reset() {
    this.currentBalance = 0;
    this.selectedSlot = null;
  }
}






















const machine = new VendingMachine();

// Create products
const coke = new Product(1, "Coke");
const chips = new Product(2, "Chips");

// Add slots
machine.addSlot(new Slot(101, coke, 5, 30));   // slotId, product, qty, price
machine.addSlot(new Slot(102, chips, 2, 20));

// ---- Scenario 1: Successful purchase ----
console.log("\n--- Scenario 1: Successful purchase ---");

machine.selectProduct(101);   // Coke (price = 30)
machine.insertMoney(10);
machine.insertMoney(20);      // total = 30 → should auto dispense


// ---- Scenario 2: Extra money → change ----
console.log("\n--- Scenario 2: With change ---");

machine.selectProduct(102);   // Chips (price = 20)
machine.insertMoney(50);      // should return 30 change


// ---- Scenario 3: Insufficient change ----
console.log("\n--- Scenario 3: No change available ---");

// Empty money inventory manually (simulate)
(machine as any).getMoneyInventory().cash = new Map([[10, 0], [20, 0]]);

machine.selectProduct(101);   // Coke (price = 30)
machine.insertMoney(50);      // cannot return 20 → refund


// ---- Scenario 4: Out of stock ----
console.log("\n--- Scenario 4: Out of stock ---");

// Reduce quantity to 0
const slot = machine.getSlot(102);
if (slot) slot.quantity = 0;

machine.selectProduct(102);   // should fail
