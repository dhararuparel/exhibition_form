-- CreateTable
CREATE TABLE "Exhibition" (
    "id" SERIAL NOT NULL,
    "hallName" TEXT NOT NULL,
    "dimensions" TEXT NOT NULL,
    "enclosedHall" BOOLEAN NOT NULL,
    "hasCurtains" BOOLEAN NOT NULL,
    "cooling" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "storageSpace" BOOLEAN NOT NULL,
    "proximityToTruckEntrance" TEXT NOT NULL,
    "powerOutlets" INTEGER NOT NULL,
    "tablesNeeded" INTEGER NOT NULL,
    "spaceForVR" BOOLEAN NOT NULL,
    "wifiAccess" BOOLEAN NOT NULL,
    "lectureHallName" TEXT NOT NULL,
    "lectureHallArea" TEXT NOT NULL,
    "seatingCapacity" INTEGER NOT NULL,
    "hasAVFacilities" BOOLEAN NOT NULL,
    "distanceFromExhibitionHall" TEXT NOT NULL,
    "accommodation" TEXT NOT NULL,
    "localTransport" BOOLEAN NOT NULL,
    "studentVolunteers" INTEGER NOT NULL,
    "parkingSpace" BOOLEAN NOT NULL,
    "loadingManpower" INTEGER NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "eventVenue" TEXT NOT NULL,
    "teacherTraining" BOOLEAN NOT NULL,
    "quizProgramme" BOOLEAN NOT NULL,

    CONSTRAINT "Exhibition_pkey" PRIMARY KEY ("id")
);
