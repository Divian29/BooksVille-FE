export const DownloadBookModal = ({ onCancel, onContinue }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <span className="flex items-center justify-between gap-5 w-full">
          <div className="text-neutral-800 text-2xl font-bold leading-9 my-auto">
            Download files
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/86e4204a60fdd377f325c81195b1a519581b7bbd4a52935896c8d71c56b2e31b?"
            className="cursor-pointer aspect-square object-contain object-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 overflow-hidden self-stretch shrink-0 max-w-full"
            onClick={onCancel}
          />
        </span>
        <span className="flex flex-col self-center items-center mt-10 md:mt-20 max-w-[105px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed1cfbfb96d1ceacff02d070ae42da5024bd9ae5b2349187bde6cad0ac1a1e5f?"
            className="aspect-square object-contain object-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 overflow-hidden max-w-full"
          />
          <div className="text-gray-900 text-center text-sm leading-5 self-stretch w-full mt-2 md:mt-4">
            Upload file here
          </div>
          <div className="text-gray-900 text-center text-sm leading-5 whitespace-nowrap mt-2 md:mt-4">
            or{" "}
          </div>
          <div className="text-green-600 text-center text-sm font-bold leading-5 capitalize self-stretch w-full mt-2 md:mt-4">
            Browse files
          </div>
        </span>
        <span className="justify-between items-center flex flex-col sm:flex-row gap-5 mt-10 md:mt-20 self-center">
          <div
            onClick={onCancel}
            className="hover:bg-red-600 hover:text-white text-center cursor-pointer text-red-500 text-sm font-medium leading-5 tracking-[2px] uppercase whitespace-nowrap justify-center items-stretch border self-stretch grow px-4 py-3 rounded-md border-solid border-red-600"
          >
            Cancel
          </div>
          <div
            onClick={onContinue}
            className="hover:bg-green-600 hover:text-white text-center cursor-pointer text-green-500 text-sm font-medium leading-5 tracking-[2px] uppercase whitespace-nowrap justify-center items-stretch border self-stretch grow px-4 py-3 rounded-md border-solid border-green-600"
          >
            Continue
          </div>
        </span>
      </div>
    </>
  );
};
