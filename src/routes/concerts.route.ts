import express from 'express';
import auth from '../middlewares/auth';
import { ConcertController } from '../controllesrs/concert.controller';
const router = express.Router();
const concertController = new ConcertController();

// 공연 등록
router.post('/registration', auth, concertController.concertRegistration);
// 공연 일정 등록
router.post('/registration/dates/:concertId', auth, concertController.datesRegistration);
// 공연 목록 조회
router.get('/list', concertController.concertList);
// 공연 상세 조회
router.get('/detail/:concertId', concertController.concertDetail);
// 공연 검색
router.get('/search', concertController.searchConcert);

export default router;