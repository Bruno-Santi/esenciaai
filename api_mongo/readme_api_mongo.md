<h1 align="center">API_mongoDB</h1>

<h2>Deployment</h2>
<pre>

-> Install libraries
pip install -r api_mongo/requeriments.txt

-> Create .env
USER= mongoDB_user
PASSWORD= mongoDB_pwd

-> Run fastapi
uvicorn api_mongo.api:app --reload

</pre>

<h2>Database inputs and outputs</h2>
<pre>
# POST /daily_survey 
# Data by body
{
  "user_id": "string",
  "team_id": "string",
  "sprint": int,
  "question1": int,
  "question2": int,
  "question3": int,
  "question4": int,
  "comment": "string"
}

#Response
good: {status:200}
bad: {status:422,etc, details}
</pre>

<pre>
# POST /retro
# Data by body
{
  "team_id": "string",
  "sprint": 0,
  "c1": [
    {
      "note": "string",
      "thumb_up": 0,
      "thumb_down": 0
    }
  ],
  "c2": [
    {
      "note": "string",
      "thumb_up": 0,
      "thumb_down": 0
    }
  ],
  "c3": [
    {
      "note": "string",
      "thumb_up": 0,
      "thumb_down": 0
    }
  ],
  "c4": [
    {
      "note": "string",
      "thumb_up": 0,
      "thumb_down": 0
    }
  ]
}
</pre>

<pre>
# GET /daily_survey/getallTeam?team_id=queryParameter
# Data by queryParameter
[
  {
    "_id": {
      "$oid": "65613754b425b51bac6143d3"
    },
    "daily_survey": [
      {
        "user_id": "juan",
        "date": {
          "$date": "2023-11-24T20:52:09.979Z"
        },
        "sprint": 1,
        "question1": 5,
        "question2": 9,
        "question3": 1,
        "question4": 2,
        "comment": "we need more people, we're overworking"
      },
      {
        "user_id": "juan",
        "date": {
          "$date": "2023-11-24T20:53:49.510Z"
        },
        "sprint": 1,
        "question1": 10,
        "question2": 10,
        "question3": 10,
        "question4": 10,
        "comment": "we are good with the new people"
      },
      {
        "user_id": "maria",
        "date": {
          "$date": "2023-11-24T21:21:56.550Z"
        },
        "sprint": 1,
        "question1": 5,
        "question2": 6,
        "question3": 5,
        "question4": 1,
        "comment": "I wanna leave!"
      },
      {
        "user_id": "rama",
        "date": {
          "$date": "2023-11-27T10:54:13.465Z"
        },
        "sprint": 1,
        "question1": 0,
        "question2": 0,
        "question3": 0,
        "question4": 0,
        "comment": "hello"
      }
    ]
  }
]
</pre>

<pre>
# GET /dashboard/getall_data
</pre>

<pre>
# GET /dashboard
# Data by query
# Response html
</pre>