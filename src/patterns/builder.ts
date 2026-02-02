class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly phone?: string,
    public readonly address?: string,
    public readonly isVerified?: boolean
  ) {}
}

class UserBuilder {
  private id!: string;
  private name!: string;
  private email!: string;
  private phone?: string;
  private address?: string;
  private isVerified = false;

  setId(id: string) {
    this.id = id;
    return this;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setEmail(email: string) {
    this.email = email;
    return this;
  }

  setPhone(phone: string) {
    this.phone = phone;
    return this;
  }

  setAddress(address: string) {
    this.address = address;
    return this;
  }

  verifyUser() {
    this.isVerified = true;
    return this;
  }

  build(): User {
    return new User(
      this.id,
      this.name,
      this.email,
      this.phone,
      this.address,
      this.isVerified
    );
  }
}

