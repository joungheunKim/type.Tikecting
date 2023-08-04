import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/users.service";

export class UserController {
    public userService = new UserService();
    
  // 접근제한자       public  protected  private
  // 클래스내부         O         O         O
  // 자식클래스내부     O         O         X
  // 클래스인스턴스     O         X         X
  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email: string = req.body.email;
      const password: string = req.body.password;
      const confirmPassword: string = req.body.confirmPassword;
      const nickname: string = req.body.nickname;
      const introduction: string = req.body.introduction;

      const { code, message } = await this.userService.signUp(
        email,
        password,
        confirmPassword,
        nickname,
        introduction
      );
      res.status(code).json(message);
    } catch (err) {
      next(err);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email: string = req.body.email;
      const password: string = req.body.password;

      const { token, code, message } = await this.userService.login(
        email,
        password
      );
      res.cookie("Authorization", `Bearer ${token}`);
      res.status(code).json(message);
    } catch (err) {
      next(err);
    }
  };

  public profile = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId: number = res.locals.user.userId;
      const { result, code } = await this.userService.profile(userId);
      res.status(code).json(result);
    } catch (err) {
      next(err);
    }
  };
}
