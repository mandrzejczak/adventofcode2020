const fs = require('fs');

const exampleFile = './example.txt'; // 5
const file = './input.txt';

const neededBag = "shiny gold";

const getKeyColor = clue => {
  const keyRegex = /(.*)( bags contain )/;
  return clue.match(keyRegex)[1];
};

const getColorValues = clue => {
  const valuesPart = clue.replace(/.* bags contain /, '');
  const valuesArray = valuesPart.split(',');

  return valuesArray.map(value => {
    if (/no other bags/.test(value)) {
      return null;
    } else {
      const valueRegex = /(\d )([\w ]+)( bag)/;
      return value.match(valueRegex)[2];
    }
  });
};

const findNeededBag = (bag, bagsTree) => {
  for (let i = 0; i < bag.length; i++) {
    const value = bag[i];

    if (value === null) {
      return false;
    } else if (value === neededBag) {
      return true;
    } else {
      const hasBag = findNeededBag(bagsTree[value], bagsTree);

      if (hasBag) {
        return true;
      }
    }
  }

  return false;
};

fs.readFile(file, 'utf8', function (err, data) {
  const stringArray = data.trim().split(/\n/);
  const bagsTree = {};
  let result = 0;

  stringArray.forEach(clue => {
    const color = getKeyColor(clue);
    bagsTree[color] = getColorValues(clue);
  });

  Object.values(bagsTree).forEach(bag => {
    const hasNeededBag = findNeededBag(bag, bagsTree);

    if (hasNeededBag) {
      result++;
    }
  });

  console.log('result: ', result);
});
