import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const email = String(process.argv[2] || "").trim().toLowerCase()
  if (!email) {
    console.error("Usage: npm run user:promote-admin -- user@example.com")
    process.exitCode = 1
    return
  }

  const updated = await prisma.user.update({
    where: { email },
    data: { role: "ADMIN" },
    select: { id: true, email: true, role: true },
  })

  console.info(`User promoted: ${updated.email} -> ${updated.role}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

