import { Request, Response, NextFunction } from 'express';
import { ConcertService } from '../services/concert.service'; 

type DateRegistrationParamType = {
  concertId: number;
} & Request['params'];

export class ConcertController {
  private concertService = new ConcertService();

  public concertRegistration = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const title: string = req.body.title;
      const artist: string = req.body.artist;
      const date: Date = req.body.date;
      const price: number = req.body.price;
      const location: string = req.body.location;
      const introduction: string = req.body.introduction;
      const userId: number = res.locals.user.id;
      const { result, code, message } = await this.concertService.concertRegistration(
        userId,
        title,
        artist,
        date,
        price,
        location,
        introduction
      );
      res.status(code).json({ result, message });
    } catch (err) {
      next(err);
    }
  };

  public datesRegistration = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //  구조분해할당 타입지정은 제네릭 함수 공부 후 시도
      // params는 string타입인데 어떻게 number로 바꿔줄까
      const concertId = req.params.concertId;
      const dates = req.body;
      const { results, code, message } = await this.concertService.datesRegistration(
        concertId as unknown as number,
        dates
      );
      res.status(code).json({ message, results });
    } catch (err) {
      next(err);
    }
  };

  public concertList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { results, code } = await this.concertService.concertList();
      res.status(code).json(results);
    } catch (err) {
      next(err);
    }
  };

  public concertDetail = async (req: Request, res: Response, next: NextFunction) => {
    const { concertId } = req.params;
    const { result, code } = await this.concertService.concertDetail(
      concertId as unknown as number
    );
    res.status(code).json(result);
  };

  public searchConcert = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const keyword = req.query.keyword;
      const { code, results } = await this.concertService.searchConcert(keyword as string);
      res.status(code).json(results);
    } catch (err) {
      next(err);
    }
  };
}
