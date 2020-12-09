const fs = require('fs');

const exampleFile = './example.txt'; // 8
const file = './input.txt';

const getAcc = operations => {
  let run = true;
  let acc = 0;
  let idx = 0;
  let lastInstruction = false;

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

    if (idx >= operations.length || idx < 0 || operations[idx].runQuantity > 0) {
      run = false;
    }

    if (idx === operations.length) {
      lastInstruction = true;
      run = false;
    }
  };

  return {
    acc,
    lastInstruction,
  };
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

  let result = null;

  for (let i = 0; i < operationsArray.length && result === null; i++) {
    const mutedArray = operationsArray.map(operation => {
      return {...operation};
    });

    if (mutedArray[i].name === 'jmp') {
      mutedArray[i].name = 'nop';
    } else if (mutedArray[i].name === 'nop') {
      mutedArray[i].name = 'jmp';
    }

    const testResult = getAcc(mutedArray);

    if (testResult.lastInstruction) {
      result = testResult.acc;
    }
  }

  console.log('result: ', result);
});
