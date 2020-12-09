const fs = require('fs');

const exampleFile = './example.txt'; // 5
const file = './input.txt';

const getAcc = operations => {
  let run = true;
  let acc = 0;
  let idx = 0;

  while (run) {
    operations[idx].runQuantity++;

    switch (operations[idx].name) {
      case 'nop':
        idx++;
        break;
      case 'acc':
        acc += operations[idx].number;
        idx++;
        break;
      case 'jmp':
      default:
        idx += operations[idx].number;
        break;
    }

    if (operations[idx].runQuantity > 0) {
     run = false;
    }
  };

  return acc;
};

fs.readFile(file, 'utf8', function (err, data) {
  const stringArray = data.trim().split(/\n/);
  const operationsArray = stringArray.map(operation => {
    const operationSplit = operation.split(' ');
    return {
      name: operationSplit[0],
      number: parseInt(operationSplit[1]),
      runQuantity: 0,
    };
  });

  const result = getAcc(operationsArray);
  console.log('result: ', result);
});
