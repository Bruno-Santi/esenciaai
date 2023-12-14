import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { Survey } from "../pages";
import api from "../../helpers/apiToken";
import { useState, useEffect } from "react";

const SurveyWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, team_id } = queryString.parse(location.search);


    useEffect(() => {
  if (token) {
    localStorage.setItem("authToken", token);
    console.log("Token set:", token);
  }
}, [token]);


useEffect(() => {
  if (token && team_id) {
    navigate(`/survey?token=${token}&team_id=${team_id}`);
  }
}, [token, team_id, navigate]);
  return null;
};

export default SurveyWrapper;
