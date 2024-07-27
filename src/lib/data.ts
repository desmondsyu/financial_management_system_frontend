import { PrismaClient } from "@prisma/client";

const currUser: number = 1;

export async function fetchTypes() {
    const prisma = new PrismaClient();
    const types = await prisma.type.findMany();
    await prisma.$disconnect();
    return types;
}

export async function fetchCategories(query: string) {
    const prisma = new PrismaClient();
    const categories = await prisma.transaction_group.findMany({
        where: {
            OR: [
                {
                    user_id: currUser,
                },
                {
                    user_id: null,
                },
            ],
            AND: [
                {
                    name: {
                        search: query,
                    },
                },
            ],
        },
    });
    await prisma.$disconnect();
    return categories;
}

export async function fetchBooks(query: string) {
    const prisma = new PrismaClient();
    const books = await prisma.label.findMany({
        where: {
            AND: [
                {
                    name: {
                        search: query,
                    },
                },
                {
                    user_id: currUser,
                },
            ],
        },
    });
    await prisma.$disconnect();
    return books;
}

export async function fetchTransactionById(id: number) {
    const prisma = new PrismaClient();
    const transactionById = prisma.transaction.findMany({
        where: {
            tran_id: id,
        },
    });
    await prisma.$disconnect();
    return transactionById;
}

export async function fetchTransactionByFilter(
    {
        type,
        category,
        dateFrom,
        dateTo,
        amountFrom,
        amountTo,
        desc,
        book,
    }: {
        type?: number | null,
        category?: number | null,
        dateFrom?: Date | null,
        dateTo?: Date | null,
        amountFrom?: number | null,
        amountTo?: number | null,
        desc?: string | null,
        book?: number | null,
    }) {
    const prisma = new PrismaClient();
    const transactions = prisma.transaction.findMany({
        where: {
            AND: [
                {
                    user_id: currUser,
                },
            ]
        }
    });
    await prisma.$disconnect();
    return transactions;
}

