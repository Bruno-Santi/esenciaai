import { useEffect } from "react";
import { useDashboard } from "../../hooks/useDashboard";

export const DataCollectionReport = () => {
  const { dataAmount } = useDashboard();
  if (dataAmount.length === 0) return <p>NO DATA YET, TRY MAKING ACTIONS</p>;
  return (
    <div>
      <ul className='text-primary text-xl text-left space-y-6 m-auto justify-start'>
        {Object.entries(dataAmount).map(([key, value]) => (
          <li key={key}>
            {key.replace(/_/g, " ").replace(/\b\w/g, (match) => match.toUpperCase())}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
