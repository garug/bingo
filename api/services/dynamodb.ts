import {
  DynamoDBClient,
  GetItemCommand,
  QueryCommand,
  PutItemCommand,
} from "https://esm.sh/@aws-sdk/client-dynamodb@3.696.0?dts";
import { marshall, unmarshall } from "npm:@aws-sdk/util-dynamodb";

const defaultTable = Deno.env.get("AWS_TABLE_NAME");

const defaultClient = new DynamoDBClient({
  region: "us-east-2",
  credentials: {
    accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID") || "",
    secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY") || "",
  },
});

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

export async function fetch(
  id: string,
  TableName = defaultTable,
  client = defaultClient
) {
  const command = new QueryCommand({
    TableName,
    KeyConditionExpression: "id = :id",
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
    console.warn("Error while fetching: ", { id, error: e });
    return undefined;
  }

  if (!item)
    // Here its a 404 response, the undefined its not clear on this function
    return undefined;

  return unmarshall(item);
}
