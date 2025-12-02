import bcrypt from "bcryptjs";

const password = "Pass12345";

bcrypt.hash(password, 10).then((hash) => {
  console.log("Generated Hash:");
  console.log(hash);
});