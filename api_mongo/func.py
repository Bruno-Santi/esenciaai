"""from pymongo.mongo_client import MongoClient
from bson import json_util, ObjectId
import json
#from api_classes import *

uri = "mongodb+srv://development:esencia1234@esenciaia.xeknyc8.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)

db = client["essenciaIA_app"]

def get_all_users():
    result = json_util.dumps(db["user"].find())
    return(json.loads(result))

def get_user(name):
    result = json_util.dumps(db["user"].find({"name":name}))
    return(json.loads(result))

def add_user(new_user:user):
    try:
       db["user"].insert_one({
            "name": new_user.name,
            "email": new_user.email,
            "password": new_user.password
        })
       return True
    except Exception as e:
        print(str(e))
        return False
    
def get_user_teams(user_name):
    user = get_user(user_name)
    result = json_util.dumps(db["teamData"].find({"userId": ObjectId(user[0]["_id"]["$oid"])},{
        "project_name":1,"logo":1, "members":1
    }))
    return(json.loads(result))

def add_members(array, team):
    db["teamData"].update_one()
    #return(json.loads(result))


"""

