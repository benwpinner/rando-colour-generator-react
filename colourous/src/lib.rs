use rand::{rngs::ThreadRng, thread_rng, Rng};
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Deserialize, Serialize)]
struct Colour {
    rgb: Vec<u8>,
    #[serde(with = "serde_bytes")]
    hex: Vec<u8>,
}

fn random_int(min: u8, max: u8, rng: &mut ThreadRng) -> u8 {
    let int = rng.gen_range(min..max);
    int
}

fn round(value: f32, precision: u32) -> f32 {
    let multiplier = 10u16.pow(precision);
    (value * multiplier as f32).round() / multiplier as f32
}

fn convert_decimal_to_hex(decimal: u8) -> Vec<u8> {
    if decimal < 16 {
        return format!("0{decimal:X}").as_bytes().to_vec();
    }
    format!("{decimal:X}").as_bytes().to_vec()
}

#[wasm_bindgen]
pub fn generate_random_colour() -> Result<JsValue, JsValue> {
    let mut rng = thread_rng();
    let rgb = vec![
        random_int(0, 255, &mut rng),
        random_int(0, 255, &mut rng),
        random_int(0, 255, &mut rng),
    ];
    let hex = convert_rgb_to_hex(&rgb);
    let colour = Colour { rgb: rgb, hex: hex };
    Ok(serde_wasm_bindgen::to_value(&colour)?)
}

fn convert_rgb_to_hex(rgb: &Vec<u8>) -> Vec<u8> {
    let mut hex = Vec::new();
    for i in 0..3 {
        let mut value = convert_decimal_to_hex(rgb[i]);
        hex.append(&mut value)
    }
    hex
}
