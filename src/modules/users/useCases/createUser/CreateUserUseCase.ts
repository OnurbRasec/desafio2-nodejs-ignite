import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string,
  email: string,
  admin?: boolean,
  created_at?: Date,
  updated_at?: Date
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ name, email, admin, created_at, updated_at }: IRequest): User {
   
    const userAlreadyExist = this.usersRepository.findByEmail(email);
      
    if(userAlreadyExist){
        throw new Error("User already exists!")
    }

   return this.usersRepository.create({
      name,
      email,
      admin,
      created_at,
      updated_at

    });

  };

};

export { CreateUserUseCase };
