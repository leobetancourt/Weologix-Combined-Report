const puppeteer = require('puppeteer');
const fs = require('fs');

const path = './index_.html';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://0.0.0.0:4000/', {
        waitUntil: 'networkidle2'
    });
    const html = await page.content();
    fs.writeFileSync(path, html);

    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python3', ["./py/main.py"]);

    await browser.close();
})();