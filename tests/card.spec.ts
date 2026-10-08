import { expect, test } from "@playwright/test";
const destination = "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website";

test("card remains readable and intact across the supplied and family widths", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  for (const width of [320, 375, 400, 640, 768, 1024, 1280, 1536]) {
    await page.setViewportSize({ width, height: 960 }); await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveTitle("Blog Preview Card | Royer Adames");
    await expect(page.getByRole("heading", { name: "HTML & CSS foundations" })).toBeVisible();
    await expect(page.getByText("Greg Hooper", { exact: true })).toBeVisible();
    const layout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      images: [...document.images].every(image => image.complete && image.naturalWidth > 0),
      readable: [...document.querySelectorAll("p")].every(node => parseFloat(getComputedStyle(node).fontSize) >= 16),
      // Footer links keep 44 px targets; the title link covers the whole card (at least 24 px, WCAG 2.5.8).
      targets: [...document.querySelectorAll("footer a")].every(node => node.getBoundingClientRect().height >= 44)
        && [...document.querySelectorAll("h1 a")].every(node => node.getBoundingClientRect().height >= 24),
    }));
    expect(layout).toEqual({ overflow: false, images: true, readable: true, targets: true });
  }
  expect(errors).toEqual([]);
});

test("title and footer have keyboard focus, truthful destinations and no writes", async ({ page }) => {
  const writes: string[] = [];
  page.on("request", request => { if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) writes.push(request.method()); });
  await page.goto("/");
  const title = page.getByRole("link", { name: "HTML & CSS foundations", exact: true });
  await expect(title).toHaveAttribute("href", destination);
  await page.keyboard.press("Tab"); await expect(title).toBeFocused();
  await expect(title).toHaveCSS("outline-style", "solid");
  await expect(title).toHaveCSS("color", "rgb(122, 90, 0)");
  await page.keyboard.press("Tab"); await expect(page.getByRole("link", { name: "Frontend Mentor", exact: true })).toBeFocused();
  await expect(page.getByRole("link", { name: "Frontend Mentor", exact: true })).toHaveCSS("text-decoration-line", "underline");
  await page.keyboard.press("Tab"); await expect(page.getByRole("link", { name: "Royer Adames", exact: true })).toBeFocused();
  await title.hover(); await expect(title).toHaveCSS("color", "rgb(122, 90, 0)");
  await expect(page.getByText("Practice card with a sample author and date.", { exact: false })).toBeVisible();
  expect(writes).toEqual([]);
});

test("reading and real links work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ baseURL: `http://127.0.0.1:${process.env.PORT ?? 4327}`, javaScriptEnabled: false, viewport: { width: 400, height: 900 } });
  try {
    const page = await context.newPage(); await page.goto("/");
    await expect(page.getByRole("link", { name: "HTML & CSS foundations", exact: true })).toHaveAttribute("href", destination);
    await expect(page.getByText("Greg Hooper", { exact: true })).toBeVisible();
    await page.keyboard.press("Tab"); await expect(page.getByRole("link", { name: "HTML & CSS foundations", exact: true })).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  } finally { await context.close(); }
});
