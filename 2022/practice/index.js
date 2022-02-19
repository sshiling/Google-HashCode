const fs = require('fs');

const file_in_1 = './2022/practice/inputs/a_an_example.in.txt';
const file_in_2 = './2022/practice/inputs/b_basic.in.txt';
const file_in_3 = './2022/practice/inputs/c_coarse.in.txt';
const file_in_4 = './2022/practice/inputs/d_difficult.in.txt';
const file_in_5 = './2022/practice/inputs/e_elaborate.in.txt';

const file_out_1 = './2022/practice/outputs/a_an_example.out.txt';
const file_out_2 = './2022/practice/outputs/b_basic.out.txt';
const file_out_3 = './2022/practice/outputs/c_coarse.out.txt';
const file_out_4 = './2022/practice/outputs/d_difficult.out.txt';
const file_out_5 = './2022/practice/outputs/e_elaborate.out.txt';

const getFileData = filePath => {
    return fs.readFileSync(filePath, 'utf8');
}

const writeToFile = (filePath, data) => {
  fs.writeFileSync(filePath, data, { flag: 'w+' });
}

function updateIngCounter(counterMap, lineArr) {
  if (lineArr.shift() === '0') return;
  lineArr.forEach(ing => {
    counterMap[ing] = ++counterMap[ing] || 1;
  });
}

const createSolution = data => {
  const inputArr = data.split('\n');
  const visitors = inputArr[0];
  const likes = {};
  const dis = {};
  for (let i = 1; i < inputArr.length - 1; i += 2) {
    const likesArr = inputArr[i].split(' ');
    const disArr = inputArr[i+1].split(' ');
    updateIngCounter(likes, likesArr);
    updateIngCounter(dis, disArr);
  }
  const ingredients = Object.keys(likes);
  const result = [];
  ingredients.forEach(ing => {
    dis[ing] = dis[ing] || 0;
    const diff = likes[ing] - dis[ing];
    if (diff >= 0) {
      result.push(ing);
    }
  });
  return result.length + ' ' + result.join(' ');
};

const resolveTask = (taskFilePath, solutionFilePath) => {
  const task = getFileData(taskFilePath);
  const solution = createSolution(task);
  writeToFile(solutionFilePath, solution);
}

try {
  resolveTask(file_in_1, file_out_1);
  resolveTask(file_in_2, file_out_2);
  resolveTask(file_in_3, file_out_3);
  resolveTask(file_in_4, file_out_4);
  resolveTask(file_in_5, file_out_5);
} catch (err) {
  console.error(err);
}
