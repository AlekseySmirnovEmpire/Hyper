-- AlterTable
ALTER TABLE "UserModel" ADD COLUMN     "isActivated" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ImagesModel" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "data" BYTEA NOT NULL,

    CONSTRAINT "ImagesModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ImagesModel_userId_key" ON "ImagesModel"("userId");

-- AddForeignKey
ALTER TABLE "ImagesModel" ADD CONSTRAINT "ImagesModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
