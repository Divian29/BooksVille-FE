export const BuyAndReadBooks = () => {
  return (
    <div className="container mx-auto px-5 py-9 mt-[3rem] max-w-7xl">
      {/* Main Title */}
      <div className="text-center mx-auto text-4xl md:text-5xl font-bold text-green-500 leading-[59px] max-w-[935px] mb-7 md:mb-12">
        <span className="text-black">
          Access Your Personal Bookstore Online.
          <br />
        </span>
        <span className="text-green-500"> Buy Now</span>
        <span className="text-black">, Read Now!</span>
      </div>

      {/* Description */}
      <div className="text-center mx-auto text-base md:text-lg font-medium text-neutral-800 leading-7 max-w-[824px] mb-7 md:mb-12">
        Embark on a literary journey with our curated collection of books –
        where every page holds a new adventure and every cover whispers a
        captivating story.
      </div>

      {/* Buy and Read buttons */}
      <div className="flex justify-center gap-4 md:gap-8 mb-10 md:mb-16">
        <div
          className="cursor-pointer text-white text-center font-semibold text-base leading-7 transition hover:bg-green-600  bg-green-500 px-4 md:px-10 py-3.5 md:py-3 rounded-xl"
          style={{
            width: "100%",
            maxWidth: "280px",
            height: "56px",
            borderRadius: "10px",
          }}
        >
          Buy Book
        </div>
        <div
          className="cursor-pointer hover:bg-gray-200 transition text-green-500 text-center font-semibold text-base leading-7 border-2 border-green-500 border-solid px-4 md:px-10 py-3.5 md:py-3 rounded-xl"
          style={{
            width: "100%",
            maxWidth: "280px",
            height: "56px",
            borderRadius: "10px",
          }}
        >
          Read Now
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
        <div className="aspect-w-12 aspect-h-11 rounded-xl">
          <img
            loading="lazy"
            src="/src/assets/images/landingPageImages/rectangle-45@2x.png"
            className="w-full h-full rounded-xl"
            alt="Image 1"
          />
        </div>
        <div className="aspect-w-12 aspect-h-11 rounded-xl">
          <img
            loading="lazy"
            src="/src/assets/images/landingPageImages/rectangle-47@2x.png"
            className="w-full h-full rounded-xl"
            alt="Image 2"
          />
        </div>
        <div className="aspect-w-12 aspect-h-11 rounded-xl">
          <img
            loading="lazy"
            src="/src/assets/images/landingPageImages/rectangle-46@2x.png"
            className="w-full h-full rounded-xl"
            alt="Image 3"
          />
        </div>
      </div>

      {/* Secondary Content */}
      <div className="flex flex-col md:flex-row gap-5 items-center my-5 md:mt-16">
        <div className="aspect-w-12 aspect-h-11 md:mt-5 rounded-xl overflow-hidden">
          <img
            loading="lazy"
            src="/src/assets/images/landingPageImages/rectangle-48@2x.png"
            className="object-cover w-full h-full rounded-xl"
            alt="Image 4"
          />
        </div>
        <div className="flex flex-col justify-start ml-2">
          <div
            className="text-4xl md:text-5xl font-bold text-green-500 leading-[72px] mb-5 md:mb-3"
            style={{
              width: "100%",
              maxWidth: "780px",
              fontSize: "clamp(2rem, 5vw, 3.75rem)", // Responsive font size
              fontWeight: 700,
              lineHeight: "1.2",
              letterSpacing: "0em",
              textAlign: "left",
            }}
          >
            <span className="text-black">
              Access Your Personal Bookstore Online.
            </span>
            <br />
            <span className="text-green-500"> Buy Now</span>
            <span className="text-black">, Read Now!</span>
          </div>
          <div className="text-lg md:text-xl font-medium text-neutral-800 leading-7 mb-5 md:mb-12">
            Embark on a literary journey with our curated collection of books –
            where every page holds a new adventure and every cover whispers a
            captivating story.
          </div>
          <div
            className="transition hover:bg-green-600 cursor-pointer text-center text-lg md:text-xl font-semibold text-white bg-green-500 px-4 py-2 rounded-xl"
            style={{
              width: "100%",
              maxWidth: "296px",
              height: "auto",
              borderRadius: "10px",
            }}
          >
            Read Now
          </div>
        </div>
      </div>
    </div>
  );
};
