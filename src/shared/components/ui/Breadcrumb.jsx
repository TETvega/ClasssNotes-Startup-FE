import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import BackBrutalButton from "./BackBrutalButton";
import BrutalButton from "./BrutalButton";
import { useBreadcrumbStore } from "../../store/useBreadcrumbStore";

export const Breadcrumb = ({ onClickBack = () => {} }) => {
  const { currentCenter, currentCourse } = useBreadcrumbStore();
  return (
    <div className="flex flex-col items-start gap-2 py-3 sm:flex-row sm:items-center">
      {/* Botón de retroceso */}
      <BackBrutalButton className="mr-5" onClick={onClickBack} />

      {/* Centro */}
      {currentCenter && (
        <>
          <Link
            to={`/centers/${currentCenter.id}/courses`}
            className="text-decoration-none"
          >
            <BrutalButton
              variant="icon"
              className="text-sm font-bold"
              shadow={false}
            >
              {currentCenter.abb || currentCenter.name}
            </BrutalButton>
          </Link>
          <ChevronRight size={30} className="text-gray-500" strokeWidth={3} />
        </>
      )}

      {/* Curso */}
      {currentCourse.name && (
        <Link
          to={`/courses/${currentCourse.id}`}
          className="text-decoration-none"
        >
          <BrutalButton
            variant="icon"
            className="cursor-default text-sm font-bold"
            shadow={false}
          >
            {currentCourse.name}
          </BrutalButton>
        </Link>
      )}
    </div>
  );
};
