// * Classes:

class DailySurvey {
  constructor(
    user_id,
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

class Comment {
  constructor(note, thumb_up, thumb_down) {
    this.note = note;
    this.thumb_up = thumb_up;
    this.thumb_down = thumb_down;
  }
}

class RetroItem {
  constructor(
    team_id = "",
    sprint = "",
    c1 = [new Comment()],
    c2 = [new Comment()],
    c3 = [new Comment()],
    c4 = [new Comment()]
  ) {
    this.team_id = team_id;
    this.sprint = sprint;
    this.c1 = c1;
    this.c2 = c2;
    this.c3 = c3;
    this.c4 = c4;
  }
}

// * END Classes.

module.exports = { DailySurvey, RetroItem, Comment };
