const fs = require('fs');

const exampleFile = './example.txt'; // 11
const file = './input.txt';

const countUniqueLetters = group => {
  const letters = group.replace(/\n/g, '');
  const occurences = {};

  for (let i = 0; i < letters.length; i++) {
    occurences[letters.charAt(i)] = true;
  }

  return Object.keys(occurences).length;
};

fs.readFile(file, 'utf8', function (err, data) {
  const stringArray = data.trim().split(/\n\n/);

  const result = stringArray.reduce((acc, group) => {
    return acc + countUniqueLetters(group);
  }, 0);

  console.log('result: ', result);
});
