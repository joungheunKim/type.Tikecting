import express from 'express';
import { UserController } from '../controllesrs/user.controller'; 
import auth from '../middlewares/auth';

const router = express.Router();

const userController = new UserController();
// 회원가입
router.post('/signup', userController.signup);
// 로그인
router.post('/login', userController.login);
// 프로필 조회
router.get('/profile', userController.profile);
// 예매 내역 확인
router.get('/reservation/list');
export default router;