import { useCreateTagForm } from "../../hooks";
import { TagForm } from "../TagForm";

export const CreateTag = ({ goToStep }) => {
  const { formik, isPending } = useCreateTagForm(goToStep);

  return (
    <div>
      <TagForm
        formik={formik}
        title="Nueva etiqueta"
        submitButtonText="Crear etiqueta"
        onCancel={() => goToStep(0)}
        isPending={isPending}
      />
    </div>
  );
};
