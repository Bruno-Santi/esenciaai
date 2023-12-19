const http = require("http");
const socketIo = require("socket.io");
const { Retro } = require("../microServices/api_mongo/classes");
retroSocket = require("./retroSockets");
const { v4: uuidv4 } = require("uuid");
const { createRetro } = require("../services/analyticServices");

const myTeam = "f319f02b-47ec-4471-b054-0db3d59b3e8e";

let teamList = [];

const addSocket = (server) => {
  const app = http.createServer(server);
  const io = socketIo(app, { cors: { origin: "*" } });

  const getRetroList = (teamId) => {
    const teamExists = teamList.find((team) => team.team_id === teamId);
    return teamExists.retroList;
  };

  io.on("connection", (socket) => {
    // console.log("Client connected.");

    retroSocket.load(socket, io);
    // retroSocket.message();
    // retroSocket.change();

    socket.on("initial", (teamId) => {
      try {
        const teamExists = teamList.find((team) => team.team_id === teamId);

        if (teamExists)
          io.emit("load_retro", { teamId, retro: teamExists.retroList });
        else {
          teamList.push({
            team_id: teamId,
            retroList: initialRetroList(),
          });

          io.emit("load_retro", { teamId, retro: getRetroList(teamId) });
        }
        console.log(teamList);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("test", (data) => {
      try {
        console.log(data.tag);

        const retroList = getRetroList(data.teamId);

        retroList.map((retro) => {
          if (retro.title === data.title) {
            retro.tagsList.push(data.tag);
          }
        });

        io.emit("load_retro", { teamId: data.teamId, retro: retroList });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("edit_tag", (data) => {
      try {
        const retroList = getRetroList(data.teamId);

        retroList.map((retro) => {
          if (retro.title === data.title) {
            retro.tagsList = retro.tagsList.map((tag) => {
              if (tag.id === data.tag.id)
                return {
                  ...data.tag,
                  thumb_down: tag.thumb_down,
                  thumb_up: tag.thumb_up,
                };
              else return tag;
            });
          }
        });

        io.emit("load_retro", { teamId: data.teamId, retro: retroList });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("likes_tag", (data) => {
      try {
        const retroList = getRetroList(data.teamId);

        retroList.map((retro) => {
          if (retro.title === data.title) {
            retro.tagsList = retro.tagsList.map((tag) => {
              if (tag.id === data.tagId) {
                const isLike = data.isLike;
                const edit = data.edit;

                if (isLike && edit)
                  return {
                    ...tag,
                    thumb_up: tag.thumb_up + 1,
                    thumb_down: tag.thumb_down - 1,
                  };

                if (isLike && !edit)
                  return { ...tag, thumb_up: tag.thumb_up + 1 };

                if (!isLike && edit)
                  return {
                    ...tag,
                    thumb_up: tag.thumb_up - 1,
                    thumb_down: tag.thumb_down + 1,
                  };

                if (!isLike && !edit)
                  return { ...tag, thumb_down: tag.thumb_down + 1 };
              } else return tag;
            });
          }
        });

        io.emit("load_retro", { teamId: data.teamId, retro: retroList });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("delete_tag", ({ title, tag_id, teamId }) => {
      try {
        const retroList = getRetroList(teamId);
        retroList.map((retro) => {
          if (retro.title === title) {
            retro.tagsList = retro.tagsList.filter((tag) => tag.id !== tag_id);
          }
        });

        io.emit("load_retro", { teamId, retro: retroList });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("complete", ({ complete, team_id }) => {
      try {
        if (complete) {
          io.emit("end", { complete: true, teamId: team_id });

          teamList = teamList.map((team) => {
            if (team.team_id === team_id) {
              createRetro(team_id, team.retroList);
              return {
                ...team,
                retroList: initialRetroList(),
              };
            } else return team;
          });
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      try {
        console.log("Client disconnected.");
      } catch (error) {
        console.log(error);
      }
    });
  });
  return app;
};

const initialRetroList = () => {
  return [
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
};

module.exports = addSocket;
