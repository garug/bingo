import {
  DynamoDBClient,
  QueryCommand,
  PutItemCommand,
} from "https://esm.sh/@aws-sdk/client-dynamodb@3.696.0?dts";
import { marshall, unmarshall } from "npm:@aws-sdk/util-dynamodb@3.731.1";
import { Err, Ok } from "@lib/result.ts";
import { logger } from "@lib/logger.ts";

const defaultTable = Deno.env.get("AWS_TABLE_NAME");

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

export function insert(
  data: unknown,
  TableName = defaultTable,
  client = defaultClient
) {
  const command = new PutItemCommand({
    TableName,
    Item: marshall(data),
  });

  return client.send(command);
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

  let item;
  try {
    const { Items } = await client.send(command);
    item = Items?.[0];
  } catch (e) {
    // TODO handle error, its not a 404 response
    logger.warn("Error while fetching: ", { id, error: e });
    return undefined;
  }

  if (!item)
    // Here its a 404 response, the undefined its not clear on this function
    return undefined;

  return normalize(item);
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
