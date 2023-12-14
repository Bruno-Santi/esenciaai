import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { Survey } from "../pages";
import api from "../../helpers/apiToken";
import { useState, useEffect } from "react";

const SurveyWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
 const searchParams = new URLSearchParams(location.search);

 const [params,setParams] = useState({token:"",team_id:""});

  const token = searchParams.get("token");
  const team_id = searchParams.get("team_id");

  //  const setTokenInLocalStorage = () => {
  //     if (token) {
  //       localStorage.setItem("authToken", token);
  //     }
  //   };

useEffect(() => {
setParams({token:searchParams.get("token"),team_id:searchParams.get("team_id")});
}, [searchParams]);

// setTokenInLocalStorage();

  
  if (params && params.team_id && params.token) {
   return (<Survey team_id={params.team_id} token={params.token}/>)
 }
else return null;
};

export default SurveyWrapper;

