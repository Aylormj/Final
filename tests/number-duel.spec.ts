import { test, expect } from "@playwright/test";

test.describe("Number Guess Duel (Multiplayer)", () => {
  test("players can create, join, guess, and finish a round", async ({ browser }) => {
    // Create two browser contexts (Player 1 and Player 2)
    const p1 = await browser.newContext();
    const p2 = await browser.newContext();

    const page1 = await p1.newPage();
    const page2 = await p2.newPage();

    // --- PLAYER 1: Create Room ---
    await page1.goto("http://localhost:5174/number-duel");

    await page1.getByRole("button", { name: /create room/i }).click();

    // Wait for room code to appear
    const roomId = await page1.locator("code").innerText();
    expect(roomId.length).toBeGreaterThan(0);

    // --- PLAYER 2: Join Room ---
    await page2.goto("http://localhost:5174/number-duel");

    await page2.getByPlaceholder("Room code").fill(roomId);
    await page2.getByRole("button", { name: /join/i }).click();

    await expect(page2.getByText(/joined room/i)).toBeVisible();

    // --- PLAYER 1: Game starts ---
    await expect(page1.getByText(/guess a number/i)).toBeVisible();

    // --- PLAYER 1 makes a guess ---
    await page1.getByPlaceholder("1–20").fill("10");
    await page1.getByRole("button", { name: /guess/i }).click();

    // Feedback should update for both players
    await expect(page1.locator("section")).toContainText(/too|high|low/i);
    await expect(page2.locator("section")).toContainText(/too|high|low/i);

    // --- PLAYER 2 makes a guess ---
    await page2.getByPlaceholder("1–20").fill("15");
    await page2.getByRole("button", { name: /guess/i }).click();

    // Eventually one player wins
    await expect(page1.locator("section")).toContainText(/wins|you win/i, {
      timeout: 5000,
    });

    // --- Reset game ---
    await page1.getByRole("button", { name: /play again/i }).click();

    await expect(page1.getByText(/guess a number/i)).toBeVisible();
  });
});
