import {Link} from "react-router-dom";

export const PasswordResetSuccessCard = ({email}) => {

    return (
        <div className="w-fit absolute mx-auto mt-[15vh] z-[100] bg-white p-[2rem] grid text-center gap-[2rem] rounded-[0.75rem]">
            <header className="header">
                <h2 className="title">Successful Password reset!</h2>
            </header>
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/19c4704662bf4298512434cd2f9ae99ce475faee0af7147f1a0009aacffa11fa?apiKey=ecb6ce71cdf4467d9335c2f7dc302a16&"
                className="aspect-square object-contain object-center w-fit mx-auto overflow-hidden max-w-full"
                alt="Password reset success"
            />
            <div className="email-info">
                <span className="label">You will get an email confirmation at {" "}</span>
                <span className="email">{email}</span>
            </div>

            <Link to={"/login"} className="transition hover:bg-green-600 return-button bg-[#27AE60] p-[1rem] rounded-[0.75rem] text-white w-[30.125rem]">
                Return to Login
            </Link>
        </div>
    );
}