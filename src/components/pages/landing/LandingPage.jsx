import {Footer} from "./Footer.jsx";
import {Header} from "./Header.jsx";
import {BuyAndReadBooks} from "./BuyAndReadBooks.jsx";
import {BestSellingAndPopularBooks} from "./BestSellingAndPopularBooks.jsx";

export const LandingPage = () => {

  return (
      <>
        <div className="m-auto">
          <Header/>
          <BuyAndReadBooks/>
          <BestSellingAndPopularBooks/>
          <Footer/>
        </div>
      </>
  )
}