import {
  DynamoDBClient,
  PutItemCommand,
} from "https://esm.sh/@aws-sdk/client-dynamodb@3.696.0?dts";

function useClient() {
  return new DynamoDBClient({
    region: "us-east-2",
    credentials: {
      accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID") || "",
      secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY") || "",
    },
  });
}

export async function newGame(password: string) {
  const TableName = Deno.env.get("AWS_TABLE_NAME");
  const id = crypto.randomUUID();

  const command = new PutItemCommand({
    TableName,
    Item: {
      id: {
        S: `game#${id}`,
      },
      created_at: {
        N: Date.now().toString(),
      },
      password: {
        S: password,
      },
    },
  });

  const client = await useClient();

  await client.send(command);

  return { id };
}
