// * Classes:

class DailySurvey {
  constructor(
    user_id = "",
    team_id = "",
    sprint = 0,
    question1 = 0,
    question2 = 0,
    question3 = 0,
    question4 = 0,
    comment = ""
  ) {
    this.user_id = user_id;
    this.team_id = team_id;
    this.sprint = sprint;
    this.question1 = question1;
    this.question2 = question2;
    this.question3 = question3;
    this.question4 = question4;
    this.comment = comment;
  }
}
// * END Classes.

// * Classes From Python:

// class dailySurvey(BaseModel):
//     user_id: str
//     team_id: str
//     sprint: int = 1
//     question1: int = 0
//     question2: int = 0
//     question3: int = 0
//     question4: int = 0
//     comment: str

// class Comment(BaseModel):
//     note: str
//     thumb_up: int
//     thumb_down: int

// class RetroItem(BaseModel):
//     team_id: str
//     sprint: int
//     c1: List[Comment]
//     c2: List[Comment]
//     c3: List[Comment]
//     c4: List[Comment]

// * END Classes From Python

module.exports = { DailySurvey };
