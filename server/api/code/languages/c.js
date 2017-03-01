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

export function testC(testData, requestBody) {
  // Populate test file
  //testData.expectedOutput = JSON.parse(testData.expectedOutput);

  const filePath = write(requestBody.content, requestBody.fileExtension);

  return compile(filePath)
    .then(function (exeFile) {
      return spawnC(filePath, exeFile);
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
    const exeFile = path.join(parser.dir, parser.name);

    let result = spawnSync('gcc',
      [filePath, '-o', exeFile]);

    if (result.status !== 0) {
      reject({
        isSuccess: result.status === 0,
        consoleOutput: result.stderr.toString('utf8')
      });
    } else {
      fs.unlinkSync(filePath);
      resolve(exeFile);
    }
  })
}

function spawnC(filePath, exeFile, testData) {
  return new Promise(function (resolve) {
    let isSuccess = true;
    let consoleOutput = '';
    let script = 'script.sh "{{1}}" "{{2}} {{3}}"'
    .replace("{{1}}",testData.inputs)
    .replace("{{2}}",testData.expectedOutput)
    .replace("{{3}}",exeFile);

    const ls = spawn(exeFile);
    ls.stdout.on('data', (data) => {
      consoleOutput += data;
    });

    ls.stderr.on('data', (data) => {
      consoleOutput += data;
    });

    ls.on('close', (code) => {
      fs.unlinkSync(exeFile);
      resolve({
        isSuccess: code === 0,
        consoleOutput: consoleOutput
      });
    });
  });
}