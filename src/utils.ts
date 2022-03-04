import * as md5 from 'js-md5';

export function withSpeed(call: () => void) {
  const start = performance.now();
  call();
  const end = performance.now();
  console.log(`${call.name} : ${end - start}ms`);
}

export function utf8_to_b64( str: string ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

export function b64_to_utf8( str: string ) {
  return decodeURIComponent(escape(window.atob( str )));
}

export function js_md5(str: string) {
  return md5(str);
}

export function getMD5FromBuffer(buffer: ArrayBuffer): string {
  const u8 = new Uint8Array(buffer);
  return md5(u8);
}

export function getMD5FromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const rd = new FileReader();
    rd.onload = () => {
      if (rd.result) {
        try {
          console.time('getMD5FromFile');
          const code = getMD5FromBuffer(rd.result as ArrayBuffer);
          console.timeEnd('getMD5FromFile');
          resolve(code);
        } catch (_) {
          reject('md5 failed');
        }
      } else {
        reject('read file failed');
      }
    };
    rd.onerror = reject;
    rd.readAsArrayBuffer(file);
  });
}

export function fileToBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const rd = new FileReader();
    rd.onload = () => {
      if (rd.result) {
        resolve(rd.result as ArrayBuffer);
      } else {
        reject('read file failed');
      }
    };
    rd.onerror = reject;
    rd.readAsArrayBuffer(file);
  });
}
