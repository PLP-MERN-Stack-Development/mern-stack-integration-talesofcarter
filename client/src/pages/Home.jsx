import { IoPricetags } from "react-icons/io5";

function Home() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="min-h-screen bg-background/60 flex flex-col items-center pt-20 text-center px-6 relative">
      <div className="inline-flex items-center gap-2 border border-primary px-3 py-1 rounded-full text-primary mb-4">
        <IoPricetags className="" />
        <p className="">Trending Now</p>
      </div>
      <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight  my-6">
        Discover Daily <span className="text-primary">Insights</span>
      </h1>
      <p className="max-w-2xl text-lg text-gray-500">
        It's time to build your legacy. Our powerful, distraction-free editor
        and built-in community tools make publishing high-quality content easier
        than ever.
      </p>

      <form
        className="flex w-full mx-auto border border-gray-300 bg-white rounded-lg overflow-hidden mt-5 max-w-xl p-1"
        onClick={handleSubmit}
        action=""
      >
        <input
          className="w-full outline-none pl-4 text-gray-700"
          type="text"
          placeholder="Search for blogs"
        />
        <button
          className="bg-primary text-white font-medium py-2 px-6 rounded-md 
               hover:bg-primary/80 transition-colors shrink-0 cursor-pointer"
          type="submit"
        >
          Search
        </button>
      </form>
    </section>
  );
}

export default Home;
