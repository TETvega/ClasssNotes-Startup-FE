export const ViewDataFiles = ({ emptyFields, fileData }) => {
  return (
    <div className="mt-4 rounded-md border bg-gray-100 p-4">
      <h3 className="mb-2 text-lg font-semibold">Vista previa del archivo</h3>

      <div className="mb-4 rounded bg-yellow-50 p-3 text-sm text-yellow-800">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-medium">Total registros:</p>
            <p>{emptyFields.totalRows}</p>
          </div>
          <div>
            <p className="font-medium">Nombres vacíos:</p>
            <p>{emptyFields.emptyFirstName}</p>
          </div>
          <div>
            <p className="font-medium">Apellidos vacíos:</p>
            <p>{emptyFields.emptyLastName}</p>
          </div>
          <div>
            <p className="font-medium">Emails vacíos:</p>
            <p>{emptyFields.emptyEmails}</p>
          </div>
        </div>
      </div>

      {/* Vista en tabla para pantallas md en adelante */}
      <div className="hidden max-h-96 overflow-auto md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Apellido
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {fileData.map((row, index) => (
              <tr
                key={index}
                className={
                  !row.firstName || !row.lastName || !row.email
                    ? "bg-red-50"
                    : ""
                }
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={
                      !row.firstName
                        ? "font-bold text-red-500"
                        : "text-gray-900"
                    }
                  >
                    {row.firstName || "(vacío)"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={
                      !row.lastName ? "text-red-500 italic" : "text-gray-900"
                    }
                  >
                    {row.lastName || "(vacío)"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={
                      !row.email ? "text-red-500 italic" : "text-gray-900"
                    }
                  >
                    {row.email || "(vacío)"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista tipo tarjeta para pantallas pequeñas */}
      <div className="space-y-4 md:hidden">
        {fileData.map((row, index) => (
          <div
            key={index}
            className={`rounded-md border p-4 shadow-sm ${!row.firstName || !row.lastName || !row.email ? "bg-red-50" : "bg-white"}`}
          >
            <div className="mb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Nombre
              </p>
              <p
                className={
                  !row.firstName ? "font-bold text-red-500" : "text-gray-900"
                }
              >
                {row.firstName || "(vacío)"}
              </p>
            </div>
            <div className="mb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Apellido
              </p>
              <p
                className={
                  !row.lastName ? "text-red-500 italic" : "text-gray-900"
                }
              >
                {row.lastName || "(vacío)"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Email
              </p>
              <p
                className={!row.email ? "text-red-500 italic" : "text-gray-900"}
              >
                {row.email || "(vacío)"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
