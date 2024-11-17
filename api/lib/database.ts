import { DynamoDBClient } from "npm:@aws-sdk/client-dynamodb";
import { PutCommand } from "npm:@aws-sdk/lib-dynamodb";

function useClient() {
  return new DynamoDBClient({ region: "us-east-2" });
}

export async function newGame(password: string) {
  const command = new PutCommand({
    TableName: Deno.env.get("AWS_TABLE_NAME"),
    Item: {
      id: `game#${crypto.randomUUID()}`,
      created_at: Date.now().toString(),
      password,
    },
  });

  const client = await useClient();

  client.send(command);
  // TODO finish new game function
}
