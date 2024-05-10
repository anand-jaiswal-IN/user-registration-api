import express from 'express';
import { user } from '../controllers/default.controller.js';
import {verifyJWT} from '../middlewares/auth.middleware.js';

const router = express.Router()


router.route("/register").post(user.registerUser);
router.route("/login").post(user.loginUser);

router.use(verifyJWT);

router.route("/logout").get(user.logoutUser);
router.route("/generateOtp").get(user.generateOtp);
router.route("/verify").post(user.verifyUser);

export default router;