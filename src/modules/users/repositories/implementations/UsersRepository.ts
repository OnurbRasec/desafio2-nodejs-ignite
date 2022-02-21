import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email , admin = false, created_at = new Date(), updated_at = new Date()}: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      admin,
      created_at,
      updated_at

    });

    this.users.push(user);

    return user;

  }

  findById(id: string): User | undefined {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  turnAdmin(receivedUser: User): User {
    const newAdmin = this.users.find(user => user.id === receivedUser.id)

    Object.assign(newAdmin, {admin: true, updated_at: new Date()});

    return newAdmin;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
