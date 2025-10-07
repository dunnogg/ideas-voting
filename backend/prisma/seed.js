"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
