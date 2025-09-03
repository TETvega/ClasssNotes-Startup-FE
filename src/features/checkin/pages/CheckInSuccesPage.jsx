import { CircleCheckBig } from "lucide-react";

export const CheckInSuccesPage = () => {
  return (
    <section className="flex h-[550px] w-screen items-center justify-center">
      <div className="flex flex-col items-center border-2 border-black bg-white p-14 text-center">
        <h1 className="mb-4 text-2xl font-bold">Registro de Asistencia</h1>
        <CircleCheckBig size={100} className="text-action-color-primary" />
        <span className="text-action-color-primary">
          <p className="text-lg">¡Asistencia registrada con éxito!</p>
          <p className="text-sm">Gracias por asistir a la clase.</p>
        </span>
        <p className="mb-5"></p>
        <p className="fixed mt-52 text-sm">Puede cerrar esta pestaña.</p>
      </div>
    </section>
  );
};
