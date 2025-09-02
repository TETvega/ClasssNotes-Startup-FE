export const ConfigurationStack = ({ setActiveTab, activeTab }) => {
  return (
    <div className="mb-4 flex justify-center rounded-sm bg-gray-100 p-1">
      <button
        className={`flex-1 rounded-sm p-1 ${activeTab === "nueva" ? "bg-white" : "text-gray-500"}`}
        onClick={() => setActiveTab("nueva")}
      >
        Nueva configuración
      </button>
      <button
        className={`flex-1 rounded-sm p-1 ${activeTab === "existente" ? "bg-white" : "text-gray-500"}`}
        onClick={() => setActiveTab("existente")}
      >
        Usar configuración existente
      </button>
    </div>
  );
};
