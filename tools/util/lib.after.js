const path = require('path');
const fs = require('fs');
const config = require('../config/config.js');
const cheerio = require('cheerio');

const buildPath = path.resolve(__dirname, config.path);
const normalPath = path.join(buildPath, './changeColor.js');
const minPath = path.join(buildPath, './changeColor.min.js');

const appendContent = `
  if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = window.ChangeColor;
	}
`;

module.exports = function() {

  convertFile(normalPath);
  convertFile(minPath);

  function convertFile(filePath) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        throw err;
      }

      data += appendContent;

      fs.writeFile(filePath, data, {
        encoding: 'utf-8'
      });

    });
  }
};
