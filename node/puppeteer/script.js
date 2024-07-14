/**
 * @license
 * Copyright 2024 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    dumpio: false,
  });
  const page = await browser.newPage();
  const resp = await page.goto('https://www.meanderings.io');
  console.log("status code: ", resp.status());
  await browser.close();
})();