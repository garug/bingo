import {
  BatchGetItemCommand,
  BatchGetItemCommandInput,
  GetItemCommand,
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
  PutItemCommand,
  TransactWriteItemsCommand,
} from "https://esm.sh/@aws-sdk/client-dynamodb@3.696.0?dts";
import { marshall, unmarshall } from "npm:@aws-sdk/util-dynamodb@3.731.1";
import { Err, Ok } from "@lib/result.ts";
import { logger } from "@lib/logger.ts";

const defaultTable = Deno.env.get("AWS_TABLE_NAME") as string;

if (!defaultTable) {
  throw new Error("Missing AWS_TABLE_NAME env variable");
}

const defaultClient = new DynamoDBClient({
  region: "us-east-2",
  credentials: {
    accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID") || "",
    secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY") || "",
  },
});

// deno-lint-ignore no-explicit-any
function normalize(entry: any) {
  delete entry.sk;
  delete entry.pk;

  return unmarshall(entry);
}

export async function getItem(key: any, TableName = defaultTable, client = defaultClient) {
  const command = new GetItemCommand({
    TableName,
    Key: marshall(key),
  })

  const result = await client.send(command);

  if (!result.Item) return Err("not found");

  return Ok(normalize(result.Item));
}

export function insert(
  data: unknown,
  TableName = defaultTable,
  client = defaultClient
) {
  const command = new PutItemCommand({
    TableName,
    Item: marshall(data),
    ConditionExpression:
      "attribute_not_exists(pk) AND attribute_not_exists(sk)",
  });

  return Ok(client.send(command));
}

export async function insertBatch(
  data: unknown[],
  TableName = defaultTable,
  client = defaultClient
) {
  const command = new TransactWriteItemsCommand({
    TransactItems: data.map((item) => ({
      Put: {
        TableName,
        Item: marshall(item),
        ConditionExpression:
          "attribute_not_exists(pk) AND attribute_not_exists(sk)",
      },
    })),
  });

  try {
    const result = await client.send(command);

    console.log(result);
    return Ok(result);
  } catch (e: any) {
    if (e.name === "TransactionCanceledException") {
      return Err(e.CancellationReasons.map((reason: any) => reason.Message));
    }

    return Err(e);
  }
}

// TODO: remove any
// @ts-ignore: any for internal function
async function handleResultQuery(
  command: QueryCommand,
  client = defaultClient
) {
  let item;

  try {
    const { Items } = await client.send(command);
    item = Items?.[0];
  } catch (e) {
    logger.warn("Error while fetching: ", { command, error: e });
    return Err(e);
  }

  if (!item) return Err("not found");

  return Ok(normalize(item));
}

export async function queryBatch(
  keys: BatchGetItemCommandInput["RequestItems"][],
  TableName = defaultTable,
  client = defaultClient
) {
  const command = new BatchGetItemCommand({
    RequestItems: {
      [TableName]: {
        Keys: keys.map((key) => marshall(key)),
      },
    },
  });

  const result = await client.send(command);

  return result.Responses?.[TableName].map((e) => marshall(e)) || [];
}

export async function querySk(
  pk: string,
  sk: string,
  TableName = defaultTable,
  client = defaultClient
) {
  const command = new QueryCommand({
    TableName,
    KeyConditionExpression: "pk = :pk AND sk = :sk",
    ExpressionAttributeValues: {
      ":pk": { S: pk },
      ":sk": { S: sk },
    },
  });

  return await handleResultQuery(command, client);
}

export async function queryCustom(
  prevCommand: Omit<QueryCommandInput, "TableName">
) {
  const command = new QueryCommand({ ...prevCommand, TableName: defaultTable });

  const result = await defaultClient.send(command);

  return Ok(result.Items?.map((item) => normalize(item)));
}

type SendParameters = Parameters<typeof defaultClient.send>;

export async function send(command: Omit<SendParameters[0], "TableName">) {
  const commandWithTable = { ...command, TableName: defaultTable };

  return defaultClient.send(commandWithTable);
}

export async function query(
  id: string,
  TableName = defaultTable,
  client = defaultClient
) {
  const command = new QueryCommand({
    TableName,
    KeyConditionExpression: "pk = :id",
    ExpressionAttributeValues: {
      ":id": { S: id },
    },
  });

  return await handleResultQuery(command, client);
}

export async function queryBegins(
  id: string,
  begins_with: string,
  TableName = defaultTable,
  client = defaultClient
) {
  const command = new QueryCommand({
    TableName,
    KeyConditionExpression: "pk = :pk AND begins_with(sk, :sk)",
    ExpressionAttributeValues: {
      ":pk": { S: id },
      ":sk": { S: begins_with },
    },
  });

  try {
    const { Items } = await client.send(command);

    return Ok((Items || []).map((item) => normalize(item)));
  } catch (e) {
    return Err(e);
  }
}
