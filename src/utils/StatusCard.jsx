
export const StatusCard = ({ message, statusTitle, statusStyle, statusColor }) => {

    return (
        <div className={`fixed ${statusStyle} top-4 left-[100vw] z-[2000]`}>
            <div className="items-stretch bg-green-100 min-w-[33.6875rem] flex gap-3 p-4 rounded-lg max-md:flex-wrap">
                <header className={`${statusColor} flex w-[5px] shrink-0 h-10 flex-col rounded-sm`} />
                <div className="items-stretch flex grow basis-[0%] flex-col max-md:max-w-full">
                    <div className="text-neutral-800 text-sm font-bold leading-5 max-md:max-w-full">
                        { statusTitle }
                    </div>

                    <div className="text-neutral-800 text-sm leading-5 whitespace-nowrap max-md:max-w-full">
                        { message }
                    </div>
                </div>
            </div>
        </div>
    );
}