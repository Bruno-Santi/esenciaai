import { useDashboard } from "../../hooks/useDashboard";

export const DataCollectionReport = () => {
  const { dataAmount } = useDashboard();

  return (
    <div>
      {Object.keys(dataAmount).length !== 0 ? (
        <ul className='text-primary text-xl text-left space-y-6 m-auto justify-start'>
          {Object.entries(dataAmount).map(([key, value]) => (
            <li key={key}>
              {key.replace(/_/g, " ").replace(/\b\w/g, (match) => match.toUpperCase())}: {value}
            </li>
          ))}
        </ul>
      ) : (
        <p>NO DATA YET, TRY MAKING ACTIONS</p>
      )}
    </div>
  );
};
