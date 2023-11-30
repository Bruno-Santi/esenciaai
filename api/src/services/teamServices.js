const { Op } = require("sequelize");
const { Team, User } = require("../app/db");
const { UserTeam } = require("../app/dbRelations")
const throwError = require("../helpers/customError");
const { v4: uuidv4 } = require("uuid");
const { getServices, addServices } = require(".");

const teamServices = {}

teamServices.createTeamTest = async(team, user) => {

      const existUser = await User.findByPk(user)
      if(!existUser) throw new Error("no existe este usuario por ID")

      const existTeam = await Team.findOne({ where: { name: team.name} });
      if(existTeam) throw new Error("ya existe este Team") 

      const newTeam = await Team.create(team)
             await UserTeam.create({
        userId: user,
        teamId: newTeam.id,
        role: "admin",
        job_role: "scrum master",
        status: "accepted"
      })

      return newTeam
}

teamServices.viewMembers = async(userId) => {
      const adminUser = await UserTeam.findAll({
            where: { userId }, 
            include: [
              {
                model: Team,
                attributes:["name"]
              },
              {
                model: User,
                attributes: ["first_name", "last_name", "email"]  
              },
            ],
          });
      
          return adminUser;
}
 

module.exports = teamServices