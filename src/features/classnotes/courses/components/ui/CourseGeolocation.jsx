import { useEffect, useState } from "react";
import { useWizard } from "react-use-wizard";
import { TbCurrentLocation } from "react-icons/tb";
import { MapComponent } from "./MapComponent";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export function Step3({ formik, isEditing, isPending }) {
  const { previousStep, nextStep } = useWizard();

  const getInitialLat = () =>
    isEditing
      ? formik.values.x || 14.072275
      : formik.values.courseSetting?.getLocationDto?.x || 14.072275;

  const getInitialLng = () =>
    isEditing
      ? formik.values.y || -87.192136
      : formik.values.courseSetting?.getLocationDto?.y || -87.192136;

  const [location, setLocation] = useState({
    lat: getInitialLat(),
    lng: getInitialLng(),
  });

  // Para reflejar el cambio de valores iniciales en el mapa cuando se cargan de forma asincrónica
  useEffect(() => {
    setLocation({ lat: getInitialLat(), lng: getInitialLng() });
  }, [formik.values.x, formik.values.y]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);

          if (isEditing) {
            formik.setFieldValue("x", newLocation.lat);
            formik.setFieldValue("y", newLocation.lng);
          } else {
            formik.setFieldValue(
              "courseSetting.getLocationDto.x",
              newLocation.lat,
            );
            formik.setFieldValue(
              "courseSetting.getLocationDto.y",
              newLocation.lng,
            );
          }
        },
        (error) => {
          console.error("Error al obtener ubicación:", error);
          alert("No se pudo obtener tu ubicación");
        },
      );
    } else {
      alert("Geolocalización no soportada por este navegador.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-disabled-text flex flex-row justify-between border-t-2 py-3">
        <h2 className="text-xl font-bold">Mi ubicación</h2>
        <button
          onClick={handleGetLocation}
          className="bg-disabled-bg hover:bg-disabled-text-bg border-disabled-text flex cursor-pointer flex-row items-center gap-2 rounded-lg border-2 p-2"
        >
          <TbCurrentLocation size={20} />
          Obtener ubicación
        </button>
      </div>

      <div className="rounded border p-2">
        <MapComponent
          location={location}
          onLocationChange={(newLoc) => {
            setLocation(newLoc);
            if (isEditing) {
              formik.setFieldValue("x", newLoc.lat);
              formik.setFieldValue("y", newLoc.lng);
            } else {
              formik.setFieldValue(
                "courseSetting.getLocationDto.x",
                newLoc.lat,
              );
              formik.setFieldValue(
                "courseSetting.getLocationDto.y",
                newLoc.lng,
              );
            }
          }}
        />
      </div>

      <div className="border-disabled-text-bg border-b-2">
        <p className="py-3">
          Si la ubicación no es precisa, puedes arrastrar el pin a tu ubicación
          real.
        </p>
      </div>

      <div className="flex justify-between">
        <div className="w-28">
          <BrutalButton variant="secondary" onClick={previousStep}>
            Anterior
          </BrutalButton>
        </div>
        {isEditing ? (
          <div className="w-44">
            <BrutalButton
              variant="primary"
              onClick={formik.handleSubmit}
              disabled={isPending}
            >
              {isPending ? "Guardando..." : "Guardar cambios"}
            </BrutalButton>
          </div>
        ) : (
          <div className="w-28">
            <BrutalButton variant="primary" onClick={nextStep}>
              Siguiente
            </BrutalButton>
          </div>
        )}
      </div>
    </div>
  );
}
