import { Request, Response, NextFunction } from 'express';
import { ReservationService } from ;

export class ReservationController {
  reservationService = new ReservationService();

  public reservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        concertId,
        dateId,
        quantity,
      }: { concertId: number; dateId: number; quantity: number } = req.body;
      const userId = res.locals.user.id;
      const { reservation, code, message } = await this.reservationService.reservation(
        userId,
        concertId,
        dateId,
        quantity
      );
      res.status(code).json({ message, reservation });
    } catch (err) {
      next(err);
    }
  };
}