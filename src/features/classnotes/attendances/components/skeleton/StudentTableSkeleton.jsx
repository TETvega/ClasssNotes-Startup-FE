import { generateId } from "../../../../../shared/utils";

export const StudentTableSkeleton = () => {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="mb-4 flex animate-pulse justify-between">
        <div>
          <h3 className="bg-disabled-text-bg mb-1 h-7 w-44 rounded-lg font-extrabold"></h3>
          <p className="bg-disabled-bg h-5 w-60 rounded-lg"></p>
        </div>
        <div>
          <div className="bg-disabled-text-bg h-10 w-80 rounded-lg"></div>
        </div>
      </div>
      <div className="text-text-active-primary border-disabled-text flex h-[50px] max-w-[1018px] animate-pulse flex-row items-center rounded-t-lg border text-lg font-bold">
        <div className="px-2 sm:min-w-[240px] md:min-w-[160px] lg:min-w-[240px] xl:min-w-[300px]">
          <div className="bg-disabled-text-bg h-6 rounded-lg sm:w-20 md:w-24 lg:w-52 xl:w-52"></div>
        </div>
        <div className="hidden px-2 md:table-cell md:min-w-[230px] lg:min-w-[260px] xl:min-w-[300px]">
          <div className="bg-disabled-text-bg h-6 w-15 rounded-lg"></div>
        </div>
        <div className="w-full px-2 sm:min-w-[130px] md:min-w-[70px] lg:min-w-[150px] xl:min-w-[150px]">
          <div className="bg-disabled-text-bg h-6 w-15 rounded-lg"></div>
        </div>
        <p className="w-full px-2 sm:min-w-[150px] md:min-w-[150px] lg:min-w-[250px] xl:min-w-[100px]"></p>
      </div>
      <table className="w-full max-w-[1018px] animate-pulse text-left text-sm">
        <tbody>
          {[...Array(15)].map(() => (
            <tr
              key={generateId()}
              className="border-disabled-text h-[50px] border"
            >
              <td className="px-2 py-2 sm:min-w-[240px] md:min-w-[160px] lg:min-w-[240px] xl:min-w-[300px]">
                <div className="bg-disabled-bg h-5 w-32 rounded-lg"></div>
              </td>
              <td className="hidden px-2 py-2 md:table-cell md:min-w-[230px] lg:min-w-[260px] xl:min-w-[300px]">
                <div className="bg-disabled-bg h-5 w-32 rounded-lg"></div>
              </td>
              <td className="px-2 py-2 sm:min-w-[130px] md:min-w-[70px] lg:min-w-[150px] xl:min-w-[150px]">
                <div className="bg-disabled-bg h-5 w-32 rounded-lg"></div>
              </td>
              <td className="w-full px-2 py-2 text-center align-middle">
                <div className="mx-auto w-full max-w-[120px]">
                  <div className="bg-disabled-text h-8 w-full rounded-lg"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
