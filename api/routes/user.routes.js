import express from 'express';
import { testAPI } from '../controller/user.controller.js';

const router = express.Router();


router.get('/', testAPI  )



export default router;