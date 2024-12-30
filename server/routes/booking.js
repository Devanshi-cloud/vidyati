import express from "express"
import Booking from "../models/Booking.js"
const router = express.Router()

//Create Booking
router.post("/create", async(req, res)=>{
    try{
        const {customerId, hostId, listingId, startDate, 
        endDate} = 
            req.body;
            const newBooking = new Booking({
                customerId,
                listingId,
                hostId,
                startDate,
                endDate,
            });

    await newBooking.save()
    res.status(200).json(newBooking)
    } catch(err) {
        console.log(err);
        res
        .status(400)
        .json({message: "Failed to create booking", error: err.message});
    }
})
export default router;