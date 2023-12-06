import { SurveyLayout } from "../../layaout";
import { Questions } from "../components/Questions";

export const Survey = ({ teamId, userId }) => {
  return (
    <SurveyLayout>
      <Questions teamId={teamId} userId={userId} />
    </SurveyLayout>
  );
};
