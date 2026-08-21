import { test as base, expect, Page } from '@playwright/test';
import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type AuthFixtures = {
    homePage: Page;
    signupPage: Page;
    aiHealing: void;
}

const test = base.extend<AuthFixtures>({
    homePage: async ({ page }, use) => {
        // Block Google Ads entirely. This is much faster and completely eliminates 
        // ad-related flakiness without needing to guess iframe names or click 'Close'.
        await page.route('**/*googlesyndication.com/**', route => route.abort());
        await page.route('**/*doubleclick.net/**', route => route.abort());
        await page.route('**/*ad.doubleclick.net/**', route => route.abort());

        await page.goto('/');
        await expect(page).toHaveTitle(/Automation Exercise/);
        await expect(page.getByAltText('Website for automation practice')).toBeVisible({ timeout: 20000 });
        await use(page);
    },
    signupPage: async ({ homePage }, use) => {
        await homePage.getByRole('link', { name: 'Signup / Login' }).click();
        await expect(homePage.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
        await use(homePage);
    },
    aiHealing: [async ({ page }, use, testInfo) => {
        // Setup: Run the test
        await use();

        // Teardown: If the test failed, run AI Healing
        if (testInfo.status === 'failed' && testInfo.error) {
            console.log(`\n🤖 AI Self-Healing Triggered for: ${testInfo.title}`);
            const errorMessage = testInfo.error.message;

            try {
                // Get page HTML and clean it to save tokens
                const rawHtml = await page.content();
                const cleanHtml = rawHtml
                    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');

                const prompt = `
You are an expert Playwright automation engineer.
A test failed because it could not find the following locator on the page:
Error: ${errorMessage}

Here is the current HTML DOM of the page:
${cleanHtml}

Analyze the DOM and suggest the correct, most resilient Playwright CSS or XPath locator to use instead. 
Return ONLY a JSON object in this format: { "oldLocator": "...", "newLocator": "...", "reason": "..." }
`;
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                });

                fs.appendFileSync('ai-locator-suggestions.log', `\n--- [${new Date().toISOString()}] Test Failed: ${testInfo.title} ---\nError: ${errorMessage}\n\nAI Suggestion:\n${response.text}\n`);
                console.log('✅ AI Self-Healing Suggestion saved to ai-locator-suggestions.log');
            } catch (e) {
                const aiError = e instanceof Error ? e.message : String(e);
                console.error('❌ AI Healing failed:', aiError);
                fs.appendFileSync('ai-locator-suggestions.log', `\n--- [${new Date().toISOString()}] Test Failed: ${testInfo.title} ---\nError: ${errorMessage}\n\n❌ AI Healing Request Failed:\n${aiError}\n`);
            }
        }
    }, { auto: true }]
})

export { test, expect }

//https://automationexercise.com/
///for automation project