-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATE,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
