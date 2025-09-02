import { ChevronLeft } from "lucide-react";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";

export const ActivityHeader = ({ onBack, center, course, className = "" }) => {
  return (
    <div
      className={`mb-6 flex flex-wrap items-center gap-2 sm:gap-4 ${className}`}
    >
      {/* Boton de regreso */}
      <div className="mr-1 flex items-center justify-center">
        <BrutalButton
          onClick={onBack}
          variant="icon"
          icon={<ChevronLeft size={24} className="text-white sm:size-8" />}
          className="bg-secondary-bg size-12"
          shadow={false}
        />
      </div>

      {/* Abreviación del centro */}
      <div className="bg-secondary-bg flex items-center rounded-md p-2 px-3">
        <span className="text-xl font-bold text-white sm:text-2xl">
          {center.abbreviation}
        </span>
      </div>

      {/* Nombre de la clase */}
      <div className="flex items-center">
        <span className="text-xl font-bold sm:text-2xl md:text-3xl">
          {course.name}
        </span>
      </div>
    </div>
  );
};
