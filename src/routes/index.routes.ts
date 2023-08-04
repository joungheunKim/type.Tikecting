import express from 'express';
import userRouter from './users.route';
import concertRouter from './concerts.route';
// import reservationRouter from './reservations.route';

const router = express.Router();

router.use('/user', userRouter);
router.use('/concert', concertRouter);
// router.use('/reservation', reservationRouter);
export default router;