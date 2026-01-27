import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center  px-4">
      <div className="text-center border-2 border-blue-800 bg-gray-100 p-14 rounded-xl">
        <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-700">
          Page Not Found
        </p>
        <p className="mt-2 text-gray-500">
          Sorry, the page you are looking for doesn’t exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
