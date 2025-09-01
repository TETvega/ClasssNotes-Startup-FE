export const CardStates = ({ label, count, icon: Icon }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4">
      <div>
        <p className="mb-1 text-gray-600">{label}</p>
        <h2 className="text-3xl font-bold">{count}</h2>
      </div>
      <div className="text-4xl text-green-500">
        <Icon />
      </div>
    </div>
  );
};
