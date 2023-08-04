import express from 'express';
import { ReservationController } from '../controllesrs/reservation.controller'; 
import auth from '../middlewares/auth';

const router = express.Router();

const reservationController = new ReservationController();
// 공연 예매하기
router.post('/', auth, reservationController.reservation);
// 예매 내역 확인
router.get('/list');
export default router;