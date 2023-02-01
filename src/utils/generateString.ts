// create a random url
const generateString = () => {
    let n = new Date().getTime();
    // Map to store 62 possible characters
    let map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    let shorturl = [];
  
    // Convert given integer id to a base 62 number
    while (n) 
    {
        // use above map to store actual character
        // in short url
        shorturl.push(map[n % 62]);
        n = Math.floor(n / 62);
    }
  
    // Reverse shortURL to complete base conversion
    shorturl.reverse();
  
    return shorturl.join("");
}

export default generateString