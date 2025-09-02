import { FiUsers } from "react-icons/fi";
import { Mail, FileText } from "lucide-react";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";

export const ActionsLot = ({ onSendEmails, onGenerateReport }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-[0px_1px_4px_1px_rgba(0,_0,_0,_0.8)]">
      {/* Título */}
      <div className="mb-4 flex items-center gap-2">
        <FiUsers className="text-text-secondary h-6 w-6" />
        <h3 className="text-lg font-medium">Acciones en Lote</h3>
      </div>
      {/* Botones */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        {/* Botón Enviar Correos */}
        <BrutalButton
          variant="primary"
          className="flex items-center justify-start gap-2 text-white"
          onClick={onSendEmails}
          shadow={false}
        >
          <Mail className="ml-4 h-6 w-6" />
          <span>Enviar Correos</span>
        </BrutalButton>
        {/* Botón Generar Reporte */}
        <BrutalButton
          variant="primary"
          className="flex items-center justify-start gap-2 bg-yellow-500 text-white hover:bg-yellow-600"
          onClick={onGenerateReport}
          shadow={false}
        >
          <FileText className="ml-4 h-6 w-6" />
          <span>Generar Reporte</span>
        </BrutalButton>
      </div>
    </div>
  );
};
