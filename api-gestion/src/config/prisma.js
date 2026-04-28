const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Export the Prisma client directly (default export) so that `require('../config/prisma')`
// returns the client instance. This avoids the need to destructure `{ prisma }` in every
// controller and prevents the "undefined.findMany" error.
module.exports = prisma;