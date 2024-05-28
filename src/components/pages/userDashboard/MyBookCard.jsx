export const MyBookCard = ({image, name, author}) => {
    return (
        <div className="flex flex-col items-stretch w-3/12 max-md:w-full max-md:ml-0">
            <div className="justify-center items-stretch flex grow flex-col max-md:mt-6">
                <img
                    loading="lazy"
                    src={image}
                    className="aspect-[0.66] object-contain object-center w-full overflow-hidden"
                />
                <div className="text-black text-2xl font-semibold leading-7 max-w-[329px] mt-3.5 max-md:mr-0.5">
                    {name}
                </div>
                <div className="text-neutral-600 text-2xl leading-7 max-w-[329px] mt-3 max-md:mr-0.5">
                    {author}
                </div>
            </div>
        </div>
    )
}