from fastapi import FastAPI
from api_mongo.classes import *
from pymongo.mongo_client import MongoClient
from bson import json_util
from datetime import datetime
from dotenv import load_dotenv
import os
import json

app = FastAPI()

#mongodb connection
load_dotenv()
user = os.environ.get("USER")
pwd = os.environ.get("PASSWORD")
uri = f"mongodb+srv://{user}:{pwd}@esenciaia.xeknyc8.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client["essenciaIA_app"]

#post methods -----------------------
@app.post("/survey/add/daily")
def add_daily_survey(survey:dailySurvey):
    try:
        db["survey_data"].update_one(filter={
            "team_id": survey.team_id
        }, update={
  "$push": {
    "daily_survey": {
      "user_id": survey.user_id,
      "date": datetime.now(),
      "sprint": survey.sprint,
      "question1": survey.question1,
      "question2": survey.question2,
      "question3": survey.question3,
      "question4": survey.question4,
      "comment": survey.comment
    }
  }
}, upsert=True)
        return True
    except Exception as e:
        print(str(e))
        return False


@app.post("/survey/add/retro")
def retro_survey(retro:RetroItem):
    try:
        c1_serialized = [comment.model_dump() for comment in retro.c1]
        c2_serialized = [comment.model_dump() for comment in retro.c2]
        c3_serialized = [comment.model_dump() for comment in retro.c3]
        c4_serialized = [comment.model_dump() for comment in retro.c4]
        db["survey_data"].update_one(filter={
            "team_id": retro.team_id
        }, update={
            "$push": {
                "retro": {
                "sprint": retro.sprint,
                "date": datetime.now(),
                "c1": c1_serialized,
                "c2": c2_serialized,
                "c3": c3_serialized,
                "c4": c4_serialized
                }
            }
        }, upsert=True)
        return True
    except Exception as e:
        print(str(e))
        return False

#get methods -----------------------

@app.get("/survey/get/daily/allTeam")
def get_daily_survey(team_id):
    result = json_util.dumps(db["survey_data"].find({"team_id": team_id},{
        "daily_survey":1}))
    return(json.loads(result))

@app.get("/survey/get/retro")
def get_retro(user_id, team_id):
    result = json_util.dumps(db["survey_data"].find({"user_id": user_id, "team_id": team_id},{
        "retro":1}))
    return(json.loads(result))



