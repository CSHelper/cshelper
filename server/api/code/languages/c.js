import fs from 'fs';
import bluebird from 'bluebird';
import path from 'path';
import {write, runTests} from './utils';
import spawnSync from 'spawn-sync';


Promise = bluebird;
bluebird.promisifyAll(fs);

export function testC(testData, req) {
  const filePath = write(req.body.content, 'c', req.user._id);
  
  return compile(filePath)
    .then(function (exeFile) {
      return runTests(testData, exeFile, exeFile);
    })
}

function compile (filePath) {
  return new Promise(function (resolve, reject) {
    let output = '';
    const parser = path.parse(filePath);

    const exeFile = path.join(parser.dir, parser.name);

    let result = spawnSync('gcc', [filePath, '-o', exeFile]);
    fs.unlinkSync(filePath);
    
    if (result.status !== 0) {
      return reject(new Error('Compilation error!!!'));
    } else {
      return resolve(exeFile);
    }
  })
}