import { test, expect } from "@playwright/test";

test.describe("TicTacToe Game", () => {
  test("loads, allows moves, detects winner, and resets", async ({ page }) => {
    // Go to TicTacToe
    await page.goto("http://localhost:5173/tictactoe");

    // Page loads
    await expect(page.getByRole("heading", { name: /tic tac toe/i })).toBeVisible();

    // All 9 squares (buttons)
    const squares = page.getByRole("button").filter({ hasText: "" });

    // X wins across the top row:
    await squares.nth(0).click(); // X
    await squares.nth(3).click(); // O
    await squares.nth(1).click(); // X
    await squares.nth(4).click(); // O
    await squares.nth(2).click(); // X wins

    // Expect winner message
    await expect(page.getByText(/winner: x/i)).toBeVisible();

    // Reset the game
    await page.getByRole("button", { name: /reset game/i }).click();

    // Board should be empty again
    await expect(squares.nth(0)).toHaveText("");
    await expect(squares.nth(1)).toHaveText("");
    await expect(squares.nth(2)).toHaveText("");
  });
});
