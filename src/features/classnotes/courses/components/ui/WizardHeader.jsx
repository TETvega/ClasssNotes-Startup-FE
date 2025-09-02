export const WizardHeader = ({ activeStep }) => {
  const steps = [
    "Información básica",
    "Sistema de evaluación",
    "Geolocalización",
    "Unidades",
  ];

  return (
    <div className="mb-6 flex items-center justify-between">
      {steps.map((label, i) => {
        const isCompleted = i < activeStep;
        const isActive = i === activeStep;

        const circleColor = isActive
          ? "bg-action-primary"
          : isCompleted
            ? "bg-success-bg"
            : "bg-disabled-text-bg";

        const labelColor = isActive
          ? "text-action-primary"
          : isCompleted
            ? "text-text-active-primary"
            : "text-text-active-primary";

        const numberColor = isActive
          ? "text-white"
          : isCompleted
            ? "text-text-active-primary"
            : "text-text-active-primary";

        return (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-extrabold transition-all duration-300 ${circleColor} ${numberColor}`}
            >
              {i + 1}
            </div>
            <span
              className={`text-md font-bold transition-colors duration-300 ${labelColor}`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
