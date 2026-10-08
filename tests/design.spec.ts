import { expect, test, type Page } from "@playwright/test";

const siteName = "Blog Preview Card";
const siteUrl = "https://blog-preview-card.royeradames.com/";

async function box(page: Page, selector: string) {
  const found = await page.locator(selector).first().boundingBox();
  if (!found) throw new Error(`${selector} has no box`);
  return found;
}

test("declares one site name in og:site_name and WebSite JSON-LD, with canonical, Open Graph image and icons", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", siteName);
  const jsonLd = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
  expect(jsonLd).toEqual({ "@context": "https://schema.org", "@type": "WebSite", name: siteName, url: siteUrl });
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\/blog-preview-card\.royeradames\.com\/?$/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", /HTML & CSS foundations/);
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
  for (const href of await page.locator('link[rel="icon"], link[rel="apple-touch-icon"]').evaluateAll((links) => links.map((link) => (link as HTMLLinkElement).href))) {
    expect((await page.request.get(href)).status(), href).toBe(200);
  }
});

test("desktop frame matches the Figma card, type and spacing", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const card = await box(page, ".blog-card");
  expect(card.width).toBe(384);
  expect(Math.abs(card.height - 522)).toBeLessThanOrEqual(8);
  expect(Math.abs(card.x + card.width / 2 - 720)).toBeLessThanOrEqual(1);
  expect(Math.abs(card.y + card.height / 2 - 480)).toBeLessThanOrEqual(6);
  await expect(page.locator(".blog-card")).toHaveCSS("box-shadow", "rgb(17, 17, 17) 8px 8px 0px 0px");
  const image = await box(page, ".illustration");
  expect([image.width, image.height]).toEqual([336, 200]);
  const title = page.getByRole("heading", { level: 1 });
  await expect(title).toHaveCSS("font-size", "24px");
  await expect(title).toHaveCSS("line-height", "36px");
  await expect(title).toHaveCSS("font-weight", "800");
  const titleBox = await box(page, "h1");
  expect(titleBox.height).toBe(36);
  const published = await box(page, ".published");
  expect(titleBox.y - (published.y + published.height)).toBeCloseTo(12, 0);
  const excerpt = await box(page, ".excerpt");
  expect(excerpt.y - (titleBox.y + titleBox.height)).toBeCloseTo(12, 0);
  await expect(page.locator(".excerpt")).toHaveCSS("color", "rgb(107, 107, 107)");
  const author = await box(page, ".author");
  expect(author.y - (excerpt.y + excerpt.height)).toBeCloseTo(24, 0);
});

test("hover follows the Figma Card Hover state: a 16 px shadow and the title highlighted, anywhere on the card", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/");
  await page.locator(".author").hover();
  await expect(page.locator(".blog-card")).toHaveCSS("box-shadow", "rgb(17, 17, 17) 16px 16px 0px 0px");
  await expect(page.getByRole("link", { name: "HTML & CSS foundations", exact: true })).toHaveCSS("color", "rgb(122, 90, 0)");
  const [request] = await Promise.all([
    page.waitForEvent("request", (request) => request.url().startsWith("https://developer.mozilla.org/")),
    page.locator(".illustration").click(),
  ]);
  expect(request.url()).toContain("developer.mozilla.org");
});

test("mobile frame follows the 375 px design", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const card = await box(page, ".blog-card");
  expect(card.width).toBe(327);
  expect(card.x).toBe(24);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("font-size", "20px");
  expect((await box(page, ".illustration")).width).toBe(279);
});

test("width sweep 320 to 1600 px in 10 px steps: no page scroll, 16 px floor, card inside the gutters", async ({ page }) => {
  await page.goto("/");
  const failures: string[] = [];
  for (let width = 320; width <= 1600; width += 10) {
    await page.setViewportSize({ width, height: 900 });
    if (await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)) failures.push(`${width}: page scroll`);
    const card = await box(page, ".blog-card");
    // The 8 px offset shadow must stay on screen too.
    if (card.x < 16 || card.x + card.width + 8 > width - 8) failures.push(`${width}: card at ${card.x}`);
    const small = await page.evaluate(() => [...document.querySelectorAll("p, h1, a, span, time")].filter((node) => node.getClientRects().length && parseFloat(getComputedStyle(node).fontSize) < 16).map((node) => node.textContent));
    if (small.length) failures.push(`${width}: small text ${small.join(" | ")}`);
  }
  expect(failures).toEqual([]);
});
