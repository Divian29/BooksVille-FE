import { Link } from "react-router-dom";

export const Header = () => {
  return (
      <div className="container mx-auto px-1 py-9">
        <div className="flex justify-between items-center flex-wrap">
          <div className="logo-container flex items-center">
            <img
                loading="lazy"
                src="/src/assets/images/landingPageImages/image-1@2x.png"
                className="aspect-square object-contain object-center w-[41px] mr-4 overflow-hidden shrink-0 max-w-full"
                alt="Logo"
            />
            <div className="text-green-500 text-xl font-semibold leading-7 self-center grow whitespace-nowrap m1-auto">
              <span className="text-black">Books</span>
              <span className="text-green-500">Ville</span>
            </div>
          </div>
          <div className="items-stretch bg-white flex-grow flex-shrink-0 flex flex-col justify-center px-4 py-2">
            <div className="relative border border-[color:var(--Gray-2,#4F4F4F)] rounded-lg">
              <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/691300b616dcd4f3e9fde758ec214a4b93dc83db358279b76ea7d765eaa2fb2e?"
                  className="aspect-square absolute object-contain top-[0.9rem] left-4 object-center justify-center items-center overflow-hidden shrink-0 max-w-full"
                  alt="Magnifying Glass"
              />
              <input
                  type="search"
                  name="search"
                  placeholder="Search by Author or Title or Series"
                  className="text-zinc-400 pl-[3rem] pr-[1rem] focus:outline-none rounded-lg border-solid py-3 w-full text-sm tracking-normal self-stretch grow whitespace-nowrap"
              />
            </div>
          </div>
          {/* Navigation links */}
          <div className="navigation-links flex items-center gap-5 mr-4 md:mr-20">
            <div className="cursor-pointer text-green-500 text-base font-medium leading-7 grow whitespace-nowrap">
              Home
            </div>
            <div className="cursor-pointer text-black text-base font-medium leading-7">
              Categories
            </div>
            <div className="cursor-pointer text-black text-base font-medium leading-7">
              Cart
            </div>
            <div className="cursor-pointer text-black text-base font-medium leading-7 grow whitespace-nowrap">
              Services
            </div>
          </div>
          {/* Buttons */}
          <div className="buttons flex items-center gap-5 flex-wrap">
            <div className="flex gap-5">
              <Link
                  to={"/signup"}
                  className="hover:bg-gray-200 transition cursor-pointer text-green-500 text-base font-semibold leading-7 whitespace-nowrap justify-center items-stretch border grow px-10 py-[1.1rem] rounded-xl border-solid border-green-500"
              >
                Sign Up
              </Link>
              <Link
                  to="/login"
                  className="transition hover:bg-green-600 cursor-pointer text-white text-base font-semibold leading-7 whitespace-nowrap justify-center items-stretch bg-green-500 grow px-12 py-[1.2rem] rounded-xl"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};
