import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';
import { Concert } from '../entities/concert.entity'; 
import { Concert_date } from '../entities/concertData.entity'; 

export class ConcertRepository {
  private concertRepo = AppDataSource.getRepository(Concert);
  private conDateRepo = AppDataSource.getRepository(Concert_date);

  public concertRegistration = async (
    title: string,
    artist: string,
    price: number,
    location: string,
    introduction: string
  ) => {
    return this.concertRepo.save({ title, artist, price, location, introduction });
  };

  public datesRegistration = async (id: number, date: Date) => {
    return this.conDateRepo.save({ concert: { id }, date });
  };

  public concertList = async () => {
    const results = this.concertRepo.find({
      select: { title: true, location: true },
    });
    return results;
  };

  public concertDetail = async (id: number) => {
    console.log('검색시작');
    // 전체를 조회하는 find 말고 findOneBy로 사용하는 법?
    return this.concertRepo.find({ where: { id }, relations: { concert_dates: true } });
  };

  public searchConcert = async (keyword: string) => {
    const results = await this.concertRepo
      .createQueryBuilder('concerts')
      .select()
      .where('concerts.title LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('concerts.artist LIKE :keyword', { keyword: `%${keyword}%` })
      .getMany();
    console.log(results);
    return results;
  };
}
