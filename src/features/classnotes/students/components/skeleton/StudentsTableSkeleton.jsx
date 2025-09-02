export const StudentTableSkeleton = ({ pageSize = 10 }) => {
  return (
    <>
      <div className="bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 z-10 bg-gray-50">
            <tr>
              <th scope="col" className="w-12 px-6 py-3 text-left">
                <div className="h-4 w-4 animate-pulse rounded border-gray-300 bg-gray-200"></div>
              </th>
              <th className="w-[40%] px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                <div className="h-4 w-24 animate-pulse bg-gray-200"></div>
              </th>
              <th className="w-[40%] px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                <div className="h-4 w-32 animate-pulse bg-gray-200"></div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                <div className="h-4 w-28 animate-pulse bg-gray-200"></div>
              </th>
              <th className="w-12 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[...Array(pageSize)].map((_, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 w-4 animate-pulse rounded border-gray-300 bg-gray-200"></div>
                </td>
                <td className="pointer-events-none px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-32 animate-pulse bg-gray-200"></div>
                  </div>
                </td>
                <td className="pointer-events-none px-6 py-4 whitespace-nowrap">
                  <div className="h-4 w-40 animate-pulse bg-gray-200"></div>
                </td>
                <td className="pointer-events-none px-6 py-4 whitespace-nowrap">
                  <div className="inline-flex h-6 w-24 animate-pulse items-center rounded-full bg-gray-200"></div>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="relative">
                    <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
