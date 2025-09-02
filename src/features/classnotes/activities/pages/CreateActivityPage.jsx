import { CiCirclePlus } from "react-icons/ci";
import { useActivityForm, useCreateActivityForm } from "../hooks";
import { Breadcrumb } from "../../../../shared/components/ui";
import { ActivityForm } from "../components";
import { TagsListModal } from "../../tags/components/modals";

export const CreateActivityPage = () => {
  const { formik, isPending } = useCreateActivityForm();
  const {
    units,
    tags,
    isModalOpen,
    setIsModalOpen,
    handleTagSelect,
  } = useActivityForm(formik);

  return (
    <div className="w-full">
      {/* Navegación */}
      <Breadcrumb />

      {/* Formulario de Actividad */}
      <ActivityForm
        formik={formik}
        units={units}
        tags={tags}
        title="Nueva Actividad"
        submitButtonText="Crear Actividad"
        submitButtonIcon={<CiCirclePlus size={20} />}
        onCancel={formik.handleReset}
        isPending={isPending}
        setIsModalOpen={setIsModalOpen}
      />

      {/* Modal de etiquetas */}
      <TagsListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectTag={handleTagSelect}
        tags={tags}
      />
    </div>
  );
};
