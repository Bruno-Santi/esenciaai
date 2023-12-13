import { useDashboard } from "../../hooks/useDashboard";

const renderValue = (value: unknown): React.ReactNode => {
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  } else {
    return "Unsupported Type";
  }
};
export const DataCollectionReport = () => {
  const { dataAmount } = useDashboard();
  if (dataAmount.length === 0) return <p>NO DATA YET, TRY MAKING ACTIONS</p>;

  return (
    <div>
      <ul className='text-primary text-xl text-left space-y-6 m-auto justify-start'>
        {Object.entries(dataAmount).map(([key, value]) => (
          <li key={key}>
            {key.replace(/_/g, " ").replace(/\b\w/g, (match) => match.toUpperCase())}: {renderValue(value)}
          </li>
        ))}
      </ul>
    </div>
  );
};
