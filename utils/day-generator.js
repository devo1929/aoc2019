/**
 * This script generates the necessary files for starting a new day.
 *
 * usage:
 * npm run gen dayX
 * OR
 * node utils\day-generator.js dayX
 *
 * where X is replaced with a number
 *
 *
 * - updates package.json with a new script for the day specified
 * - creates input txt files for the day
 *
 */
const path = require('path');
const fileUtils = require('./file-utils');
const fs = require('fs');
const prompt = require('prompt-sync')();

const day = prompt('specify day #: ');

if (!day) {
    throw 'No day specified';
}

updatePackage();
createDayInputFiles();
createDayScriptFile()

function updatePackage() {
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = fileUtils.read(packageJsonPath);

    const _package = JSON.parse(packageJson);

    if (!_package.scripts.hasOwnProperty(day)) {
        _package.scripts[`day${day}`] = `node days/day${day}.js`;
        fs.writeFileSync(packageJsonPath, JSON.stringify(_package, null, 2));
    }
}

function createFile(fullPath) {
    if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, '');
        console.log(`${fullPath} created`);
    }
}

function createDayInputFiles() {
    const dayInputFilePath = path.join(__dirname, '..', 'inputs', `day${day}.txt`);
    const dayInputExampleFilePath = path.join(__dirname, '..', 'inputs', `day${day}-example.txt`);
    createFile(dayInputFilePath);
    createFile(dayInputExampleFilePath);
}

function createDayScriptFile() {
    const dayScriptFilePath = path.join(__dirname, '..', 'days', `day${day}.js`);
    createFile(dayScriptFilePath);
}

function verifyDayAlreadyExists() {

}
