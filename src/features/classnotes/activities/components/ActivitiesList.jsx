import { TbEdit } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { BookCopy, BookText, CalendarDays, Eye, School, Star, Trash2 } from "lucide-react";
import { useBreadcrumbStore } from "../../../../shared/store/useBreadcrumbStore";
import { useTagsListStore } from "../../tags/store/useTagsListStore";
import { formatDate } from "../../../../shared/utils";
import { NotFound } from "../../../../shared/components/ui";

export const ActivitiesList = ({
  activities,
  TagActivityIcon,
  showCenterName,
  showCourseName,
  showUnit,
  handleDeleteClick,
}) => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { setCurrentCourse, setCurrentCenter } = useBreadcrumbStore();
  const { getTagById } = useTagsListStore();

  const formatCourseObject = (activity) => {
    return {
      id: activity.courseId,
      name: activity.courseName,
    };
  };

  const formatCenterObject = (activity) => {
    return {
      id: activity.centerId,
      abb: activity.centerAbb || activity.centerName,
    };
  };

  return (
      <div className="mt-4 space-y-3">
        {activities.length > 0 ? (
          activities.map((activity) => {
            const tag = getTagById(activity.tagActivityId);
            return (
              <div
                key={activity.id}
                className="bg-primary-bg flex flex-col justify-between rounded-lg border border-gray-200 shadow-sm p-3 sm:p-4 md:flex-row md:items-center"
              >
                <div className="flex-1">
                  {/* Nombre de la actividad y etiqueta */}
                  <div className="mb-2 flex items-center gap-2">
                    <h4 className="text-sm font-medium sm:text-base">
                      {activity.name}
                    </h4>
                    {/* Componente de las tags */}
                    {tag && (
                      <div className="inline-block">
                        {TagActivityIcon(tag.icon, tag.colorHex, 4, tag.name)}
                      </div>
                    )}
                  </div>

                  {/* Detalles adicionales opcionales */}
                  <div className="text-inactive-primary-text flex flex-col text-xs sm:text-sm md:flex-row md:gap-6">
                    {showCenterName && activity.centerName && (
                      <span className="flex items-center gap-1">
                        <School size={15} />
                        {activity.centerAbb
                          ? activity.centerAbb
                          : activity.centerName}
                      </span>
                    )}
                    {showCourseName && activity.courseName && (
                      <span className="flex items-center gap-1">
                        <BookText size={15} />
                        {activity.courseName}
                      </span>
                    )}
                    {activity.maxScore && (
                      <span className="flex items-center gap-1">
                        <Star size={15} />
                        {activity.maxScore}
                      </span>
                    )}
                    {showUnit && activity.unit && (
                      <span className="flex items-center gap-1">
                        <BookCopy size={15} />
                        {activity.unit}
                      </span>
                    )}
                    {activity.qualificationDate && (
                      <span className="flex items-center gap-1">
                        <CalendarDays size={15} />
                        Fecha de calificación:{" "}
                        {formatDate(activity.qualificationDate)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="mt-3 flex gap-2 md:mt-0">
                  <button
                    onClick={() => {
                      navigate(`/activities/${activity.id}/grade`);
                      setCurrentCourse(formatCourseObject(activity));
                      setCurrentCenter(formatCenterObject(activity));
                    }}
                    className="hover:bg-contrast-primary-bg cursor-pointer rounded-full p-2"
                  >
                    <Eye className="text-text-active-primary h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    className="hover:bg-contrast-primary-bg cursor-pointer rounded-full p-2"
                    onClick={() =>
                      navigate(
                        `/activities/${courseId === undefined ? activity.courseId : courseId}/edit`, 
                        { state: { activityId: activity.id } }, // Pasar el ID de la actividad
                      )
                    }
                  >
                    <TbEdit className="text-text-active-primary h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    className="hover:bg-contrast-primary-bg cursor-pointer rounded-full p-2"
                    onClick={() => handleDeleteClick(activity)}
                  >
                    <Trash2 className="text-red-500 h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <span>
            <NotFound message="No se encontraron actividades" />
          </span>
        )}
      </div>
  );
};
