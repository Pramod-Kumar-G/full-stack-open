import { test, describe, expect, beforeEach } from "@playwright/test";
import { createBlog, loginWith } from "./helper";

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
    await request.post("/api/users", {
      data: {
        name: "Rangadu",
        username: "ranga",
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
  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "rambo", "sekret");
    });
    test("a new blog can be created", async ({ page }) => {
      await createBlog(
        page,
        "Learn React",
        "pramod",
        "http://myblog.com/",
        "rambo",
      );
      await expect(
        page.getByText("a new blog Learn React by rambo added"),
      ).toBeVisible();
      await expect(page.getByText("Learn React rambo")).toBeVisible();
    });
    describe("and a blog is present", () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          "Learn React",
          "pramod",
          "http://myblog.com/",
          "rambo",
        );
      });
      test("the blog can be liked", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("likes 1")).toBeVisible();
        await expect(
          page.getByText("Blog 'Learn React' was liked"),
        ).toBeVisible();
      });
      test("the user who created the blog can delete it", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
        page.on("dialog", async (dialog) => {
          console.log(dialog.message());
          await dialog.accept();
        });
        await page.getByRole("button", { name: "remove" }).click();
        await expect(page.getByText("Learn React Rambo")).not.toBeVisible();
      });
      test("the user who created the blog can see blog's remove button", async ({
        page,
      }) => {
        await page.getByRole("button", { name: "view" }).click();
        await expect(
          page.getByRole("button", { name: "remove" }),
        ).toBeVisible();
      });
      test("blog's remove button is not visible to the user who didn't create it", async ({
        page,
      }) => {
        await page.getByRole("button", { name: "logout" }).click();
        await loginWith(page, "ranga", "sekret");
        await page.getByRole("button", { name: "view" }).click();
        await expect(
          page.getByRole("button", { name: "remove" }),
        ).not.toBeVisible();
      });
    });
    describe("and multiple blogs are present", () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          "Learn React",
          "pramod",
          "http://myblog.com/learn-react",
          "rambo",
        );
        await createBlog(
          page,
          "Learn Javascript",
          "pramod",
          "http://myblog.com/learn-javascript",
          "rambo",
        );
        await createBlog(
          page,
          "Learn Mongodb",
          "pramod",
          "http://myblog.com/learn-mongodb",
          "rambo",
        );
      });
      test.only("blogs are sorted according to the number of likes", async ({
        page,
      }) => {
        await page
          .getByText("Learn React rambo view")
          .getByRole("button", { name: "view" })
          .click();
        let blogLocator = page.getByText("Learn React rambo hide");
        await blogLocator.getByRole("button", { name: "like" }).click();
        await blogLocator.getByText("likes 1 like").waitFor();

        await page
          .getByText("Learn Javascript rambo view")
          .getByRole("button", { name: "view" })
          .click();
        blogLocator = page.getByText("Learn Javascript rambo hide");
        await blogLocator.getByRole("button", { name: "like" }).click();
        await blogLocator.getByText("likes 1 like").waitFor();
        await blogLocator.getByRole("button", { name: "like" }).click();
        await blogLocator.getByText("likes 2 like").waitFor();

        await page
          .getByText("Learn MongoDb rambo view")
          .getByRole("button", { name: "view" })
          .click();
        blogLocator = page.getByText("Learn MongoDb rambo hide");
        await blogLocator.getByRole("button", { name: "like" }).click();
        await blogLocator.getByText("likes 1 like").waitFor();
        await blogLocator.getByRole("button", { name: "like" }).click();
        await blogLocator.getByText("likes 2 like").waitFor();
        await blogLocator.getByRole("button", { name: "like" }).click();
        await blogLocator.getByText("likes 3 like").waitFor();

        const likesDiv = await page.getByText("likes").all();
        await expect(likesDiv[0]).toHaveText("likes 3 like");
        await expect(likesDiv[1]).toHaveText("likes 2 like");
        await expect(likesDiv[2]).toHaveText("likes 1 like");
      });
    });
  });
});
