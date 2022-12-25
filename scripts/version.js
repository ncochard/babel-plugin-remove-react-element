const fs = require('fs');
const path = require('path');
const src = require("../package.json");

const dstFile1 = path.join(__dirname, '../packages/babel-plugin-remove-react-element/package.json');
const dst1 = JSON.parse(fs.readFileSync(dstFile1));
dst1.version = src.version;
fs.writeFileSync(dstFile1, JSON.stringify(dst1, null, "  "))

const dstFile2 = path.join(__dirname, '../packages/remove-react-element-test-project/package.json');
const dst2 = JSON.parse(fs.readFileSync(dstFile2));
dst2.version = src.version;
fs.writeFileSync(dstFile2, JSON.stringify(dst2, null, "  "))

console.log(`git add .`);
console.log(`git commit -m v${src.version}`);
console.log(`git tag v${src.version}`);
console.log(`git push`);
console.log(`git push --tags`);