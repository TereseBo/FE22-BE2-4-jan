import { Router } from 'express';

import { getUserProfile } from '../controllers/user';

const router = Router();

router.get('/profile', getUserProfile);
router.post('/profile', getUserProfile);


export default router;