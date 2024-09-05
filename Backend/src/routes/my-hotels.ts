import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import { verify } from "crypto";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { log } from "util";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
});
router.post(
  "/add",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price is required"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities is required"),
  ],

  async (req: Request, res: Response) => {
    console.log("helloooljfdd");
    upload.array("imageFiles", 6)

    try {
      const imageFiles = req.files as Express.Multer.File[];
      console.log(imageFiles);

      const newHotel: HotelType = req.body;

      //upload the images to cloudinary first
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        console.log(2);
        let dataURI = "data" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);

        return res.url;
      });
      const imageUrls = await Promise.all(uploadPromises);
      console.log(4);

      //if the upload was successfull ,add the hotel urls to new hotel
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      //save th enew hotel to the database
      const hotel = new Hotel(newHotel);
      console.log(hotel);

      await hotel.save();
      //return a 201 status
      res.status(201).send(hotel);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Server Error" });
    }
  }
);
export default router;
