import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useNavigateTo } from ".";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../helpers/apiToken";

export const useQuestions = ({ team_id, token }) => {
  const navigate = useNavigate();
  const [isSendend, setIsSendend] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [rangeValues, setRangeValues] = useState([
    {
      id: "question1",
      value: 5,
    },
    {
      id: "question2",
      value: 5,
    },
    {
      id: "question3",
      value: 5,
    },
    {
      id: "question4",
      value: 5,
    },
  ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRangeValues((prevValues) => [
      ...prevValues.map((item) => (item.id === name ? { ...item, value: parseInt(value, 10) } : item)),
    ]);
    setChangesMade(true);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (isSendend) return;

    const requestBody = rangeValues.reduce((acc, item, index) => {
      const questionKey = `question${index + 1}`;
      return {
        ...acc,
        [questionKey]: item.value,
      };
    }, {});

    const dailySurvey = {
      user_id: token,
      team_id: team_id,
      sprint: 1,
      comment: "",
      ...requestBody,
    };
    try {
      const resp = await api.post(`/survey/daily_survey`, { daily_survey: dailySurvey });
      console.log("todo bien " + resp);
    } catch (error) {
      console.log(error);
    }
    console.log(dailySurvey);
    setIsSendend(true);
    navigate("/members/comments", { state: { dailySurvey } });
  };

  return {
    rangeValues,
    changesMade,
    handleChange,
    handleSubmit,
  };
};
