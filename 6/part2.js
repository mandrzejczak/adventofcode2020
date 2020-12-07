const fs = require('fs');

const exampleFile = './example.txt'; // 6
const file = './input.txt';

const countUniqueLetters = group => {
  const groupList = group.split(/\n/);
  const groupPartialResult = {};

  groupList.forEach(word => {
    for (let i = 0; i < word.length; i++) {
      const letterOccurences = groupPartialResult[word.charAt(i)];
      groupPartialResult[word.charAt(i)] = letterOccurences ? groupPartialResult[word.charAt(i)] + 1 : 1;
    }
  });

  const groupResult = Object.values(groupPartialResult).reduce((acc, occurences) => {
    if (occurences === groupList.length) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return groupResult;
};

fs.readFile(file, 'utf8', function (err, data) {
  const stringArray = data.trim().split(/\n\n/);

  const result = stringArray.reduce((acc, group) => {
    return acc + countUniqueLetters(group);
  }, 0);

  console.log('result: ', result);
});
