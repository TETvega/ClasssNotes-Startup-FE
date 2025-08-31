import { Link } from "react-router-dom";
import { LuCircleUserRound, LuMenu, LuX } from "react-icons/lu";
import { appName } from "../../constants";
import { useNavBar } from "../../hooks/useNavBar";

export const NavBar = () => {
  const {
    isMenuOpen,
    isProfileOpen,
    profileMenuRef,
    mobileMenuRef,
    routes,
    handleMenuToggle,
    toggleProfileMenu,
    handleLogout,
    handleNavigation,
    isPathActive,
  } = useNavBar();

  return (
    <nav className="bg-secondary-bg relative w-full py-4 font-semibold shadow">
      <div className="mx-4 flex items-center justify-between md:mx-8 lg:mx-16 xl:mx-20">
        {/* Logo */}
        <div className="z-20 flex items-center">
          <Link to="/" className="text-xl font-bold text-white md:text-2xl">
            {appName}
          </Link>
        </div>

        {/* Menú para desktop */}
        <div className="hidden flex-1 items-center justify-center md:flex">
          <div className="flex space-x-6">
            {routes.map(({ name, path }) => (
              <Link
                key={path}
                onClick={() => handleNavigation(path)}
                to={path}
                className={`relative px-3 py-2 transition-colors ${
                  isPathActive(path) ? "text-success-text" : "text-primary-bg"
                }`}
              >
                <span className="block max-w-[120px] truncate lg:max-w-[200px]">
                  {name}
                </span>
                <span
                  className={`bg-success-text absolute right-0 -bottom-[16px] left-0 h-1 transition-all duration-300 ${
                    isPathActive(path) ? "w-full" : "w-0"
                  }`}
                ></span>
              </Link>
            ))}
          </div>
        </div>

        <div className="z-20 flex items-center space-x-4">
          {/* Perfil de usuario (solo visible en desktop) */}
          <div
            className="relative hidden cursor-pointer md:block"
            ref={profileMenuRef}
          >
            <button
              onClick={toggleProfileMenu}
              className={`relative flex size-10 cursor-pointer items-center justify-center rounded-full transition-all ${
                isProfileOpen
                  ? "border-2 border-green-300"
                  : isPathActive("/account")
                    ? "text-success-bg border-2"
                    : "border-inactive-primary-text border-2 opacity-80"
              }`}
            >
              <LuCircleUserRound size={24} className="text-white" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 z-50 mt-2 w-48 cursor-pointer rounded-lg border border-gray-300 bg-white shadow-lg">
                <Link
                  to="/account"
                  onClick={() => handleNavigation("/account")}
                  className="block rounded-t-lg px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Configuración
                </Link>
                <hr className="border-t border-gray-300" />
                <button
                  onClick={handleLogout}
                  className="block w-full cursor-pointer rounded-b-lg px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>

          {/* Botón menú hamburguesa (solo visible en móvil/tablet) */}
          <button
            type="button"
            onClick={handleMenuToggle}
            className="hover:text-success-text cursor-pointer text-white transition-colors focus:outline-none md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <LuX size={28} /> : <LuMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          ref={mobileMenuRef}
          className={`bg-secondary-bg fixed top-0 right-0 h-full w-4/5 max-w-sm transform shadow-lg transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Cabecera del menú móvil */}
          <div className="flex items-center justify-between border-b border-gray-700 p-4">
            <div className="text-xl font-bold text-white">{appName}</div>
            <button
              onClick={handleMenuToggle}
              className="hover:text-success-text cursor-pointer text-white transition-colors"
            >
              <LuX size={24} />
            </button>
          </div>

          {/* Contenido del menú móvil */}
          <div className="flex h-[calc(100%-70px)] flex-col px-6 pt-6 pb-6">
            {/* Info de usuario */}
            <div className="mb-6 flex items-center space-x-3 border-b border-gray-700 pb-4">
              <div className="border-inactive-primary-text flex h-12 w-12 items-center justify-center rounded-full border-2">
                <LuCircleUserRound size={30} className="text-white" />
              </div>
              <div className="text-white">
                <Link
                  to="/account"
                  onClick={() => handleNavigation("/account")}
                  className="text-success-text hover:underline"
                >
                  Mi Perfil
                </Link>
              </div>
            </div>

            {/* Navegación */}
            <div className="flex flex-1 flex-col space-y-4">
              {routes.map(({ name, path }) => (
                <Link
                  key={path}
                  onClick={() => handleNavigation(path)}
                  to={path}
                  className={`border-b border-gray-700 px-2 py-3 ${
                    isPathActive(path) ? "text-success-text" : "text-white"
                  }`}
                >
                  {name}
                </Link>
              ))}
            </div>

            {/* Pie del menú */}
            <div className="mt-auto border-t border-gray-700 pt-4">
              <button
                onClick={handleLogout}
                className="w-36 cursor-pointer rounded-lg py-3 pl-5 text-left text-white transition-colors hover:bg-red-400"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
