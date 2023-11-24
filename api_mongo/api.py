from fastapi import FastAPI
from api_mongo.classes import *
from pymongo.mongo_client import MongoClient
from bson import json_util, ObjectId
from datetime import datetime
from dotenv import load_dotenv
import os
import json

app = FastAPI()

#mongodb connection
load_dotenv()
user = os.environ.get("USER")
pwd = os.environ.get("PASSWORD")
print(user, pwd)
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
      "question4": survey.question4
    }
  }
}, upsert=True)
        return True
    except Exception as e:
        print(str(e))
        return False


@app.post("/survey/add/retro")
def retro_survey():
    pass


#get methods -----------------------
@app.get("/survey/get/daily")
def get_daily_survey(user_id, team_id):
    result = json_util.dumps(db["survey_data"].find({"user_id": user_id, "team_id": team_id},{
        "daily_survey":1
    }))
    return(json.loads(result))


