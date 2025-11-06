import { useState } from "react";
import { IoPricetags } from "react-icons/io5";
import BlogPost from "../components/BlogPost";

function Home() {
  const [activeButton, setActiveButton] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const buttonContent = [
    { label: "All" },
    { label: "Technology" },
    { label: "Finance" },
    { label: "Health" },
    { label: "Crypto" },
  ];

  return (
    <section className="min-h-screen bg-background/60 flex flex-col items-center pt-20 text-center px-6 relative pb-20">
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

      <div className="hidden md:flex lg:flex mt-10 gap-7">
        {buttonContent.map((btn) => {
          return (
            <button
              onClick={() => setActiveButton(btn.label)}
              key={btn.label}
              className={`px-3 py-2 text-gray-700 rounded-lg cursor-pointer ${
                activeButton === btn.label
                  ? "bg-primary text-white hover:bg-primary/80 transition-colors duration-300"
                  : ""
              }`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      <BlogPost activeCategory={activeButton} />
      <div className="mt-15">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4">
          Subscribe to our newsletter
        </h1>
        <p className="text-gray-500 mb-5">
          Never miss the latest blogs. Subscribe to get the latest blog, new
          tech, and exclusive news.
        </p>
        <form
          className="flex w-full mx-auto border border-gray-300 bg-white rounded-lg overflow-hidden mt-5 max-w-xl p-1"
          onClick={handleSubmit}
          action=""
        >
          <input
            className="w-full outline-none pl-4 text-gray-700"
            type="text"
            placeholder="Email*"
          />
          <button
            className="bg-primary text-white font-medium py-2 px-6 rounded-md 
               hover:bg-primary/80 transition-colors shrink-0 cursor-pointer"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export default Home;
