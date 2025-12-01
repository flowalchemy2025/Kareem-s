import bcrypt from "bcryptjs";

const password = "AmaanStrongPassword";

bcrypt.hash(password, 10).then((hash) => {
  console.log("Generated Hash:");
  console.log(hash);
});