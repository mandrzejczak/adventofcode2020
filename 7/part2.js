const fs = require('fs');

const exampleFile = './example.txt'; // 4
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
      const valueRegex = /(\d+) ([\w ]+)( bag)/;
      return {
        quantity: parseInt(value.match(valueRegex)[1]),
        name: value.match(valueRegex)[2],
      }
    }
  });
};

const getBagsQuantity = (bag, bagsTree) => {
  return bag.reduce((acc, bagItem) => {
    if (bagItem === null) {
      return 1;
    }

    return acc + bagItem.quantity * getBagsQuantity(bagsTree[bagItem.name], bagsTree);
  }, 1);
};

fs.readFile(file, 'utf8', function (err, data) {
  const stringArray = data.trim().split(/\n/);
  const bagsTree = {};

  stringArray.forEach(clue => {
    const color = getKeyColor(clue);
    bagsTree[color] = getColorValues(clue);
  });

  const result = getBagsQuantity(bagsTree[neededBag], bagsTree) - 1;
  console.log('result: ', result);
});
