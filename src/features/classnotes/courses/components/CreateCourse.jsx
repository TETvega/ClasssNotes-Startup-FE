import { Wizard } from "react-use-wizard";
import { useState } from "react";
import { Step1, Step2, Step3, Step4, WizardHeader } from "./ui";

export const CreateCourse = ({
  formik,
  isLoading,
  newConfig,
  setNewConfig,
  setIsModalOpen,
  scoreType,
  setScoreType,
  isScoreTypeReadOnly,
  setIsScoreTypeReadOnly,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="mx-auto max-w-5xl space-y-6 rounded border bg-white p-6 shadow">
      <WizardHeader activeStep={activeStep} />
      <Wizard onStepChange={(step) => setActiveStep(step)}>
        <Step1
          formik={formik}
          newConfig={newConfig}
          setNewConfig={setNewConfig}
          setIsModalOpen={setIsModalOpen}
          setScoreType={setScoreType}
        />
        <Step2
          formik={formik}
          scoreType={scoreType}
          setScoreType={setScoreType}
          isScoreTypeReadOnly={isScoreTypeReadOnly}
          setIsScoreTypeReadOnly={setIsScoreTypeReadOnly}
        />
        <Step3 formik={formik} />
        <Step4 formik={formik} isLoading={isLoading} />
      </Wizard>
    </div>
  );
};
