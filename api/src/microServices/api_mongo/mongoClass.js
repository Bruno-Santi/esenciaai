// class dailySurvey {
//   constructor(
//     user_id,
//     team_id,
//     sprint,
//     question1,
//     question2,
//     question3,
//     question4,
//     comment
//   ) {
//     this.user_id = user_id;
//     this.team_id = team_id;
//     this.sprint = sprint;
//     this.question1 = question1;
//     this.question2 = question2;
//     this.question3 = question3;
//     this.question4 = question4;
//     this.comment = comment;
//   }
// }

class dailySurvey {
  constructor(user_id, team_id) {
    this.user_id = user_id;
    this.team_id = team_id;
  }
}

module.exports = { dailySurvey };
