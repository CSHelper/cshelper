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
console.log("done writing")
  return compile(filePath)
    .then(function (exeFile) {
      console.log("done compiling")
      return spawnC(filePath, exeFile, testData);
    })
    .catch(function (error) {
      return error;
    })
}

function compile (filePath) {
  return new Promise(function (resolve, reject) {
    let output = '';
    const parser = path.parse(filePath);
    console.log(parser.dir, filePath)

    const exeFile = path.join(parser.dir, parser.name);

    let result = spawnSync('gcc',
      [filePath, '-o', exeFile]);

    if (result.status !== 0) {
      reject({
        isSuccess: result.status === 0,
        output: result.stderr.toString('utf8')
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
    let output = '';
    let script = '/Users/Frank/Desktop/Git/cshelper/test/script.sh "{{1}}" "{{2}}" "/Users/Frank/Desktop/Git/cshelper/{{3}}"'
      .replace("{{1}}",testData.inputs)
      .replace("{{2}}",testData.expectedOutput)
      .replace("{{3}}",exeFile);

    const ls = spawn(script);
    ls.stdout.on('data', (data) => {
      output += data;
    });

    ls.stderr.on('data', (data) => {
      output += data;
    });

    ls.on('close', (code) => {
      //fs.unlinkSync(exeFile);
      console.log(output)
      resolve({
        isSuccess: code === 0,
        output: output
      });
    });
  });
}