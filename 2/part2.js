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
      let letterOccurances = 0;
      if (item.password.charAt(item.min-1) === item.letter) letterOccurances++;
      if (item.password.charAt(item.max-1) === item.letter) letterOccurances++;
      if (letterOccurances === 1) result++;
    }
  });

  console.log('result: ', result);
});
