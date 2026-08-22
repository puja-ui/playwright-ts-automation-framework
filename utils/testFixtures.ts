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

        // Teardown: If the test failed, run AI Healing (only on the final retry attempt)
        if (testInfo.status === 'failed' && testInfo.error && testInfo.retry === testInfo.project.retries) {
            console.log(`\n🤖 AI Self-Healing Triggered for: ${testInfo.title}`);
            
            // Strip ANSI escape codes (colors) from the Playwright error message
            const errorMessage = (testInfo.error.message || '').replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '');

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
                let responseText = '';
                let maxRetries = 3;
                
                for (let i = 0; i < maxRetries; i++) {
                    try {
                        const response = await ai.models.generateContent({
                            model: 'gemini-2.5-flash',
                            contents: prompt,
                        });
                        responseText = response.text ?? '';
                        break; // Success! Break out of the loop
                    } catch (err: any) {
                        const errString = err instanceof Error ? err.message : String(err);
                        // If it's a 429 Rate Limit Error and we have retries left
                        if (errString.includes('429') && i < maxRetries - 1) {
                            console.log(`\n⏳ AI Rate Limit (429) hit for '${testInfo.title}'. Waiting 30 seconds before retrying... (${maxRetries - i - 1} retries left)`);
                            // Wait for 30 seconds
                            await new Promise(resolve => setTimeout(resolve, 30000));
                        } else {
                            // If it's a different error (like 401 Auth) or we ran out of retries, throw it to outer catch
                            throw err; 
                        }
                    }
                }
                
                if (responseText) {
                    let formattedSuggestion = responseText;
                    try {
                        // Extract JSON from markdown block if Gemini wraps it
                        const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || responseText.match(/{[\s\S]*}/);
                        const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : responseText;
                        const obj = JSON.parse(jsonStr);
                        
                        formattedSuggestion = `
\`\`\`diff
- Old Broken Locator
- ${obj.oldLocator}

+ New Suggested Locator
+ ${obj.newLocator}
\`\`\`

**Reasoning:**
> ${obj.reason}

**Test File:** \`${testInfo.file}\`

**Test Case:** \`${testInfo.title}\`
`;
                    } catch (parseError) {
                        // Fallback if JSON parsing fails
                    }

                    fs.appendFileSync('ai-locator-suggestions.md', `\n### ❌ Test Failed: ${testInfo.title}\n**Date:** ${new Date().toISOString()}\n**Error:** \`${errorMessage}\`\n\n#### 🤖 AI Fix:\n${formattedSuggestion}\n---\n`);
                    console.log('✅ AI Self-Healing Suggestion saved to ai-locator-suggestions.md');
                }
            } catch (e) {
                const aiError = e instanceof Error ? e.message : String(e);
                console.error('❌ AI Healing failed:', aiError);
            }
        }
    }, { auto: true }]
})

export { test, expect }
