import { ReservationRepository } from '../repositories/reservation.repository';
import { Concert } from '../entities/concert.entity'; 
import { ConcertRepository } from '../repositories/concert.repository'; 

export class ReservationService {
  concertRepository = new ConcertRepository();
  reservationRepository = new ReservationRepository();

  public reservation = async (
    userId: number,
    concertId: number,
    dateId: number,
    quantity: number
  ) => {
    const concert = await this.concertRepository.concertDetail(concertId);
    const price = concert[0].price;
    const totalPrice = quantity * price;
    const result = await this.reservationRepository.reservation(
      userId,
      concertId,
      dateId,
      price,
      quantity,
      totalPrice
    );
    const reservationId = result.id;
    const reservation = await this.reservationRepository.reservationDetail(reservationId);
    return { code: 200, reservation, message: '예매에 성공했습니다' };
  };
}