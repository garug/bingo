import { generateCode } from "@lib/code.ts";
import { insert, query } from "@services/dynamodb.ts";
import { UUID } from "@lib/uuid.ts";

const min = 1;
const max = 99;
const totalNumbers = 25;

function generateNumbers() {
  const numbers = new Set();

  while (numbers.size < totalNumbers) {
    const number = Math.floor(Math.random() * (max + 1)) + min;
    if (!numbers.has(number)) {
      numbers.add(number);
    }
  }

  const arrNumbers = Array.from(numbers);

  // Middle number always 0, a free point
  arrNumbers.splice(Math.floor(totalNumbers / 2), 0, 0);

  return arrNumbers;
}

function uniqueCard() {
  return {
    id: generateCode(5),
    numbers: generateNumbers(),
    created_at: Date.now(),
  };
}

export type Card = ReturnType<typeof uniqueCard>;

export async function generateCards(amount = 1) {
  const cards = Array.from({ length: amount }).map(uniqueCard);

  const dbCards = cards.map((e) => ({ ...e, id: `card#${e.id}` }));

  // TODO a improve here is use generator and insert all cards
  // TODO another improve is insert data using batch operations on dynamo
  // another idea is use another pattern like repository to handle with card entity
  await Promise.all(dbCards.map((c) => insert(c)));

  return cards;
}

export async function fetchCard(id: UUID) {
  const card = await query(`card#${id}`);

  console.log(card);

  return card;
}
