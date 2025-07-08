const userSchema = require("../model/userModel.js");
const createUniqueId = async () => {
  let characters =
    "AaBbCcDdEeFfGgHhIiJfKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
  let Id = "";
  for (let i = 0; i < 8; i++) {
    Id += characters[Math.floor(Math.random() * characters.length)];
  }

  const user = await userSchema.find({ SellerId: Id });
  if (!user) {
    return Id;
  } else {
    createUniqueId();
  }
};

module.exports = createUniqueId;
