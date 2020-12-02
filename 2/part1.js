const fs = require('fs');

// const example = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc']; // res: 2

fs.readFile('./input.txt', 'utf8', function (err, data) {
  const stringArray = data.split('\n');
  let result = 0;

  const objectArray = stringArray.map(item => {
    const [min, max, letter, password] = item.replace('-', ' ').replace(':', '').split(" ");
    return { min, max, letter, password };
  });

  objectArray.forEach(item => {
    if(item.password) {
      let stringIdx = 0;
      let letterOccurances = 0;

      while (true) {
        const letterIdx = item.password.indexOf(item.letter, stringIdx);
        if (letterIdx > -1) {
          stringIdx = letterIdx+1;
          letterOccurances++;
        } else {
          break;
        }
      };

      if (letterOccurances >= item.min && letterOccurances <= item.max) {
        result++;
      }
    }
  });

  console.log('result: ', result);
});
