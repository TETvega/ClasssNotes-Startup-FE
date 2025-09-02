import { useState } from "react";

export const useWizard = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);

  // Estado para almacenar datos adicionales
  const [stepData, setStepData] = useState(null); 

  // Ir al paso o vista que se desea
  const goToStep = (stepNumber, data = null) => {
    if (stepNumber < 0 || stepNumber > 3) return;
    setDirection(stepNumber > step ? 1 : -1);
    setStep(stepNumber);
    if (data) setStepData(data);
  };

  // Avanzar 1 paso
  const nextStep = (data = null) => {
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, 3));
    if (data) setStepData(data);
  };

  // Retroceder 1 paso
  const prevStep = (data = null) => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 0));
    if (data) setStepData(data);
  };

  const resetWizard = () => {
    setDirection(-1);
    setStep(0);
    setStepData(null);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 250 : -250,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 250 : -250,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return {
    step,
    direction,
    variants,
    stepData,
    goToStep,
    nextStep,
    prevStep,
    resetWizard,
  };
};
