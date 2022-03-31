pub fn rs_md5(s: &str) -> String {
    let result = md5::compute(s);
    format!("{:x}", result)
}

pub fn rs_md5_form_buffer(s: &[u8]) -> String {
    let result = md5::compute(s);
    format!("{:x}", result)
}

#[cfg(test)]
mod tests {
    use super::*;

    
}
