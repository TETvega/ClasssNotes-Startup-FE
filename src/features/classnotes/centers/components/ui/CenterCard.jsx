import { useNavigate } from "react-router-dom";
import { FaUserFriends, FaRegTrashAlt, FaUniversity } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import { LibraryBig } from "lucide-react";
import { useCenters, useDeleteCenter } from "../../hooks";
import { useBreadcrumbStore } from "../../../../../shared/store/useBreadcrumbStore";
import { MoreActions } from "../../../../../shared/components";
import { EditCenterModal } from "../modals";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";
import ConfirmDeleteModal from "../../../../../shared/components/modals/ConfirmDeleteModal";

export const CenterCard = ({ center, toggleArchive, toggleRecover }) => {
  const { isEditOpen, setIsEditOpen, handleCenterEdited } = useCenters();

  const {
    isPending,
    isConfirmationModalOpen,
    openDeleteModal,
    handleConfirmDelete,
    setIsConfirmationModalOpen,
  } = useDeleteCenter();

  const formatCenterObject = (center) => {
    return {
      id: center.id,
      name: center.name,
      abb: center.abbreviation,
    };
  };

  const navigate = useNavigate();
  const { setCurrentCenter } = useBreadcrumbStore();
  return (
    <div
      key={center.id}
      className="border-disabled-text flex min-h-[220px] flex-col rounded-lg border bg-white p-4 shadow-sm"
    >
      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-start space-x-3 overflow-hidden">
          {center.logo ? (
            <img
              src={center.logo}
              alt={center.name}
              className="h-16 w-16 rounded-full object-cover shadow sm:h-20 sm:w-20"
            />
          ) : (
            <FaUniversity size={70} />
          )}
          <div className="flex flex-col">
            {center.abbreviation ? (
              <h2 className="max-w-[10rem] text-xl font-extrabold text-gray-800 md:max-w-[12rem]">
                {center.abbreviation}
              </h2>
            ) : (
              <h2 className="max-w-[10rem] text-xl font-extrabold text-gray-800 md:max-w-[12rem]">
                {center.name}
              </h2>
            )}
            {center.abbreviation && (
              <p
                className={`max-w-[10rem] ${center.isArchived ? "text-xs" : "text-sm"} text-gray-500 md:max-w-[12rem]`}
              >
                {center.name}
              </p>
            )}
            {center.isArchived && (
              <div className="bg-disabled-bg text-disabled-text border-disabled-text mt-1 inline-block w-fit rounded border px-2 py-1 text-xs">
                Archivado
              </div>
            )}
          </div>
        </div>

        {/* Dropdown Toggle */}
        <div className="relative">
          <MoreActions
            actions={[
              ...(!center.isArchived
                ? [
                    {
                      icon: <CiEdit size={25} />,
                      label: "Editar Información",
                      onClick: () => setIsEditOpen(true),
                    },
                  ]
                : []),
              {
                icon: center.isArchived ? (
                  <BiArchiveOut size={20} />
                ) : (
                  <BiArchiveIn size={20} />
                ),
                label: center.isArchived
                  ? "Desarchivar Centro"
                  : "Archivar Centro",
                onClick: center.isArchived
                  ? () => toggleRecover(center.id)
                  : () => toggleArchive(center.id),
              },
              {
                icon: <FaRegTrashAlt size={20} />,
                label: "Eliminar Centro",
                className: "text-red-600",
                onClick: () => openDeleteModal(center),
              },
            ]}
          />
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <div className="flex justify-between px-2 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <FaUserFriends className="text-gray-400" size={20} />
            <div className="flex flex-col">
              <span className="text-[0.8rem] text-gray-400">Estudiantes</span>
              <span className="font-semibold text-black">
                {center.totalActiveStudents}
              </span>
            </div>
          </div>
          <div className="mr-20 flex items-center gap-1">
            <LibraryBig className="text-gray-400" size={20} />
            <div className="flex flex-col">
              <span className="text-[0.8rem] text-gray-400">Cursos</span>
              <span className="font-semibold text-black">
                {center.totalActiveClasses}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-1">
          <BrutalButton
            variant="primary"
            disabled={center.isArchived}
            onClick={() => {
              navigate(`/centers/${center.id}/courses`);
              setCurrentCenter(formatCenterObject(center));
            }}
          >
            Ver Cursos
          </BrutalButton>
        </div>
      </div>

      {/* Modal para editar el centro */}
      <EditCenterModal
        center={center}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onCenterEdited={handleCenterEdited}
      />

      {/* Modal de Confirmación */}
      <ConfirmDeleteModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        itemType="center"
        itemName={center?.name}
        description="Al eliminar este centro, se eliminarán también sus cursos y actividades asociadas."
        onConfirm={handleConfirmDelete}
        isPending={isPending}
      />
    </div>
  );
};
