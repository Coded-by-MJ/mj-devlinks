const Error = ({ error, reset }: { error: any; reset: () => void }) => {
  console.error(error.message);
  return (
    <section className="bg-white p-6 flex flex-col justify-start items-start min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-darkBrown">
        There was an error
      </h1>

      <button
        onClick={reset}
        className="bg-[#633CFF] text-white  rounded-md px-3 py-2 mt-4"
      >
        Retry
      </button>
    </section>
  );
};
export default Error;
