import { Router } from "express";
import * as userController from "./controller/user.controller.js";
import {allowedFields,fileValidation} from "../../lib/media/file.validation.js"
import {uploadSingleFile} from "../../lib/media/multer.js"
import {guard} from "../../lib/auth/guard.js"
const userRouter = Router();


userRouter.post('/Upload-profile-pic',
    guard,
    uploadSingleFile('pp'),
    fileValidation(),
    userController.UploadPic)
export default userRouter;