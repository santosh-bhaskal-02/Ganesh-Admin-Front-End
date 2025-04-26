const SkeletonCustomForm = () => (
  <div className="p-5 bg-gray-100 rounded-xl flex justify-between items-center animate-pulse">
    <div className="flex items-center gap-5">
      <div className="w-20 h-20 bg-gray-300 rounded-xl" />
      <div className="space-y-2">
        <div className="w-48 h-4 bg-gray-300 rounded" />
        <div className="w-32 h-3 bg-gray-300 rounded" />
        <div className="w-40 h-3 bg-gray-300 rounded" />
        <div className="w-36 h-3 bg-gray-300 rounded" />
      </div>
    </div>
    <div className="w-20 h-8 bg-gray-300 rounded-md" />
  </div>
);

export default SkeletonCustomForm;
