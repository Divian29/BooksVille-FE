import star from "../assets/images/Star.png";
import unStar from "../assets/images/unStar.png";
import {useState} from "react";

export const Rate = ({handleChooseRate}) => {
    const [rateNum, setRateNum] = useState(1)

    const handleRate = (rate) => {
        setRateNum(rate);
        handleChooseRate(rate);
    }

    return(
        <div>
            { rateNum === 1 ?
                <Rating1 handleRate={handleRate} /> :
                rateNum === 2 ?
                    <Rating2 handleRate={handleRate} /> :
                    rateNum === 3 ?
                        <Rating3 handleRate={handleRate} /> :
                        rateNum === 4 ?
                            <Rating4 handleRate={handleRate} /> :
                            rateNum === 5 ?
                                <Rating5 handleRate={handleRate} /> : ""
            }
        </div>
    )
}

const Rating1 = ({handleRate}) => {
    return(
        <div className="items-stretch flex gap-2">
            <StarImg starImage={star} handleRate={() => (handleRate(1))} />
            <StarImg starImage={unStar} handleRate={() => (handleRate(2))} />
            <StarImg starImage={unStar} handleRate={() => (handleRate(3))} />
            <StarImg starImage={unStar} handleRate={() => (handleRate(4))} />
            <StarImg starImage={unStar} handleRate={() => (handleRate(5))} />
        </div>
    )
}

const Rating2 = ({handleRate}) => {
    return(
        <div className="items-stretch flex gap-2">
            <StarImg starImage={star} handleRate={() => (handleRate(1))} />
            <StarImg starImage={star} handleRate={() => (handleRate(2))} />
            <StarImg starImage={unStar} handleRate={() => (handleRate(3))} />
            <StarImg starImage={unStar} handleRate={() => (handleRate(4))} />
            <StarImg starImage={unStar} handleRate={() => (handleRate(5))} />
        </div>
    )
}

const Rating3 = ({handleRate}) => {
    return(
        <div className="items-stretch flex gap-2">
            <StarImg starImage={star} handleRate={() => (handleRate(1))} />
            <StarImg starImage={star} handleRate={() => (handleRate(2))} />
            <StarImg starImage={star} handleRate={() => (handleRate(3))} />
            <StarImg starImage={unStar} handleRate={() => (handleRate(4))} />
            <StarImg starImage={unStar} handleRate={() => (handleRate(5))} />
        </div>
    )
}

const Rating4 = ({handleRate}) => {
    return(
        <div className="items-stretch flex gap-2">
            <StarImg starImage={star} handleRate={() => (handleRate(1))} />
            <StarImg starImage={star} handleRate={() => (handleRate(2))} />
            <StarImg starImage={star} handleRate={() => (handleRate(3))} />
            <StarImg starImage={star} handleRate={() => (handleRate(4))} />
            <StarImg starImage={unStar} handleRate={() => (handleRate(5))} />
        </div>
    )
}

const Rating5 = ({handleRate}) => {
    return(
        <div className="items-stretch flex gap-2">
            <StarImg starImage={star} handleRate={() => (handleRate(1))} />
            <StarImg starImage={star} handleRate={() => (handleRate(2))} />
            <StarImg starImage={star} handleRate={() => (handleRate(3))} />
            <StarImg starImage={star} handleRate={() => (handleRate(4))} />
            <StarImg starImage={star} handleRate={() => (handleRate(5))} />
        </div>
    )
}

const StarImg = ({starImage, handleRate}) => {
    return(
        <img
            loading="lazy"
            src={starImage}
            onClick={handleRate}
            className="cursor-pointer aspect-square object-contain object-center w-[18px] fill-green-500 overflow-hidden shrink-0 max-w-full"
        />
    )
}

