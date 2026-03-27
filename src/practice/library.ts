enum BookStatus {
  AVAILABLE = "AVAILABLE",
  BORROWED = "BORROWED",
}

class Book {
  private status: BookStatus = BookStatus.AVAILABLE;

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly author: string
  ) {}

  public borrow(): void {
    if (this.status === BookStatus.BORROWED) {
      throw new Error("Book is already borrowed");
    }
    this.status = BookStatus.BORROWED;
  }

  public return(): void {
    if (this.status === BookStatus.AVAILABLE) {
      throw new Error("Book is not borrowed");
    }
    this.status = BookStatus.AVAILABLE;
  }

  public isAvailable(): boolean {
    return this.status === BookStatus.AVAILABLE;
  }
}


class UserData {
  private borrowedRecords: BorrowRecord[] = [];
  private static readonly MAX_BORROW_LIMIT = 3;

  constructor(
    public readonly id: string,
    public readonly name: string
  ) {}

  public canBorrow(): boolean {
    return this.borrowedRecords.length < UserData.MAX_BORROW_LIMIT;
  }

  public addBorrowRecord(record: BorrowRecord): void {
    this.borrowedRecords.push(record);
  }

  public removeBorrowRecord(record: BorrowRecord): void {
    this.borrowedRecords = this.borrowedRecords.filter(
      r => r !== record
    );
  }

  public getBorrowedRecords(): BorrowRecord[] {
    return this.borrowedRecords;
  }
}

class BorrowRecord {
  public returnDate: Date | null = null;

  constructor(
    public readonly book: Book,
    public readonly user: UserData,
    public readonly borrowDate: Date = new Date()
  ) {}

  public markReturned(): void {
    if (this.returnDate !== null) {
      throw new Error("Book already returned");
    }
    this.returnDate = new Date();
  }

  public isActive(): boolean {
    return this.returnDate === null;
  }
}

class Library {
  private books: Map<string, Book> = new Map();
  private users: Map<string, UserData> = new Map();
  private borrowRecords: BorrowRecord[] = [];

  public addBook(book: Book): void {
    this.books.set(book.id, book);
  }

  public registerUser(user: UserData): void {
    this.users.set(user.id, user);
  }

  public borrowBook(userId: string, bookId: string): void {
    const user = this.users.get(userId);
    const book = this.books.get(bookId);

    if (!user) throw new Error("UserData not found");
    if (!book) throw new Error("Book not found");

    if (!user.canBorrow()) {
      throw new Error("UserData reached borrow limit");
    }

    book.borrow(); // Book controls availability

    const record = new BorrowRecord(book, user);
    this.borrowRecords.push(record);

    user.addBorrowRecord(record);
  }

  public returnBook(userId: string, bookId: string): void {
    const user = this.users.get(userId);
    const book = this.books.get(bookId);

    if (!user || !book) {
      throw new Error("Invalid user or book");
    }

    const record = this.borrowRecords.find(
      r => r.book === book && r.user === user && r.isActive()
    );

    if (!record) {
      throw new Error("No active borrow record found");
    }

    record.markReturned();
    book.return();
    user.removeBorrowRecord(record);
  }
}

