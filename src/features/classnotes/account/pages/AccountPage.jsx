import { useState } from "react";
import { IoBanOutline } from "react-icons/io5";
import { useUserInfo } from "../../../../shared/hooks/useUserInfo";
import { useDeleteUserAccount } from "../hooks";
import { OptionCard } from "../components/ui";
import ConfirmDeleteModal from "../../../../shared/components/modals/ConfirmDeleteModal";

export const AccountPage = () => {
  const { getUserNameFromLocalStorage, getUserEmailFromLocalStorage } = useUserInfo();
  const userName = getUserNameFromLocalStorage();
  const userEmail = getUserEmailFromLocalStorage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteUser, isPending } = useDeleteUserAccount();

  return (
    <div className="mx-auto w-full min-w-[335px] p-4 sm:w-6xl sm:p-6 md:w-2xl lg:w-4xl">
      {/* Card de detalles de cuenta */}
      <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
        Detalles de la cuenta
      </h1>
      <div className="mt-2 grid w-full grid-cols-1 gap-4 rounded-lg border bg-gray-100 p-4">
        <OptionCard
          title="Correo electrónico"
          value={userEmail}
          link="/account/change-email"
        />
        <OptionCard
          title="Contraseña"
          value="••••••••••••"
          link="/account/change-password"
        />
        <OptionCard
          title="Nombre de perfil"
          value={userName}
          link="/account/change-name"
        />
      </div>

      {/* Zona de Peligro */}
      <h2 className="text-action-delete mt-3 text-lg font-semibold sm:text-xl">
        Zona de Peligro
      </h2>
      <div className="mt-2 grid w-full grid-cols-1 gap-4 rounded-lg border bg-gray-100 p-4">
        <OptionCard
          title="Eliminar Cuenta"
          icon={<IoBanOutline size={22} />}
          borderColor="border-action-delete"
          textColor="text-action-delete"
          link="/#"
          showArrow={true}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Modal */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => !isPending && setIsModalOpen(false)}
        itemType="cuenta"
        itemName={userName}
        description="Al eliminar tu cuenta, perderás acceso permanente a tus datos, actividades y configuraciones. Esta acción no se puede deshacer."
        onConfirm={deleteUser}
        isPending={isPending}
      />
    </div>
  );
};
