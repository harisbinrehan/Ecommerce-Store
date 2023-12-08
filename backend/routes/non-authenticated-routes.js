import express from 'express';

import ScriptActions from '../script-methods/script-actions';
import { StripeActions } from '../controllers/stripe';

const router = express.Router();

router.get('/script', ScriptActions);

router.post('/webhook', StripeActions);

export default router;
