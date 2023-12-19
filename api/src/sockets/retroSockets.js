const { Retro } = require("../microServices/api_mongo/classes");

const retroSocket = {};

let io, socket;


retroSocket.load = (s, i) => {
  io = i;
  socket = s;
};

retroSocket.message = () => {
  try {
    socket.on("set_tag", ({ tag, question }) => {
      retroList = retroList.map((item) => {
        if (item.title === question) {
          item.tagsList.push(tag);
        }
        return item;
      });
      // console.log("Mensaje del cliente:", retroList);
    });
  } catch (error) {
    console.log(error);
  }
};

retroSocket.change = () => {
  try {
    io.emit("load_retro", retroList);
  } catch (error) {
    console.log(error);
  }
};

module.exports = retroSocket;
