export const CenterItemSkeleton = () => {
  return (
    <div className="animate-pulse w-full">
      <div className="mb-3 h-19 border border-gray-300 p-4">
        <div className="flex-1 min-w-0">
          <div className="h-6 w-6 rounded-lg bg-gray-300 mb-1"></div>
          <div className="h-5 w-70 rounded-lg bg-gray-300 mt-1"></div>
        </div>
      </div>
    </div>
  )
}
