// Indicador de tamaño de pantalla
export const TailwindIndicator = () => {
  return (
    <div className="fixed bottom-1 left-1 z-50 flex size-10 items-center justify-center rounded-full bg-white p-4 font-bold text-md text-black">
        {/* Se muestra solo en pantallas extra pequeñas (xs) */}
        <div className="block sm:hidden">xs</div>
        {/* Se muestra solo en pantallas pequeñas (sm) */}
        <div className="hidden sm:block md:hidden">sm</div>
        {/* Se muestra solo en pantallas medianas (md) */}
        <div className="hidden md:block lg:hidden">md</div>
        {/* Se muestra solo en pantallas grandes (lg) */}
        <div className="hidden lg:block xl:hidden">lg</div>
        {/* Se muestra solo en pantallas extra grandes (xl) */}
        <div className="hidden xl:block 2xl:hidden">xl</div>
        {/* Se muestra solo en pantallas 2xl */}
        <div className="hidden 2xl:block">2xl</div>
    </div>
  )
}