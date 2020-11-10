const fs = require('fs');
const path = require('path');

/**
 * 
 * @param filePath
 * @returns {string}
 */
exports.read = function (filePath) {
    return fs
        .readFileSync(filePath, {
            encoding: 'utf8'
        });
}

/**
 * 
 * @param filePath
 * @returns {string[]}
 */
exports.readLines = function (filePath) {
    return exports.read(filePath)
        .split('\n')
        .filter(line => {
            // no empty lines
            return !!line;
        })
        .map(line => line.trim());
};

const getInputFilePath = function (inputFileName) {
    return path.normalize(path.join(__dirname, '../inputs', inputFileName));
}

/**
 * Return file contents as an array of strings, line by line of the file
 * 
 * @param inputFileName the file to read
 */
exports.readInputLines = function (inputFileName) {
    return exports.readLines(getInputFilePath(inputFileName));
}

/**
 * Return file contents as a single string
 */
exports.readInput = function (inputFileName) {
    return exports.read(getInputFilePath(inputFileName));
}
