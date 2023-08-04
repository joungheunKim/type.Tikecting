import { Concert_date } from '../entities/concertData.entity'; 
import { ConcertRepository } from '../repositories/concert.repository'; 
import { UserRepository } from '../repositories/users.repository'; 

// 커스텀타입 생성
type ResultType = {
  concert: {
    id: number;
  };
  date: Date;
} & Concert_date;

export class ConcertService {
  private concertRepository = new ConcertRepository();
  private userRepository = new UserRepository();

  public concertRegistration = async (
    userId: number,
    title: string,
    artist: string,
    date: Date,
    price: number,
    location: string,
    introduction: string
  ) => {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('잘못된 요청입니다');
    } else if (!user.is_admin) {
      throw new Error('권한이 없습니다');
    }

    const result = await this.concertRepository.concertRegistration(
      title,
      artist,
      price,
      location,
      introduction
    );
    return { result, code: 201, message: '공연이 정상적으로 등록되었습니다.' };
  };


  public datesRegistration = async (concertId: number, dates: any[]) => {
    const results: ResultType[] = [];
    for (let i = 0; i < dates.length; i++) {
      const result = await this.concertRepository.datesRegistration(concertId, dates[i].date);
      results.push(result);
    }
    return { code: 200, message: '공연 일정 등록 성공', results };
  };

  public concertList = async () => {
    const results = await this.concertRepository.concertList();
    return { results, code: 200 };
  };

  public concertDetail = async (concertId: number) => {
    const result = await this.concertRepository.concertDetail(concertId);
    return { result, code: 200 };
  };

  public searchConcert = async (keyword: string) => {
    const results = await this.concertRepository.searchConcert(keyword);
    return { results, code: 200 };
  };
}
