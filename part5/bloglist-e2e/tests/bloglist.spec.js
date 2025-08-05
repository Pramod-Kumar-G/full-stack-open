import { test, describe, expect, beforeEach } from "@playwright/test";
import { loginWith } from "./helper";

describe("Blog App", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "rambooza",
        username: "rambo",
        password: "sekret",
      },
    });
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in to application")).toBeVisible();
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "rambo", "sekret");
      await expect(page.getByText("rambooza logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "rambo", "wrong");
      await expect(page.getByText("Wrong username or password")).toBeVisible();
      await expect(page.getByText("rambooza logged in")).not.toBeVisible();
      const errorDiv = page.locator(".notification");
      await expect(errorDiv).toContainText("Wrong username or password");
    });
  });
});
