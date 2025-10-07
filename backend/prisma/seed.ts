import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.idea.createMany({
        data: [
            { title: "Добавить новые головоломки" },
            { title: "Сделать мобильное приложение" },
            { title: "Поддержка тёмной темы" }
        ]
    });
}

main()
    .then(() => {
        console.log("✅ Seed complete");
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
