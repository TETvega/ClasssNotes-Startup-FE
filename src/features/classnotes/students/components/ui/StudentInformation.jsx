import { Mail } from "lucide-react";
import { FaUser } from "react-icons/fa";

export const StudentInformation = ({ studentName, studentEmail }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="mb-6 flex items-center justify-center gap-4">
        {/* Ícono del usuario */}
        <div className="col-span-2 flex justify-center">
          <div className="flex items-center justify-center rounded-full bg-white p-4">
            <FaUser size={70} className="text-[#0a3b2e]" />
          </div>
        </div>

        {/* Nombre y correo del estudiante */}
        <div className="col-span-10 flex flex-col justify-center text-left">
          <p className="text-2xl font-medium">{studentName ?? ""}</p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {/* Información de Correo */}
            <Mail size={20} className="text-gray-600" />
            <span>{studentEmail ?? ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
