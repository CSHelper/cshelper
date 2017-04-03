import {write, runTests} from './utils';


export function testPy(testData, req) {
  const filePath = write(req.body.content, 'py', req.user._id);

  let cmd = "\"{0} {1}\" ".replace('{0}', req.body.language)
                          .replace('{1}', filePath);

  return runTests(testData, cmd, filePath);
}