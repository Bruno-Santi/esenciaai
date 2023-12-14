import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { Survey } from "../pages";
import api from "../../helpers/apiToken";
import { useState, useEffect } from "react";

const SurveyWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
 const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const team_id = searchParams.get("team_id");
  console.log(token)
   const setTokenInLocalStorage = () => {
      if (token) {
        localStorage.setItem("authToken", token);
      }
    };

    setTokenInLocalStorage();
  useEffect(() => {
   if (token && team_id) {
     <Survey team_id={team_id} token={token} />;
  }
  }, []);



  return null;
};

export default SurveyWrapper;

