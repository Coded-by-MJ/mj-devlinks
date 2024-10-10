import { Link } from "@tanstack/react-router";

const NotFoundPage = () => {
  return (
    <section className=" bg-white gap-3 w-full flex flex-col justify-center items-center min-h-screen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-24 my-6 stroke-[#633CFF]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>
      <h1 className="text-6xl font-bold mb-4 text-[#633CFF]">404</h1>
      <p className="text-xl mb-5 text-[#633CFF]">This page does not exist</p>
      <Link
        to="/"
        className="bg-[#633CFF] text-white  rounded-md px-3 py-2 mt-4"
      >
        Go Back
      </Link>
    </section>
  );
};

export default NotFoundPage;
