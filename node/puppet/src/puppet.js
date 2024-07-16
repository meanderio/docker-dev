const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch({
    headless: true,
    dumpio: false,
  });

  const url = 'https://www.example.com';
  const brk = "\n\n====================\n\n"

  const page = await browser.newPage();
  const resp = await page.goto(url, { 
      timeout: 5000, waitUntil: 'load' 
  });
  console.log("status: ", resp.status());

  // extract the full page html
  const content = await page.content();
  console.log(brk, content)

  // take a screenshot of the page
  const scrnsht = await page.screenshot({ 
    path: 'page.jpg', 
    fullPage: true });
  console.log(brk, "screenshot saved.")

  // extract text from the page
  const words = await page.$eval(
    '*', (el) => el.innerText
  );
  console.log(brk, words);

  await browser.close();
})();