import "./App.css";
import { StatusCard } from "./utils/StatusCard.jsx";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/pages/landing/LandingPage.jsx";
import { Login } from "./components/auth/login.jsx";
import { UserDashboardPage } from "./components/pages/userDashboard/UserDashboardPage.jsx";
import { ForgotPassword } from "./components/auth/forgotPassword.jsx";
import { ResetPassword } from "./components/auth/resetPassword.jsx";
import { SignUp } from "./components/auth/signUp.jsx";
import { AdminDashboard } from "./components/pages/admin/AdminDashboard.jsx";
import { UserCategoryPage } from "./components/pages/userCategory/UserCategoryPage.jsx";
import { PaymentOptions } from "./components/payment/PaymentOptions.jsx";
import { BookDetails } from "./components/pages/BookDetails.jsx";
import { PurchasedBooks } from "./components/pages/userDashboard/PurchasedBooks.jsx";
import { ViewBooks } from "./components/pages/admin/ViewBooks.jsx";
import { Subscriptions } from "./components/pages/userDashboard/Subscriptions.jsx";
import { SavedBooks } from "./components/pages/userDashboard/SavedBooks.jsx";
import { AccountSetting } from "./components/pages/userDashboard/AccountSetting.jsx";
import { Checkout } from "./components/pages/userDashboard/Checkout.jsx";

function App() {
  const [status, setStatus] = useState("");
  const [statusTitle, setStatusTitle] = useState("Congratulations");
  const [statusMessage, setStatusMessage] = useState(
    "Your registration was successful",
  );
  const [statusColor, setStatusColor] = useState("bg-green-600");

  const handleStatus = () => {
    setStatus("slide-in");

    setTimeout(() => {
      setStatus("");
    }, 2500);
  };

  return (
    <div className="w-[100vw] min-h-[100vh]" style={{ overflowX: "hidden" }}>
      <StatusCard
        statusStyle={status}
        statusTitle={statusTitle}
        message={statusMessage}
        statusColor={statusColor}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path={"/login"}
          element={
            <Login
              handleStatus={handleStatus}
              setStatusTitle={setStatusTitle}
              setStatusMessage={setStatusMessage}
              setStatusColor={setStatusColor}
            />
          }
        />

        <Route
          path={"/signup"}
          element={
            <SignUp
              handleStatus={handleStatus}
              setStatusTitle={setStatusTitle}
              setStatusMessage={setStatusMessage}
              setStatusColor={setStatusColor}
            />
          }
        />

        <Route
          path={"/forgot-password"}
          element={
            <ForgotPassword
              handleStatus={handleStatus}
              setStatusTitle={setStatusTitle}
              setStatusMessage={setStatusMessage}
              setStatusColor={setStatusColor}
            />
          }
        />

        <Route
          path={"/reset-password"}
          element={
            <ResetPassword
              handleStatus={handleStatus}
              setStatusTitle={setStatusTitle}
              setStatusMessage={setStatusMessage}
              setStatusColor={setStatusColor}
            />
          }
        />

        <Route
          path={"/admin-dashboard"}
          element={
            <AdminDashboard
              handleStatus={handleStatus}
              setStatusTitle={setStatusTitle}
              setStatusMessage={setStatusMessage}
              setStatusColor={setStatusColor}
            />
          }
        >
          <Route
            path={"/admin-dashboard/view-books"}
            element={
              <ViewBooks
                handleStatus={handleStatus}
                setStatusTitle={setStatusTitle}
                setStatusMessage={setStatusMessage}
                setStatusColor={setStatusColor}
              />
            }
          />
          <Route
            path={"/admin-dashboard/profile"}
            element={
              <AccountSetting
                handleStatus={handleStatus}
                setStatusTitle={setStatusTitle}
                setStatusMessage={setStatusMessage}
                setStatusColor={setStatusColor}
              />
            }
          />
        </Route>

        <Route
          path={"/user-dashboard"}
          element={
            <UserDashboardPage
              handleStatus={handleStatus}
              setStatusTitle={setStatusTitle}
              setStatusMessage={setStatusMessage}
              setStatusColor={setStatusColor}
            />
          }
        >
          <Route
            path={"/user-dashboard/categories"}
            element={
              <UserCategoryPage
                handleStatus={handleStatus}
                setStatusTitle={setStatusTitle}
                setStatusMessage={setStatusMessage}
                setStatusColor={setStatusColor}
              />
            }
          />

          <Route
            path={"/user-dashboard/subscription"}
            element={<Subscriptions />}
          />

          <Route
            path={"/user-dashboard/purchased-books"}
            element={
              <PurchasedBooks
                handleStatus={handleStatus}
                setStatusTitle={setStatusTitle}
                setStatusMessage={setStatusMessage}
                setStatusColor={setStatusColor}
              />
            }
          />

          <Route
            path={"/user-dashboard/saved-books"}
            element={<SavedBooks />}
          />

          <Route
            path={"/user-dashboard/profile"}
            element={
              <AccountSetting
                handleStatus={handleStatus}
                setStatusTitle={setStatusTitle}
                setStatusMessage={setStatusMessage}
                setStatusColor={setStatusColor}
              />
            }
          />

            <Route path={"/user-dashboard/book-details/:id"} element={
                <BookDetails
                    handleStatus={handleStatus}
                    setStatusTitle={setStatusTitle}
                    setStatusMessage={setStatusMessage}
                    setStatusColor={setStatusColor}
                />
            } />

          <Route path={"/user-dashboard/cart"} element={
              <Checkout
                  handleStatus={handleStatus}
                  setStatusTitle={setStatusTitle}
                  setStatusMessage={setStatusMessage}
                  setStatusColor={setStatusColor}
              />
          } />
        </Route>

        <Route path={"/flutterwave-payment"} element={<PaymentOptions />} />

      </Routes>
    </div>
  );
}

export default App;
