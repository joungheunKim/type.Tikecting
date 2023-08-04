import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity'; 

export class ReservationRepository {
  private reservationRepo = AppDataSource.getRepository(Reservation);

  public reservation = async (
    user_id: number,
    concert_id: number,
    date_id: number,
    ticket_price: number,
    quantity: number,
    total_price: number
  ) => {
    return await this.reservationRepo.save({
      user: { id: user_id },
      concert: { id: concert_id },
      concert_date: { id: date_id },
      ticket_price,
      quantity,
      total_price,
    });
  };

  public reservationDetail = async (id: number) => {
    return await this.reservationRepo.find({
      where: { id },
      relations: { user: true, concert: true, concert_date: true },
    });
  };
}