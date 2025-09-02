import { useState } from "react";
import { useCreateCourseForm } from "../hooks";
import BackBrutalButton from "../../../../shared/components/ui/BackBrutalButton";
import { CreateCourse } from "../components";
import { CourseSettingModal } from "../components/modals";

export const CoursesCreatePage = () => {
  const { formik, isLoading } = useCreateCourseForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newConfig, setNewConfig] = useState(true);
  const [scoreType, setScoreType] = useState("");
  const [isScoreTypeReadOnly, setIsScoreTypeReadOnly] = useState(false);

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center gap-4">
        <BackBrutalButton />
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          Creación de cursos
        </h1>
      </div>

      {/* Contenedor principal */}
      <CreateCourse
        newConfig={newConfig}
        setNewConfig={setNewConfig}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        scoreType={scoreType}
        setScoreType={setScoreType}
        formik={formik}
        isLoading={isLoading}
        isScoreTypeReadOnly={isScoreTypeReadOnly}
        setIsScoreTypeReadOnly={setIsScoreTypeReadOnly}
      />

      <CourseSettingModal
        newConfig={newConfig}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setScoreType={setScoreType}
        formik={formik}
        isScoreTypeReadOnly={isScoreTypeReadOnly}
        setIsScoreTypeReadOnly={setIsScoreTypeReadOnly}
      />
    </div>
  );
};
