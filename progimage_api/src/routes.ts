import express from 'express'
import { authenticate } from './middleware/authentication'
import { authorize } from './middleware/authorization'

const router = express.Router()

router.post('/upload',
	authenticate,
	authorize
)

router.get('/customer/:customerId/slow',
	authenticate,
	authorize
)

export default router