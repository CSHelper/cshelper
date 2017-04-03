import {write, runTests} from './utils';


export function testJS(testData, req) {
  const filePath = write(req.body.content, 'py', req.user._id);

  let cmd = "\"node {0}\" ".replace('{0}', filePath);

  return runTests(testData, cmd, filePath);
}