import star from "../assets/images/Star.png";
import unStar from "../assets/images/unStar.png";

export const Rating = ({rate}) => {
    return(
        <div className="items-stretch flex gap-2 mt-6">
            { rate === 1 ?
                <Rating1/> :
                rate === 2 ?
                    <Rating2/> :
                    rate === 3 ?
                        <Rating3/> :
                        rate === 4 ?
                            <Rating4/> :
                            rate === 5 ?
                                <Rating5/> : ""
            }
        </div>
    )
}

const Rating1 = () => {
    return(
        <div className="items-stretch flex gap-2 mt-6">
            <StarImg starImage={star} />
            <StarImg starImage={unStar} />
            <StarImg starImage={unStar} />
            <StarImg starImage={unStar} />
            <StarImg starImage={unStar} />
        </div>
    )
}

const Rating2 = () => {
    return(
        <div className="items-stretch flex gap-2 mt-6">
            <StarImg starImage={star} />
            <StarImg starImage={star} />
            <StarImg starImage={unStar} />
            <StarImg starImage={unStar} />
            <StarImg starImage={unStar} />
        </div>
    )
}

const Rating3 = () => {
    return(
        <div className="items-stretch flex gap-2 mt-6">
            <StarImg starImage={star} />
            <StarImg starImage={star} />
            <StarImg starImage={star} />
            <StarImg starImage={unStar} />
            <StarImg starImage={unStar} />
        </div>
    )
}

const Rating4 = () => {
    return(
        <div className="items-stretch flex gap-2 mt-6">
            <StarImg starImage={star} />
            <StarImg starImage={star} />
            <StarImg starImage={star} />
            <StarImg starImage={star} />
            <StarImg starImage={unStar} />
        </div>
    )
}

const Rating5 = () => {
    return(
        <div className="items-stretch flex gap-2 mt-6">
            <StarImg starImage={star} />
            <StarImg starImage={star} />
            <StarImg starImage={star} />
            <StarImg starImage={star} />
            <StarImg starImage={star} />
        </div>
    )
}

const StarImg = ({starImage}) => {
    return(
        <img
            loading="lazy"
            src={starImage}
            className="aspect-square object-contain object-center w-[18px] fill-green-500 overflow-hidden shrink-0 max-w-full"
        />
    )
}

