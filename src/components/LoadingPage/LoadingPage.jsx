export const LoadingPage = ({ message = 'Loading...' }) => {
  return (
    <div className="animate-pulse flex flex-col items-center justify-center min-h-[50vh]">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-amber-400 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-amber-500 rounded-full animate-bounce delay-100"></div>
        <div className="w-4 h-4 bg-amber-600 rounded-full animate-bounce delay-200"></div>
      </div>
      <p className="mt-4 text-amber-500 font-bold">{message}</p>
    </div>
  );
};
