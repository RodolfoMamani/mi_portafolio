/*
  Warnings:

  - Added the required column `apellidos` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "apellidos" TEXT NOT NULL;
