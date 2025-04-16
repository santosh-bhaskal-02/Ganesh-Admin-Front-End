import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-tr from-indigo-100 via-white to-purple-100 px-6 py-24 sm:py-32">
      <div className="text-center bg-white/70 backdrop-blur-lg border border-white/40 shadow-2xl rounded-2xl p-10 max-w-xl w-full">
        <p className="text-lg font-bold text-indigo-600 animate-pulse">404</p>

        <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
          Oops! Page Not Found
        </h1>

        <p className="mt-6 text-base sm:text-lg text-gray-600">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/login"
            className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-300">
            Sign In
          </Link>

          <Link
            to="/explore"
            className="text-sm font-medium text-indigo-800 hover:underline flex items-center gap-1 transition">
            Go back home <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ErrorPage;
