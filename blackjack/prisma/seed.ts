import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const suits = ['♠️', '♥️', '♦️', '♣️']
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

async function main() {
  const cards = suits.flatMap(suit =>
    values.map(value => ({
      suit,
      value,
      code: `${value}${suit}`,
    }))
  )

  await prisma.card.createMany({ data: cards, skipDuplicates: true })

  console.log('🃏 Baralho completo inserido!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())