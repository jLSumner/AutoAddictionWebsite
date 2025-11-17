const argon2 = require('argon2');

(async () => {
  const hash = await argon2.hash(''); //Enter whatever password you want in between the apostrophes ('').
  console.log(hash);
})();