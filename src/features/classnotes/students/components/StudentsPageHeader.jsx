import { Plus, Upload, UserPlus } from "lucide-react";
import { useState } from "react";
import { MoreActions } from "../../../../shared/components";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";
import { AddStudents, ImportFromExcel } from "./ui";

export const StudentsPageHeader = ({ students }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  return (
    <div className="mb-3 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      {/* Parte Izquierda del Header */}
      <section>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-800">Estudiantes</h1>
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            {students.length} estudiantes
          </span>
        </div>
      </section>

      {/* Parte Derecha del Header */}
      <section className="flex gap-2 max-[760px]:w-full">
        {/* Dropdown Añadir */}
        <div className="relative w-full">
          <MoreActions
            actions={[
              {
                icon: <UserPlus />,
                label: "Añadir manualmente",
                onClick: () => setIsModalOpen(true),
              },
              {
                icon: <Upload />,
                label: "Añadir desde Excel",
                onClick: () => setIsImportModalOpen(true),
              },
            ]}
            trigger={
              <BrutalButton
                type="icon"
                icon={<Plus className="mr-2 size-4" />}
                className="w-full px-4 py-2"
              >
                Añadir Estudiantes
              </BrutalButton>
            }
          />
        </div>
      </section>

      {/* Modal para añadir estudiantes manualmente */}
      <AddStudents
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Modal papra añadir estudiantes por excel */}
      <ImportFromExcel
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
    </div>
  );
};
