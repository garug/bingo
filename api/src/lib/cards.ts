import { generateCode } from "@lib/code.ts";
import { UUID } from "@lib/uuid.ts";
import { Ok } from "@lib/result.ts"
import { insert, query, insertBatch } from "@services/database/mod.ts";

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

export function uniqueCard(created_at = Date.now()) {
  return {
    pk: "card",
    sk: generateCode(5),
    numbers: generateNumbers(),
    created_at,
  };
}

export type Card = ReturnType<typeof uniqueCard>;

export async function generateCards(amount = 1) {
  const cards = Array.from({ length: amount }).map(() => uniqueCard());

  // TODO a improve here is use generator and insert all cards
  // TODO another improve is insert data using batch operations on dynamo
  // another idea is use another pattern like repository to handle with card entity
  await Promise.all(cards.map((c) => insert(c)));

  return Ok(cards);
}

export async function fetchCard(id: UUID) {
  const card = await query(`card#${id}`);

  return card;
}

export async function bindCard(user: string, card: string, game: string) {
  const created_at = Date.now();

  const bindCard = {
    pk: user,
    sk: `card#${game}`,
    code: card,
    created_at,
  };

  const result = await insert(bindCard);

  if (result.type === "error") {
    return result;
  }

  return Ok();
}

export async function generateCard(user: string, game: string) {
  const created_at = Date.now();

  const code = generateCode(5);

  const card = {
    numbers: generateNumbers(),
    created_at,
  };

  const bindCard = {
    pk: user,
    sk: `card#${game}`,
    code,
    created_at,
  };

  const result = await insertBatch([
    { pk: "card", sk: code, ...card },
    bindCard,
  ]);

  if (result.type === "error") {
    return result;
  }

  return Ok({ code, ...card });
}
