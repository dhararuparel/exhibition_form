const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const prisma = new PrismaClient();

// Define the schema for validating exhibition data
const exhibitionSchema = z.object({
  hallName: z.string().min(1, "Hall name is required"),
  dimensions: z.string().min(1, "Dimensions are required"),
  enclosedHall: z.boolean(),
  hasCurtains: z.boolean(),
  cooling: z.string().min(1, "Cooling type is required"),
  floor: z.number().int().positive("Floor must be a positive integer"),
  storageSpace: z.boolean(),
  proximityToTruckEntrance: z.string().min(1, "Proximity to truck entrance is required"),
  powerOutlets: z.number().int().positive("Power outlets must be a positive integer"),
  tablesNeeded: z.number().int().positive("Number of tables needed must be a positive integer"),
  spaceForVR: z.boolean(),
  wifiAccess: z.boolean(),
  lectureHallName: z.string().min(1, "Lecture hall name is required"),
  lectureHallArea: z.string().min(1, "Lecture hall area is required"),
  seatingCapacity: z.number().int().positive("Seating capacity must be a positive integer"),
  hasAVFacilities: z.boolean(),
  distanceFromExhibitionHall: z.string().min(1, "Distance from exhibition hall is required"),
  accommodation: z.string().min(1, "Accommodation details are required"),
  localTransport: z.boolean(),
  studentVolunteers: z.number().int().positive("Number of student volunteers must be a positive integer"),
  parkingSpace: z.boolean(),
  loadingManpower: z.number().int().positive("Loading manpower must be a positive integer"),
  contactPerson: z.string().min(1, "Contact person is required"),
  contactNumber: z.string().regex(/^\d{10}$/, "Contact number must be 10 digits"),
  contactEmail: z.string().email("Invalid email address"),
  eventVenue: z.string().min(1, "Event venue is required"),
  teacherTraining: z.boolean(),
  quizProgramme: z.boolean()
});

// Controller function to handle exhibition form submission
exports.submitExhibitionForm = async (req, res) => {
  try {
    const validatedData = exhibitionSchema.parse(req.body);

    const exhibition = await prisma.exhibition.create({
      data: { ...validatedData }
    });

    res.status(201).json({ message: "Exhibition form submitted successfully", exhibition });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      console.error("Error submitting exhibition form:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
