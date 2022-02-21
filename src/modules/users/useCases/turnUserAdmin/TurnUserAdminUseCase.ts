import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
  
    const user = this.usersRepository.findById(user_id)

    if(user.admin !== false){
      throw new Error("User already admin");
    }

    if(!user){
      throw new Error("User does't exists")
    }

    this.usersRepository.turnAdmin(user);

    return user;
  }
}

export { TurnUserAdminUseCase };
