import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useNavigateTo } from ".";
import { Navigate, useNavigate } from "react-router-dom";

export const useQuestions = ({ teamId, userId }) => {
  const data = { teamId, userId };
  const { handleNavigate } = useNavigateTo();
  const navigate = useNavigate();
  const [isSendend, setIsSendend] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [rangeValues, setRangeValues] = useState([
    {
      id: "q1",
      value: 5,
    },
    {
      id: "q2",
      value: 5,
    },
    {
      id: "q3",
      value: 5,
    },
    {
      id: "q4",
      value: 5,
    },
  ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRangeValues((prevValues) => [
      ...prevValues.map((item) =>
        item.id === name ? { ...item, value: parseInt(value, 10) } : item
      ),
    ]);
    setChangesMade(true);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isSendend) return;

    const requestBody = rangeValues.reduce((acc, item, index) => {
      const questionKey = `question${index + 1}`;
      return {
        ...acc,
        [questionKey]: item.value,
      };
    }, {});

    const finalBody = {
      user_id: data.userId,
      team_id: data.teamId,
      sprint: 1,
      comment: "",
      ...requestBody,
    };

    console.log(finalBody);
    setIsSendend(true);
    navigate("/members/comments", { state: { finalBody } });
  };

  return {
    rangeValues,
    changesMade,
    handleChange,
    handleSubmit,
  };
};
