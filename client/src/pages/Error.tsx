import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

function Error() {
  return (
    <>
      <Navbar />

      <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
        <img
          src="/404.png"
          className="mt-23 w-72 md:w-2/5 object-contain mb-6 rounded"
          alt="Page not found"
        />

        <h2 className="text-4xl md:text-5xl font-bold mb-3">Page Not Found</h2>

        <p className=" max-w-md mb-6">
          Oops! The page you're looking for doesn’t exist or has been moved.
        </p>

        <div className="flex gap-4">
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}

export default Error;
