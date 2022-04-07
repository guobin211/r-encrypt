mod utils;
extern crate base64;

use crate::utils::{rs_md5, rs_md5_form_buffer};
use base64::{decode, encode};
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsObject;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn base64_encode(source: &str) -> String {
    String::from(encode(source.as_bytes()))
}

#[wasm_bindgen]
pub fn base64_decode(source: &str) -> String {
    let result = decode(source);
    match result {
        Ok(bytes) => String::from_utf8(bytes).unwrap(),
        Err(_) => String::from("decode error"),
    }
}

#[wasm_bindgen]
pub fn md5_decode(source: &str) -> String {
    rs_md5(source)
}

#[wasm_bindgen]
pub fn md5_decode_from_buffer(source: &[u8]) -> String {
    rs_md5_form_buffer(&source)
}
