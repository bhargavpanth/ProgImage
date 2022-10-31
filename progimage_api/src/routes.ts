import express from 'express'
import { authenticate } from './middleware/authentication'
import { authorize } from './middleware/authorization'
import { download } from './middleware/download'
import { upload } from './middleware/upload'
import { process } from './middleware/process'

const router = express.Router()

router.get('/upload/:file_SHA/name/:file_name',
	authenticate,
	authorize,
	upload
)

router.get('/download/:file_SHA',
	authenticate,
	authorize,
	download
)

router.get('/process/:file_SHA',
	authenticate,
	authorize,
	process
)

export default router
