import { IoMdSave } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useActivityForm, useDeleteActivity, useEditActivityForm } from "../hooks";
import { ActivityFormSkeleton } from "../components/skeleton";
import { Breadcrumb } from "../../../../shared/components/ui";
import { ActivityForm } from "../components";
import { TagsListModal } from "../../tags/components/modals";
import ConfirmDeleteModal from "../../../../shared/components/modals/ConfirmDeleteModal";

export const EditActivityPage = () => {
  const location = useLocation();
  const activityId = location.state?.activityId || "";
  const { formik, isPending } = useEditActivityForm(activityId);
  const { 
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    handleDelete
  } = useDeleteActivity();
  const {
    units,
    tags,
    isModalOpen,
    setIsModalOpen,
    handleTagSelect,
  } = useActivityForm(formik);

  if (isPending) return <ActivityFormSkeleton />

  return (
    <div className="w-full">
      {/* Navegación */}
      <Breadcrumb />

      {/* Formulario de Actividad */}
      <ActivityForm
        formik={formik}
        units={units}
        tags={tags}
        title="Editar Actividad"
        submitButtonText="Guardar Cambios"
        submitButtonIcon={<IoMdSave size={20} />}
        onCancel={formik.handleReset}
        isPending={isPending}
        setIsModalOpen={setIsModalOpen}
        showDeleteButton={true}
        onDelete={() => setIsConfirmModalOpen(true)}
        editMode={true}
      />

      {/* Modal de etiquetas */}
      <TagsListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectTag={handleTagSelect}
        tags={tags}
      />

      {/* Modal de confirmación de eliminación */}
      <ConfirmDeleteModal
        isOpen={isConfirmModalOpen}
        onClose={() => !isPending && setIsConfirmModalOpen(false)}
        itemType="actividad"
        itemName={formik.values.name}
        description="Al eliminar esta actividad, todos los datos asociados se perderán permanentemente."
        onConfirm={() => handleDelete(activityId)}
        isPending={isPending}
      />
    </div>
  );
};
