import { BookOpen, School, Users } from "lucide-react";
import { DashboardSummarySkeleton } from "./skeleton";

export const DashboardSummary = ({ total, isLoading }) => {
  if (isLoading) return <DashboardSummarySkeleton />;

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3">
      {/* Card: Total Centros Educativos */}
      <div className="flex flex-col justify-between rounded-lg border bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center space-x-4">
          <School size={32} className="text-action-primary" />
          <h3 className="truncate text-lg font-bold">
            Total Centros Educativos
          </h3>
        </div>
        <div>
          <p className="text-2xl font-semibold">
            {total?.totalCentersCount || 0}
          </p>
          <p className="text-sm text-gray-500">
            Impartiendo clases en {total?.totalCentersCount || 0} centros
          </p>
        </div>
      </div>

      {/* Card: Total Cursos */}
      <div className="flex flex-col justify-between rounded-lg border bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center space-x-4">
          <BookOpen size={32} className="text-action-primary" />
          <h3 className="truncate text-lg font-bold">Total Cursos</h3>
        </div>
        <div>
          <p className="text-2xl font-semibold">
            {total?.totalClassesCount || 0}
          </p>
          <p className="text-sm text-gray-500">
            {total?.totalClassesCount || 0} cursos activos este semestre
          </p>
        </div>
      </div>

      {/* Card: Total Estudiantes */}
      <div className="flex flex-col justify-between rounded-lg border bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center space-x-4">
          <Users size={32} className="text-action-primary" />
          <h3 className="truncate text-lg font-bold">Total Estudiantes</h3>
        </div>
        <div>
          <p className="text-2xl font-semibold">
            {total?.totalStudentsCount || 0}
          </p>
          <p className="text-sm text-gray-500">
            {total?.totalStudentsCount || 0} estudiantes en todos tus centros
          </p>
        </div>
      </div>
    </div>
  );
};
