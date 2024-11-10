import { assertEquals } from "@std/assert";
import { setupRoutes } from "../../setup/routes.ts";

Deno.test(
  {
    name: "setupRoutes - should allow sub levels",
    permissions: { read: true, run: true },
  },
  () => {
    // const { get } = await setupRoutes(
    //   "./tests/resources/routes/with-sub-level/1/2"
    // );
    // const root = {
    //   name: "/",
    //   parameters: [],
    //   path: "tests\\resources\\routes\\with-sub-level\\1\\2\\+server.ts",
    //   regExp: /^\/$/,
    // };
    // assertEquals(get("/"), root);
  }
);

Deno.test("empty", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});
