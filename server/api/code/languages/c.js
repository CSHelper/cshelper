import fs from 'fs';
import bluebird from 'bluebird';
import spawnSync from 'spawn-sync';
import crypto from 'crypto';
import path from 'path';
import {spawn} from 'child_process';

Promise = bluebird;
Promise.promisifyAll(fs);

function write(content, fileExtension, username = 'unknown') {
  const fileName = username + '-'
                  + crypto.randomBytes(25).toString('hex') 
                  + '.' + fileExtension;
  const filePath = path.join('.', 'container', fileName);
  fs.writeFileSync(filePath, content);
  return filePath;
}

let unitTestC = `void main(){
  {{dataType}} output = {{functionName}}({{params}});
  printf("\\n{{printType}}", output);
  if(output != {{expectedOutput}}) {
    exit(1);
  }
  exit(0);
}
`;

export function testC(testData, requestBody) {
  let cat = '';
  testData.inputs = JSON.parse(testData.inputs);
  for(let input in testData.inputs) {
    cat +=  testData.inputs[input].value + ',';
  }
  // Take out last comma
  cat = cat.slice(0, -1);

  // Populate test file
  let unitTest = unitTestC;
  testData.expectedOutput = JSON.parse(testData.expectedOutput);
  unitTest = unitTest
    .replace('{{params}}', cat)
    .replace('{{expectedOutput}}', testData.expectedOutput.value)
    .replace('{{dataType}}', testData.expectedOutput.dataType)
    .replace('{{functionName}}', testData.functionName)
    .replace('{{printType}}', '%d');
  unitTest = unitTest + requestBody.content;

  const filePath = write(unitTest, requestBody.fileExtension);

  return compile(filePath)
    .then(function (outFile) {
      return spawnC(filePath, outFile);
    })
    .then(function (runningOutput) {
      let outputs = runningOutput.consoleOutput.split('\n');
      testData.output = outputs.pop();
      testData.consoleOutput = outputs.join('\n');
      testData.isSuccess = runningOutput.isSuccess;

      return testData;
    })
    .catch(function (error) {
      return error;
    })
}

function compile (filePath) {
  return new Promise(function (resolve, reject) {
    let consoleOutput = '';
    const parser = path.parse(filePath);
    const outFile = path.join(parser.dir, parser.name);

    let result = spawnSync('gcc',
      [filePath, '-o', outFile]);

    if (result.status !== 0) {
      reject({
        isSuccess: result.status === 0,
        consoleOutput: result.stderr.toString('utf8')
      });
    } else {
      fs.unlinkSync(filePath);
      resolve(outFile);
    }
  })
}

function spawnC(filePath, outFile) {
  return new Promise(function (resolve) {
    let consoleOutput = '';

    const ls = spawn(outFile);
    ls.stdout.on('data', (data) => {
      consoleOutput += data;
    });

    ls.stderr.on('data', (data) => {
      consoleOutput += data;
    });

    ls.on('close', (code) => {
      fs.unlinkSync(outFile);
      resolve({
        isSuccess: code === 0,
        consoleOutput: consoleOutput
      });
    });
  });
}