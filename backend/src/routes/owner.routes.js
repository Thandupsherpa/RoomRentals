import { Router } from "express";
import {
    verifyToken,
    authorizeRoles
} from "../middlewares/auth.middleware.js"

import {
    // addRoom,
    // getMyRooms,
    // updateRoom,
    // deleteRoom,
    // getRoomBookings,
    // updateBookingStatus
} from "../controllers/owner.controller.js"

import { upload } from "../middlewares/upload.middleware.js";
import {uploadImages} from '../controllers/upload.controller.js'

const ownerRouter = Router();

ownerRouter.use(verifyToken);
ownerRouter.use(authorizeRoles("owner"));

// ownerRouter.post('/rooms',addRoom)
// ownerRouter.get('/rooms',getMyRooms)
// ownerRouter.put('/rooms/:id',updateRoom)
// ownerRouter.delete('/rooms/:id',deleteRoom)
// ownerRouter.get('/bookings',getRoomBookings)
// ownerRouter.put('/bookings/:id',updateBookingStatus)
ownerRouter.post('/upload-images',
    verifyToken,
    authorizeRoles("owner"),
    upload.array("images",5),
    uploadImages
)
export default ownerRouter