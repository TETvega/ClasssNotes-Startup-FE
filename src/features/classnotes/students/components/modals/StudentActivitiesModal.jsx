import { Fragment, useRef } from "react";
import {
  Transition,
  Dialog,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Edit, Calendar, Clock } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useStudentActivities } from "../../hooks";
import { formatDate } from "../../../../../shared/utils";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";
import { TagActivityIcon } from "../../../tags/components/ui";
import { useTagsListStore } from "../../../tags/store/useTagsListStore";

export const StudentActivitiesModal = ({ isOpen, onClose, student }) => {
  const { courseId } = useParams();
  const {
    studentInfo,
    isLoadingStudentInfo,
    pendingActivities,
    isLoadingActivities,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useStudentActivities(courseId, student.studentId);

  const observerRef = useRef();
  const navigate = useNavigate();
  const { getTagById } = useTagsListStore();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-opacity-25 fixed inset-0 bg-black/50" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-[700px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-center text-xl font-bold text-gray-900"
                >
                  Actividades Pendientes
                </DialogTitle>
                <div className="flex flex-col gap-4 py-4">
                  {/* Info del estudiante */}
                  {isLoadingStudentInfo ? (
                    <div className="flex animate-pulse items-center gap-4 rounded-lg bg-gray-50 p-4">
                      <div className="h-16 w-16 rounded-full bg-gray-200" />
                      <div className="flex-1">
                        <div className="mb-2 h-4 w-32 rounded bg-gray-200" />
                        <div className="h-3 w-24 rounded bg-gray-200" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                      <FaUser size={70} className="text-secondary-bg" />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {studentInfo?.student?.firstName}{" "}
                          {studentInfo?.student?.lastName}
                        </h3>
                        <div className="text-sm text-gray-500">
                          {studentInfo?.student?.email}
                        </div>
                      </div>
                      <div className="ml-auto rounded-full border border-green-200 bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        {studentInfo?.class?.className}
                      </div>
                    </div>
                  )}
                  {/* Actividades pendientes */}
                  <div className="h-[350px] overflow-y-auto pr-2">
                    {isLoadingActivities ? (
                      <div className="space-y-3">
                        {[...Array(3)].map((_, index) => (
                          <div
                            key={index}
                            className="animate-pulse rounded-lg border border-gray-200 p-4"
                          >
                            <div className="flex items-center justify-between">
                              <div className="h-6 w-40 rounded bg-gray-200" />
                              <div className="h-6 w-16 rounded bg-gray-200" />
                            </div>
                            <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
                            <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />
                          </div>
                        ))}
                      </div>
                    ) : pendingActivities.length === 0 ? (
                      <div className="py-8 text-center text-gray-500">
                        No hay actividades pendientes por calificar
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {pendingActivities.map((activity) => {
                          const tag = getTagById(activity.tagActivityId);
                          return (
                            <div
                              key={activity.id}
                              className="overflow-hidden rounded-lg border border-l-4 border-gray-200 border-l-amber-500 shadow-sm"
                            >
                              <div className="p-4 pb-2">
                                <div className="flex justify-between">
                                  <div className="flex items-start gap-2">
                                    {TagActivityIcon(
                                      tag.icon,
                                      tag.colorHex,
                                      4,
                                      tag.name,
                                    )}
                                    <h4 className="pt-1 text-base font-medium text-gray-900">
                                      {activity.name}
                                    </h4>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      className="flex h-8 items-center gap-1 rounded border border-gray-300 bg-white px-3 text-sm hover:bg-gray-50"
                                      onClick={() =>
                                        navigate(
                                          `/activities/${activity.id}/grade`,
                                        )
                                      }
                                    >
                                      <Edit className="h-3.5 w-3.5" />
                                      Calificar
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="p-4 pt-0">
                                <div className="mb-2 text-sm text-gray-500">
                                  {activity.description}
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="size-3" />
                                    <span>
                                      Fecha límite:{" "}
                                      {formatDate(activity.qualificationDate)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="size-3" />
                                    <span>Valor: {activity.maxScore} pts</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        {hasNextPage && (
                          <div
                            ref={(el) => {
                              if (el) {
                                const observer = new IntersectionObserver(
                                  (entries) => {
                                    if (
                                      entries[0].isIntersecting &&
                                      hasNextPage &&
                                      !isFetchingNextPage
                                    ) {
                                      fetchNextPage();
                                    }
                                  },
                                  { threshold: 0.5 },
                                );
                                observer.observe(el);
                                observerRef.current = observer;
                              }
                            }}
                            className="h-10"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-between gap-2 sm:justify-end">
                  <BrutalButton variant="secondary" onClick={onClose}>
                    Cerrar
                  </BrutalButton>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
