import { assertEquals } from "@std/assert";
import { setupRoutes } from "../../setup/routes.ts";

Deno.test(
  {
    name: "setupRoute",
    permissions: {
      read: true,
    },
  },
  async (t) => {
    const src = ["tests", "resources", "routes"];

    await t.step("should allow sub levels", async () => {
      const path = [".", ...src, "with-sub-level", "1", "2"];
      const { get } = await setupRoutes(path);

      const root = {
        name: "/",
        parameters: [],
        path: "tests\\resources\\routes\\with-sub-level\\1\\2\\+server.ts",
        regExp: /^\/$/,
      };

      assertEquals(get("/"), root);
    });

    await t.step("should allow empty", async () => {
      const path = [".", ...src, "empty"];
      const { routes } = await setupRoutes(path);

      assertEquals(routes.length, 0);
    });
  }
);
