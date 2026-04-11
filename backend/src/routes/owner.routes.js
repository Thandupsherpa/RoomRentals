import { Router } from "express";
import {
    verifyToken,
    authorizeRoles
} from "../middlewares/auth.middleware.js";
import {
    addRoom
} from "../controllers/owner.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { uploadImages } from '../controllers/upload.controller.js';

const ownerRouter = Router();

ownerRouter.use(verifyToken);
ownerRouter.use(authorizeRoles("OWNER"));

ownerRouter.post(
    '/rooms',
    upload.array("images", 5),
    addRoom
);

ownerRouter.post('/upload-images',
    upload.array("images", 5),
    uploadImages
);

export default ownerRouter; 