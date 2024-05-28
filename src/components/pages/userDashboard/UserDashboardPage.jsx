import { UserDashboardHeader } from "./UserDashboardHeader.jsx";
import { MyBooks } from "./MyBooks.jsx";
import { Route, Routes } from "react-router-dom";
import { UserCategoryPage } from "../userCategory/UserCategoryPage.jsx";
import { Subscriptions } from "./Subscriptions.jsx";
import { PurchasedBooks } from "./PurchasedBooks.jsx";
import { SavedBooks } from "./SavedBooks.jsx";
import { AccountSetting } from "./AccountSetting.jsx";
import { Checkout } from "./Checkout.jsx";
import {useEffect, useState} from "react";
import axios from "../../../api/axios.jsx";
import {BookDetails} from "../BookDetails.jsx";
import {HeaderSearch} from "./HeaderSearch.jsx";

export const UserDashboardPage = ({handleStatus, setStatusTitle, setStatusMessage, setStatusColor}) => {

  const [dependency, setDependency] = useState(false)
  const [generalSearch, setGeneralSearch] = useState(false)
  const [search, setSearch] = useState('')
  const [bestSelling, setBestSelling] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("/user", {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`
        }
      }).then(
          response => {
            setUser(response.data.responseData)
          }
      )
    }

    fetchData()

  }, [dependency]);

  useEffect(() => {
    const loadBestSelling = async () => {
      const response = await axios.get("/transaction/best-seller");

      setBestSelling(response.data.responseData.slice(0, 4))
    }

    loadBestSelling()
  }, []);

  const [user, setUser] = useState();

  const setDep = () => {
    setDependency(!dependency);
  }

  return (
    <>
      <div className="m-auto">
        <div
          className="fixed w-[100vw] bg-white"
          style={{
            boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.04)",
            zIndex: "100",
          }}
        >
          <UserDashboardHeader
              handleStatus={handleStatus}
              setStatusTitle={setStatusTitle}
              setStatusMessage={setStatusMessage}
              setStatusColor={setStatusColor}
              userData={user}
              setGeneralSearch={setGeneralSearch}
              setQuery={setSearch}
          />
        </div>

        { generalSearch &&
            <div className="pt-[10rem]">
              <HeaderSearch search={search} />
            </div>
        }

        { !generalSearch &&
            <div className="pt-[3rem]">
              <Routes>
                <Route path={"/"} element={<MyBooks recommended={bestSelling} />} />

                <Route path={"/categories"} element={
                  <UserCategoryPage
                      handleStatus={handleStatus}
                      setStatusTitle={setStatusTitle}
                      setStatusMessage={setStatusMessage}
                      setStatusColor={setStatusColor}
                  />
                }
                />

                <Route path={"/subscription"} element={
                  <Subscriptions
                      handleStatus={handleStatus}
                      setStatusTitle={setStatusTitle}
                      setStatusMessage={setStatusMessage}
                      setStatusColor={setStatusColor}
                  />
                } />

                <Route path={"/purchased-books"} element={<PurchasedBooks
                    handleStatus={handleStatus}
                    setStatusTitle={setStatusTitle}
                    setStatusMessage={setStatusMessage}
                    setStatusColor={setStatusColor}/>} />

                <Route path={"/saved-books"} element={
                  <SavedBooks
                      handleStatus={handleStatus}
                      setStatusTitle={setStatusTitle}
                      setStatusMessage={setStatusMessage}
                      setStatusColor={setStatusColor}
                  />
                }
                />

                <Route
                    path={"/profile"}
                    element={
                      <AccountSetting
                          handleStatus={handleStatus}
                          setStatusTitle={setStatusTitle}
                          setStatusMessage={setStatusMessage}
                          setStatusColor={setStatusColor}
                          userData={user}
                          setDep={setDep}
                          user={"user"}
                      />
                    }
                />

                <Route path={"/book-details/:id"} element={
                  <BookDetails
                      handleStatus={handleStatus}
                      setStatusTitle={setStatusTitle}
                      setStatusMessage={setStatusMessage}
                      setStatusColor={setStatusColor}
                  />
                } />

                <Route
                    path={"/cart"} element={
                  <Checkout
                      recommended={bestSelling}
                      handleStatus={handleStatus}
                      setStatusTitle={setStatusTitle}
                      setStatusMessage={setStatusMessage}
                      setStatusColor={setStatusColor}
                  />
                }
                />
              </Routes>
            </div>
        }
      </div>
    </>
  );
};
