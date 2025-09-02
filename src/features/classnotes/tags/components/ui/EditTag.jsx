import { IoMdSave } from "react-icons/io";
import { useEditTagForm } from "../../hooks";
import { TagForm } from "../TagForm";

export const EditTag = ({ goToStep, tag }) => {
  const { formik, isPending } = useEditTagForm(goToStep, tag);

  return (
    <div>
      <TagForm
        formik={formik}
        title="Editar etiqueta"
        submitButtonText="Guardar cambios"
        submitButtonIcon={<IoMdSave size={20} />}
        onCancel={() => goToStep(0)}
        isPending={isPending}
        isEdit={true}
      />
    </div>
  );
};
