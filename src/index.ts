import { base64_encode, base64_decode, md5_decode, md5_decode_from_buffer } from '../pkg';
import { b64_to_utf8, fileToBuffer, getMD5FromFile, utf8_to_b64, withSpeed } from './utils';

const source = '先帝创业未半而中道崩殂'

console.log(source);

function testBase64() {
  const target = base64_encode(source);
  const result = base64_decode(target);
  console.assert(result === source)
}

function testJSBase64() {
  const target = utf8_to_b64(source);
  const result = b64_to_utf8(target);
  console.assert(result === source)
}

function testMD5() {
  const target = md5_decode(source);
  console.log('md5', target);
}

function main() {
  withSpeed(testBase64)
  withSpeed(testJSBase64)
  withSpeed(testMD5)
  testFileMD5();
}

function testFileMD5() {
  const input = document.createElement('input')
  input.type = 'file'
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files[0];
    fileToBuffer(file).then(buffer => {
      const u8 = new Uint8Array(buffer);
      console.time('md5_decode_from_input')
      const result = md5_decode_from_buffer(u8);
      console.timeEnd('md5_decode_from_input')
      console.log('rs-md5', result);
    })
    getMD5FromFile(file).then(result => {
      console.log('js-md5', result);
    });
  }
  document.body.appendChild(input)
}

main();
