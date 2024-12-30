import express from "express";
import multer from "multer";
import Listing from "../models/Listing.js";

const router = express.Router();

// Configuring multer for file Uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Store uploaded files in the 'upload
},
filename: function(req, file, cb) {
    cb(null, file.originalname); // Using the Original file name
},
});

const upload = multer({ storage });

//Create Listing
router.post('/create', upload.array('listingPhotos'), async (req, res) => {
    try {
        // Take the information from the form
        const {
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            //listingPhotoPaths,
            title,
            description,
            price,
        } = req.body;

        const listingPhotos = req.files;
        if(!listingPhotos){
            return res.status(400).send("No file uploaded");
        }

        const listingPhotoPaths = listingPhotos.map((file)=>file.path);

        const newListing = new Listing({
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            listingPhotoPaths,
            title,
            description,
            price,
        });

        await newListing.save();
        res.status(200).json(newListing);
    } catch (err) {
        res
        .status(409)
        .json({ message: "Fail to create new listing", error: err.
            message });
        console.log(err);
    }
});

//Get Lisiting by Category
router.get("/", async (req, res) => {
    const qCategory = req.query.category
    try {
        let listings;
        if(qCategory){
            listings = await Listing.find({category:qCategory}).
            populate("creator");
        }else{
            listings = await Listing.find().populate("creator");
            }
            res.status(200).json(listings);
            } catch (err) {
                res.
                status(404)
            .json({ message: "Fail to fetch Listings",
            error: err.message });
            console.log(err);
                    }
});

//Listing Details
router.get("/:listingId", async (req,res)=>{
    try {
        const {listingId} = req.params;
        const listing = await Listing.findById(listingId).populate("creator");
        res.status(202).json(listing)
    } catch (err) {
        res.status(404).json({message: "Listing cannot found", error: err.message})
    }
});

export default router;