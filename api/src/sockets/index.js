const http = require("http");
const socketIo = require("socket.io");
const { Retro } = require("../microServices/api_mongo/classes");
retroSocket = require("./retroSockets");
const { v4: uuidv4 } = require("uuid");
const { createRetro } = require("../services/analyticServices");

let retroList = [
  {
    title: "What went well?",
    tagsList: [],
  },
  {
    title: "What went wrong?",
    tagsList: [],
  },
  {
    title: "What need to be improved?",
    tagsList: [],
  },
  {
    title: "What should we start doing?",
    tagsList: [],
  },
];

const addSocket = (server) => {
  const app = http.createServer(server);
  const io = socketIo(app, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("Client connected.");

    retroSocket.load(socket, io);
    // retroSocket.message();
    // retroSocket.change();

    socket.on("initial", () => {
      io.emit("load_retro", retroList);
    });

    socket.on("end", () => {
      createRetro(teamId, spring, retroList);
    });

    socket.on("test", (data) => {
      console.log(data.tag);

      retroList.map((retro) => {
        if (retro.title === data.title) {
          retro.tagsList.push(data.tag);
        }
      });

      io.emit("load_retro", retroList);
    });

    socket.on("edit_tag", (data) => {
      retroList.map((retro) => {
        if (retro.title === data.title) {
          retro.tagsList = retro.tagsList.map((tag) => {
            if (tag.id === data.tag.id) return data.tag;
            else return tag;
          });
        }
      });

      io.emit("load_retro", retroList);
    });

    socket.on("delete_tag", ({ title, tag_id }) => {
      console.log(title, tag_id);
      retroList.map((retro) => {
        if (retro.title === title) {
          retro.tagsList = retro.tagsList.filter((tag) => tag.id !== tag_id);
        }
      });

      io.emit("load_retro", retroList);
    });

    socket.on("complete", ({ complete, team_id }) => {
      if (complete) {
        io.emit("end", true);
        console.log(complete, team_id);
        createRetro(team_id, retroList);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected.");
    });
  });
  return app;
};

module.exports = addSocket;
