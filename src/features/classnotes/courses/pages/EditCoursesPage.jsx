import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Wizard } from "react-use-wizard";
import { useEditCourse } from "../hooks";
import BackBrutalButton from "../../../../shared/components/ui/BackBrutalButton";
import { Step1, Step3 } from "../components/ui";

export const EditCoursesPage = () => {
  const { courseId } = useParams();
  const { formik, isPending } = useEditCourse(courseId);
  const [isEditing] = useState(true);
  const [editLocation, setEditLocation] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center gap-4">
        <BackBrutalButton />
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          Editar curso
        </h1>
      </div>

      <Wizard>
        <Step1
          formik={formik}
          isPending={isPending}
          isEditing={isEditing}
          editLocation={editLocation}
          setEditLocation={setEditLocation}
          navigate={navigate}
        />
        <Step3
          formik={formik}
          isPending={isPending}
          isEditing={isEditing}
          navigate={navigate}
        />
      </Wizard>
    </div>
  );
};
