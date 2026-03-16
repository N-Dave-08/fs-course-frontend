import { test, expect } from "@playwright/test";

test("test authentication", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.getByRole("textbox", { name: "email", exact: true }).click();
	await page
		.getByRole("textbox", { name: "email", exact: true })
		.fill("jessica@gmail.com");
	await page.getByRole("textbox", { name: "email", exact: true }).press("Tab");
	await page
		.getByRole("textbox", { name: "password", exact: true })
		.fill("password");
	await page.locator("form").filter({ hasText: "login" }).click();
	await page.getByRole("button", { name: "login" }).click();
});
