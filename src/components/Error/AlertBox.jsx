import ExclamationCircleIcon from "@heroicons/react/24/solid/ExclamationCircleIcon";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";

const AlertBox = ({ type, title, message, onClick }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50">
      <div
        className={`relative p-6 rounded-2xl shadow-xl w-96 text-center transform transition-all scale-95 hover:scale-100 ${
          type === "success"
            ? "bg-white border-t-4 border-green-500"
            : "bg-white border-t-4 border-red-500"
        }`}>
        <div className="absolute top-[-24px] left-1/2 transform -translate-x-1/2">
          {type === "success" ? (
            <CheckCircleIcon className="w-14 h-14 text-green-500 bg-white rounded-full p-2 shadow-md" />
          ) : (
            <ExclamationCircleIcon className="w-14 h-14 text-red-500 bg-white rounded-full p-2 shadow-md" />
          )}
        </div>

        <h2 className="text-lg font-bold text-gray-800 mt-10">{title}</h2>
        <p className="text-sm text-gray-600 mt-2">{message}</p>

        <button
          className={`mt-5 w-full py-3 rounded-xl font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            type === "success"
              ? "bg-green-500 hover:bg-green-600 text-white focus:ring-green-400"
              : "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400"
          }`}
          onClick={onClick}>
          {type === "success" ? "CONTINUE" : "GO BACK"}
        </button>
      </div>
    </div>
  );
};

export default AlertBox;
