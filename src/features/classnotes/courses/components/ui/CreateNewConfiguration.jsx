import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { useCourseSettingsForm } from "../../hooks";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const CreateNewConfiguration = ({ activeTab }) => {
  const [tipoCalificacion, setTipoCalificacion] = useState("porcentajes");
  const [notaMinima, setNotaMinima] = useState(70);
  const [notaMaxima, setNotaMaxima] = useState(100);
  const [asistenciaMinima, setAsistenciaMinima] = useState(80);
  const [unidades, setUnidades] = useState([
    { nombre: "Unidad 1", porcentaje: 0 },
  ]);

  const { formik } = useCourseSettingsForm();

  const agregarUnidad = () => {
    setUnidades([...unidades, { nombre: "", porcentaje: 0 }]);
  };

  const actualizarUnidad = (index, campo, valor) => {
    const nuevasUnidades = [...unidades];
    nuevasUnidades[index][campo] = valor;
    setUnidades(nuevasUnidades);
  };

  const eliminarUnidad = (index) => {
    setUnidades(unidades.filter((_, i) => i !== index));
  };
  return (
    <>
      {activeTab === "nueva" && (
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          {/*Tipo de calificacion*/}
          <div className="mb-4">
            <p className="text-md mb-2 font-medium">Tipo de calificación</p>
            <label className="mb-1 block">
              <input
                type="radio"
                checked={tipoCalificacion === "porcentajes"}
                onChange={() => setTipoCalificacion("porcentajes")}
                className="accent-action-primary"
              />{" "}
              Porcentajes (%)
            </label>
            <label className="mb-1 block">
              <input
                type="radio"
                checked={tipoCalificacion === "puntos"}
                onChange={() => setTipoCalificacion("puntos")}
                className="accent-action-primary"
              />{" "}
              Puntos
            </label>
            <div className="text-disabled-text font-regular text-sm">
              Las unidades sumarán un porcentaje total del 100%
            </div>
          </div>

          {/*Notas de clases */}
          <div className="mb-4 grid grid-cols-3 gap-2">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Nota mínima</label>
              <input
                type="number"
                name="mininumGrade"
                className="border-disabled-text rounded border p-2 pl-3"
                placeholder="Nota mínima"
                value={notaMinima}
                onChange={(e) => setNotaMinima(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-regular mb-1 text-sm">Nota máxima</label>
              <input
                type="number"
                name="maximumGrade"
                className="border-disabled-text rounded border p-2 pl-3"
                placeholder="Nota máxima"
                value={notaMaxima}
                onChange={(e) => setNotaMaxima(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-regular mb-1 text-sm">
                Asistencia mínima
              </label>
              <input
                type="number"
                name="minimumAttendanceTime"
                className="border-disabled-text rounded border p-2 pl-3"
                placeholder="Asistencia mínima"
                value={asistenciaMinima}
                onChange={(e) => setAsistenciaMinima(e.target.value)}
              />
            </div>
          </div>

          {/*Fechas de inicio y final */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold sm:text-base">
                Inicio
              </label>
              <input
                type="datetime-local"
                name="startDate"
                required
                className="border-disabled-text rounded-lg border p-2 pl-3 text-sm sm:text-base md:text-lg lg:text-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold sm:text-base">
                Final
              </label>
              <input
                type="datetime-local"
                name="endDate"
                required
                className="border-disabled-text rounded-lg border p-2 pl-3 text-sm sm:text-base md:text-lg lg:text-lg"
              />
            </div>
          </div>

          {/* Unidad de Curso */}
          <div className="mb-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-medium">Unidades del curso</p>
              <div className="w-50">
                <BrutalButton
                  onClick={agregarUnidad}
                  variant="secondary"
                  className="h-10"
                >
                  + Agregar unidad
                </BrutalButton>
              </div>
            </div>

            {unidades.map((unidad, index) => (
              <div key={index} className="mb-2 grid w-full gap-2">
                {/* Nombre de la Unidad + Botón Eliminar */}
                <label>Nombre de la unidad</label>
                <div className="grid w-full grid-cols-12 items-center gap-8">
                  <input
                    type="text"
                    className="col-span-10 rounded border p-1 pl-3"
                    placeholder="Nombre de la unidad"
                    value={unidad.nombre}
                    onChange={(e) =>
                      actualizarUnidad(index, "nombre", e.target.value)
                    }
                  />
                  <BrutalButton
                    variant="icon"
                    icon={<FaRegTrashAlt className="h-5 w-5" />}
                    onClick={() => eliminarUnidad(index)}
                    className="bg-error-bg hover:bg-error-text col-span-2 h-10 w-10"
                  />
                </div>
                <label>Porcentaje (%)</label>
                <div className="grid w-full grid-cols-12">
                  <input
                    type="number"
                    className="col-span-10 rounded border p-1 pl-3"
                    placeholder="%"
                    value={unidad.porcentaje}
                    onChange={(e) =>
                      actualizarUnidad(index, "porcentaje", e.target.value)
                    }
                  />
                </div>
                {/* Porcentaje */}
              </div>
            ))}
          </div>
        </form>
      )}
    </>
  );
};
