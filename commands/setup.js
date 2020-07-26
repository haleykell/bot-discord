const mongoose = require("mongoose");
const connect = require("../connection");
const GuildModel = require("../events/guild");
module.exports = {
  name: "setup",
  description: "Setup Command",
  execute(message, args) {
    database(message, args);
  },
};

async function database(message, args) {
  const doc = new GuildModel({
    id: message.guild.id,
  });
  await doc.save();
}

// (async () => {
//   await mongoose.connect(connect.mongoURI, {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   });
// })();
