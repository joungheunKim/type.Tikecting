import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';

export class UserRepository {

  private userRepository = AppDataSource.getRepository(User);

  public signUp = async (
    email: string,
    password: string,
    nickname: string,
    introduction: string
  ) => {
    return this.userRepository.save({ email, password, nickname, introduction });
  };

  public findByEmail = async (email: string) => {
    return this.userRepository.findOneBy({ email });
  };

  public findById = async (id: number) => {
    return this.userRepository.findOne({
      where: { id },
      select: { id: true, email: true, nickname: true, point: true, is_admin: true },
    });
  };
}