import { Link } from "react-router-dom";
import { appName } from "../../../shared/constants";
import { useNavBarNoAuth } from "../hooks/useNavBarNoAuth";

export const NavBarAuth = () => {
  const {
    isMenuOpen,
    profileMenuRef,
    isRootOnView,
    hiddenRoutes,
    routes,
    handleMenuToggle,
    isActive,
    setIsMenuOpen,
  } = useNavBarNoAuth();

  return (
    <nav className="bg-secondary-bg relative w-full py-4 font-semibold shadow">
      <div className="mx-4 flex items-center justify-between sm:mx-6 lg:mx-12 xl:mx-20">
        {/* Logo */}
        <Link
          to={"/"}
          className="text-text-tertiary text-xl font-bold md:text-2xl"
          onClick={() => setIsMenuOpen(false)}
        >
          {appName}
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={handleMenuToggle}
          className="text-text-tertiary hover:text-text-secondary md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`bg-secondary-bg absolute top-full right-0 left-0 z-20 p-4 shadow-lg transition-all md:static md:block md:w-auto md:p-0 md:shadow-none ${
            isMenuOpen ? "block" : "hidden"
          }`}
          ref={profileMenuRef}
        >
          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-6">
            {!hiddenRoutes.includes(location.pathname) &&
              routes.map(({ name, path }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`group relative block py-2 text-center transition-colors md:py-0 ${
                    isRootOnView && path === "/auth/register"
                      ? "text-text-tertiary hover:bg-action-start rounded-lg"
                      : ""
                  } ${isActive(path) ? "text-text-secondary" : "text-text-tertiary"}`}
                >
                  <span className="block truncate px-2 py-1">{name}</span>
                  <span
                    className={`bg-text-secondary absolute right-0 -bottom-[16px] left-0 h-[3px] transition-all duration-300 ${
                      isActive(path) ? "w-full" : "w-0"
                    }`}
                  ></span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
