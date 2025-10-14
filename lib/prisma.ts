import { PrismaClient } from "./generated/prisma";

// Extend the global type definition so TypeScript knows about globalThis.prisma
declare global {
  // `var` is used here because global augmentation requires it
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create a singleton PrismaClient instance
export const db = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
