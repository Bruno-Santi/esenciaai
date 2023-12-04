import { ChangeEvent, SyntheticEvent, useState } from "react";

export const useQuestions = () => {
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
    console.log(rangeValues);
  };

  return {
    rangeValues,
    changesMade,
    handleChange,
    handleSubmit,
  };
};
