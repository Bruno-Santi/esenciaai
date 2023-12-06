import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { Survey } from "../pages";
import api from "../../helpers/apiToken";
import { useState, useEffect } from "react";

const SurveyWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { teamId, userId } = queryString.parse(location.search);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const resp = await api.get(`/teams/members/${teamId}`);
        console.log(resp.data);

        const user = resp.data.user_list.find((user) => user.id === userId);

        if (user) {
          setTeam(resp.data);
        } else {
          navigate("/error");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTeam();
  }, [teamId, userId, navigate]);

  if (team) {
    return <Survey teamId={teamId} userId={userId} />;
  }

  return null;
};

export default SurveyWrapper;
