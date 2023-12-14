import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { Survey } from "../pages";
import api from "../../helpers/apiToken";
import { useState, useEffect } from "react";

const SurveyWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, team_id } = queryString.parse(location.search);
  console.log(token)
   const setTokenInLocalStorage = () => {
      if (token) {
        localStorage.setItem("authToken", token);
      }
    };

    setTokenInLocalStorage();
  useEffect(() => {
   if (token && team_id) {
    return <Survey team_id={team_id} token={token} />;
  }
  }, []);



  return null;
};

export default SurveyWrapper;

