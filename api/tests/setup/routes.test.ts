import { assertEquals } from "@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { setupRoutes } from "../../setup/routes.ts";

const setupRoutesTests = describe({
  name: "setupRoute",
  permissions: {
    read: true,
  },
});

const src = ["tests", "resources", "routes"];

it(setupRoutesTests, "should allow sub levels", async () => {
  const { get } = await setupRoutes([".", ...src, "with-sub-level", "1", "2"]);
  const root = {
    name: "/",
    parameters: [],
    path: "tests\\resources\\routes\\with-sub-level\\1\\2\\+server.ts",
    regExp: /^\/$/,
  };
  assertEquals(get("/"), root);
});

it(setupRoutesTests, "should allow empty", async () => {
  const { routes } = await setupRoutes([".", ...src, "empty"]);

  assertEquals(routes.length, 0);
});
