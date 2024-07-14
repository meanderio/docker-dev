# Tutorial commands

This command will read all the dependencies that were defined in the package.json file and automatically installs them for you.

```bash
$ npm install
```

This command will pack the puppeteer binaries.
You may need to chmod to make this executable.

```bash
$ ./pack.sh
```

Build the docker image.
Use the second if you are on mac silicon.

```bash
$ docker build -t puppeteer-dckr .
# need the platform command for M1 Macs
$ docker build --platform linux/arm64 -t puppeteer-dckr .
```

Run the docker container executing the puppeteer web crawler.
The container will visit the web page you added to `script.js`
and `console.log` the status code from the response.

```bash
$ docker run --rm --name puppeteer-dckr-container puppeteer-dckr
response code 200
```

Now we are ready to implement the web crawler logic.
This information can be found in a separate tutorial.
