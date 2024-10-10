import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { HotelType } from "../shared/types";
import Hotel from "../models/hotel";
import { verify } from "crypto";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
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
  upload.array("imageFiles"), //
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      console.log(imageFiles);

      const newHotel: HotelType = req.body;

      //upload the images to cloudinary first
      const imageUrls = await uploadImages(imageFiles);
      console.log(4);

      //if the upload was successfull ,add the hotel urls to new hotel
      newHotel.imageUrls = imageUrls.filter(
        (url): url is string => url !== undefined
      );
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      //save th enew hotel to the database
      const hotel = new Hotel(newHotel);
      console.log("hotel", hotel);

      await hotel.save();
      //return a 201 status
      res.status(201).send(hotel);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Server Error" });
    }
  }
);
router.get("/get", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/get/:id", verifyToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById({
      _id: id,
      userId: req.userId,
    });
    res.json(hotel);
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.put(
  "/update/:id",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();
      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        updatedHotel,
        { new: true }
      );
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);
      hotel.imageUrls = [
        ...updatedImageUrls.filter((url): url is string => url !== undefined),
        ...(updatedHotel.imageUrls || []),
      ];
      await hotel.save();
      res.json(hotel);
    } catch (e) {
      res.status(500).json({ message: "Server Error" });
    }
  }
);

export default router;

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    console.log(2);
    const dataURI = `data:${image.mimetype};base64,${b64}`;
    try {
      const res = await cloudinary.v2.uploader.upload(dataURI);
      console.log("Upload successful:");
      return res.url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
    }
  });
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}
