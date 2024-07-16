# Puppeteer Container

We are going to use the official pre-built puppeteer docker image.
This gives us the least flexibility, but it is the easiest to get
up and running with.
So we are going to accept this trade off for the time being.
If you would like a future to go more in depth on this subject,
let me know.

Okay, first build the docker image.

```bash
$ docker build -t dckr-puppet .
```

If you are on an Apple Silicon Mac you will get a warning.
This should not be an issue for this tutorial.

Next we need to run the docker container in an interactive state.
This will allow us to edit, run, and test our puppeteer code.

```bash
$ docker run --rm --name puppeteer-dckr-container puppeteer-dckr
response code 200
```

To streamline this workflow we can bring the build and run together
via a `compose.yaml` file.

```yaml
services:
  app:
    container_name: dckr-puppet
    build: .
    volumes:
      - type: bind
        source: ./src
        target: /home/pptruser/src
    stdin_open: true
    tty: true
    entrypoint: /bin/bash
```

This allows to build and run the docker container in one command.
In addition we are creating a `/src` folder bind between the
container and our local machine.
Any development we do in this folder in the container will reflect
back to the local machine so we can keep it under source control.

```bash
$ docker compose up --build -d
```

After you confirm your docker container is running you can attach
to it using the VS Code extension **Dev Containers**.
We are now in our development container and we are ready to
implement our puppeteer web crawler.

## Template Web Crawler

This next section will walk through a starter template and a few
useful puppeteer commands for data extraction.
Below is the final script in full.

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    dumpio: false,
  });

  const url = 'https://example.com';

  const page = await browser.newPage();
  const resp = await page.goto(url, { 
      timeout: 5000, waitUntil: 'load' 
  });
  console.log("status: ", resp.status());

  // extract the full page html
  const content = await page.content();
  console.log(content)

  // take a screenshot of the page
  const scrnsht = await page.screenshot({ 
    path: 'page.jpg', 
    fullPage: true });
  console.log("screenshot saved.")

  // extract text from the page
  const words = await page.$eval(
    '*', (el) => el.innerText
  );
  console.log(words);

  await browser.close();
})();
```

Let's walk through each section of this script to better
understand what the code is doing.

```js
const browser = await puppeteer.launch({
    headless: true,
    dumpio: false,
  });
```

This above chunk is creating a new browser instance using
the puppeteer `launch` command.
The `browser` object is our entrypoint to automate the web
crawling process.
The `launch` command takes a number of arguments.
We have kept it simple asking for a `headless: true` instance
and to supress browser diagnostic output `dumpio: false`.

```js
const url = 'https://example.com';

  const page = await browser.newPage();
  const resp = await page.goto(url, { 
      timeout: 5000, waitUntil: 'load' 
  });
  console.log("status: ", resp.status());
```

This section instructs the browser to create a new blank
page tab and to then visit the page defined by `url`.
In our case this is `example.com`.
We store the response object from this visit in `resp` and
log the status code out to console.

```js
// extract the full page html
  const content = await page.content();
  console.log(content)
```

Grab the page html.

```js
  // take a screenshot of the page
  const scrnsht = await page.screenshot({ 
    path: 'page.jpg', 
    fullPage: true });
  console.log("screenshot saved.")
```

Take and save a screenshot.

```js
  // extract text from the page
  const words = await page.$eval(
    '*', (el) => el.innerText
  );
  console.log(words);
```

Extract all the text on the page.

```js
await browser.close();
```

Finally we close the browser when the web crawl
and data extraction is complete.

This script can be run in the container.
Open a terminal and use the following command.

```bash
$ node puppet.js
```

You should see the output from the `console.log` calls used
in the script.

This completes a demonstration on how to create a simple
web crawler with Puppeteer and Docker.
Future tutorials will provide more depth on building
out a feature rich web crawler with Puppeteer.
