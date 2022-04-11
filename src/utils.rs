/* A function that takes a string and returns a string. */
pub fn rs_md5(s: &str) -> String {
    let result = md5::compute(s);
    format!("{:x}", result)
}

pub fn rs_md5_form_buffer(s: &[u8]) -> String {
    let result = md5::compute(s);
    format!("{:x}", result)
}

#[allow(dead_code)]
pub fn parse_vec_str(list: Vec<&str>) -> Vec<i32> {
    list.iter()
        .filter_map(|x| x.parse::<i32>().ok())
        .collect::<Vec<i32>>()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_md5() {
        let some_code = "some code";
        let result = rs_md5(some_code);
        println!("{}", result);
        assert_eq!(result.len(), 18);
    }

    #[test]
    fn test_parse_i32() {
        let list = vec!["1", "2", "3", "-1", "a"];
        let result = parse_vec_str(list);
        result.iter().for_each(|x| println!("{}", x));
        assert_eq!(result.len(), 4);
    }
}
