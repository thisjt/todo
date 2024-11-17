import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

let d1context: PrismaClient;

export const prismaD1 = (d1: D1Database) => {
	if (d1context) return d1context;

	const adapter = new PrismaD1(d1);

	d1context = new PrismaClient({ adapter });
	return d1context;
};
