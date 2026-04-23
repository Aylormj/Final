import { test, expect } from "@playwright/test";

test.describe("Wordle Game", () => {
  test("loads, accepts guesses, updates board, and resets", async ({ page }) => {
    // Navigate to Wordle
    await page.goto("http://localhost:5173/wordle");

    // Heading should be visible
    await expect(page.getByRole("heading", { name: /wordle/i })).toBeVisible();

    // Enter a guess
    await page.getByRole("textbox").fill("crane");
    await page.getByRole("button", { name: /submit/i }).click();

    // Board should show the guess
    await expect(page.locator("[data-testid='word-row']")).toContainText(/crane/i);

    // Enter another guess
    await page.getByRole("textbox").fill("stare");
    await page.getByRole("button", { name: /submit/i }).click();

    await expect(page.locator("[data-testid='word-row']")).toContainText(/stare/i);

    // Reset the game
    await page.getByRole("button", { name: /reset/i }).click();

    // Board should be empty again
    await expect(page.locator("[data-testid='word-row']")).not.toContainText(/crane|stare/i);
  });
});
