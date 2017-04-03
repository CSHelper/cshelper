import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import {spawn, exec, execFile} from 'child_process';
import config from '../../../config/environment';

const OPTS = {
  encoding: 'utf8',
  timeout: 10000,
  maxBuffer: 200,
  killSignal: 'SIGTERM',
  cwd: null,
  env: null
}

/**
 * Write user's code to disk
 */
export function write(content, fileExtension, username = 'unknown') {
  const fileName = username + '-'
                  + crypto.randomBytes(10).toString('hex') 
                  + '.' + fileExtension;
  const filePath = path.join('.', 'container', fileName);
  fs.writeFileSync(filePath, content);
  return filePath;
}

/**
 * Run single test
 */
export function runTest(testData, cmd) {
  let scriptPath = path.join(config.root, 'test', 'script.sh');
  let input = "\"{0}\"".replace('{0}', testData.inputs);
  let output = "\"{0}\" ".replace('{0}', testData.expectedOutput);

  const script = '{0} {1} {2} {3}'.replace('{0}', scriptPath)
                                  .replace('{1}', input)
                                  .replace('{2}', output)
                                  .replace('{3}', cmd);



  return new Promise(function (resolve, reject) {
    exec(script, OPTS, (error, stdout, stderr) => {
      // If error
      if (error) {
        if (error.code === 3) {
          return resolve({
            isSuccess: false,
            output: stdout
          });
        } else if (true) {
          return reject(new Error('Timeout or buffer overflow!!!'));
        } else {
          return reject(new Error('Error occured!!!'));
        }
      }

      // Success
      return resolve({
        isSuccess: true,
        output: stdout
      });
    });
  });
}

/**
 * Run all tests
 */
export function runTests(testData, cmd, filePath) {
  let tests = [];
  for(let i = 0; i < testData.length; i++)
    tests.push(runTest(testData[i], cmd));

  return Promise.all(tests).then(function (res) {
    fs.unlinkSync(filePath);
    return res;
  });
}