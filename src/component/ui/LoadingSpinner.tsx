function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen gap-1">
      <p>Loading...</p>
      <div className="animate-pulse h-3 w-3 bg-gray-700 rounded-full"></div>
      <div className="animate-pulse h-3 w-3 bg-gray-700 rounded-full"></div>
      <div className="animate-pulse h-3 w-3 bg-gray-700 rounded-full"></div>

    </div>
  );
}

export default LoadingSpinner;
