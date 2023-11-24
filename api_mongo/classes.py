from pydantic import BaseModel

class dailySurvey(BaseModel):
    user_id: str
    team_id: str
    sprint: int
    question1: int
    question2: int
    question3: int
    question4: int