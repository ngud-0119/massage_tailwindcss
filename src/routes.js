import React from "react";

import { isLogin } from "./utils/isLogins";
import Home from "./pages/Home";
import Spa from "./pages/Spa";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmailPage from "./pages/EmailPage";
import ForgotPassword from "./pages/forgot-password";
import ResetPass from "./pages/ResetPass";
import Messeuse from "./pages/Messeuse";
import AboutUs from "./pages/AboutUs";
import Advertisers from "./pages/Advertisers";

import NoMatch from "./pages/404";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./component/layouts";
import SingleSpa from "./component/spa/single-spa";
import GenericThread from "./component/spa/GenericThread";
import SingleSpaPost from "./component/spa/SinglleSpaPost";
import SingleMasseusePost from "./component/spa/SingleMasseusePost";
import SingleMasseuse from "./component/spa/single-masseuse";
import Search from "./component/sections/search";
import TrendingPosts from "./component/sections/TrendingPosts";
import SpaSearch from "./component/sections/SpaSearch";
import MasseuseSearch from "./component/sections/MasseuseSearch";
import DiscussionReviews from "./axiosCalls/discussion-reviews";
import Test from "./pages/Test";
import SpaTreadDetails from "./component/spa/spa-thread";
import MasseuseTreadDetails from "./component/spa/masseuse-thread";
import AccountLayout from "./accounts/component/layout";
import Profile from "./accounts/pages/profile";
import AccountSpa from "./accounts/component/spa";
import EditSpa from "./accounts/pages/edit-spa";
import AddSpa from "./accounts/pages/add-spa";
import Verification from "./pages/verfication";
import MasseuseAccount from "./accounts/component/masseuse";
import AddMasseuse from "./accounts/pages/add-masseuse";
import TermsAndConditions from "./pages/TermsAndCondition";
import EditMasseuse from "./accounts/pages/EditMasseuse";
import PrivacyPolicy from "./pages/PrivacyPolicy";

export default function CreateRoutes() {
  return (
    <Router>
      {/* auth pages */}
      <Routes>
        <Route
          excat
          path="/termsAndConditions"
          element={<TermsAndConditions />}
        />

        <Route
          excat
          path="/privcyAndPolicy"
          element={<PrivacyPolicy />}
        />


        <Route exact path="/home" element={<Navigate to="/" />} />

        <Route excat path="/" element={<Layout childCom={<Home />} />} />

        {/* <Route
          exact
          path="/"
          element={isLogin() ? <Navigate to="/home" /> : <Login />}
        />  */}

        <Route exact path="/login" element={<Login />} />

        <Route
          exact
          path="/verify-email"
          element={isLogin() ? <Navigate to="/" /> : <EmailPage />}
        />
        <Route
          path="/signup"
          element={isLogin() ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/forgot-password"
          element={isLogin() ? <Navigate to="/" /> : <ForgotPassword />}
        />
        <Route
          path="/reset-password"
          element={isLogin() ? <Navigate to="/" /> : <ResetPass />}
        />
        <Route
          path="/verify-code"
          element={isLogin() ? <Navigate to="/" /> : <Verification />}
        />

        {/* End auth pages */}

        {/* without herder */}

        {/* Temp Pages */}

        <Route
          path="/single-spa"
          element={<Layout childCom={<SingleSpa />} />}
        />
        <Route
          path="/single-spa-post"
          element={<Layout childCom={<SingleSpaPost />} />}
        />
        <Route
          path="/single-masseuse-post"
          element={<Layout childCom={<SingleMasseusePost />} />}
        />
        <Route
          path="/single-masseuse"
          element={<Layout childCom={<SingleMasseuse />} />}
        />
        <Route path="/search" element={<Layout childCom={<Search />} />} />
        <Route
          path="/post-trending"
          element={<Layout childCom={<TrendingPosts />} />}
        />
        <Route
          path="/spa/search"
          element={<Layout childCom={<SpaSearch />} />}
        />
        <Route
          path="/masseuse/search"
          element={<Layout childCom={<MasseuseSearch />} />}
        />
        <Route
          path="/discussion-reviews"
          element={<Layout childCom={<DiscussionReviews />} />}
        />
        <Route path="/testing" element={<Layout childCom={<Test />} />} />
        <Route
          path="/spa-thread"
          element={<Layout childCom={<SpaTreadDetails />} />}
        />


        <Route
          path="/generic-thread"
          element={<Layout childCom={<GenericThread />} />}
        />

        <Route
          path="/masseuse-thread"
          element={<Layout childCom={<MasseuseTreadDetails />} />}
        />

        {/* account Details */}
        <Route
          path="account/profile"
          element={<AccountLayout childCom={<Profile />} />}
        />
        <Route
          path="account/spa"
          element={<AccountLayout childCom={<AccountSpa />} />}
        />
        <Route
          path="account/spa/edit"
          element={<AccountLayout childCom={<EditSpa />} />}
        />
        <Route
          path="account/masseuse/edit"
          element={<AccountLayout childCom={<EditMasseuse />} />}
        />
        <Route
          path="account/spa/add"
          element={
            isLogin() ? (
              <AccountLayout childCom={<AddSpa />} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="account/masseuse"
          element={<AccountLayout childCom={<MasseuseAccount />} />}
        />
        <Route
          path="account/masseuse/add"
          element={<AccountLayout childCom={<AddMasseuse />} />}
        />
        <Route
          path="account/masseuse/edit"
          element={<AccountLayout childCom={<AccountSpa />} />}
        />

        {/* Temp Pages */}

        {/* Temp Pages */}

        {/* <Route excat path="/home" element={<Layout childCom={<Home />} />} /> */}

        <Route path="/spa" element={<Layout childCom={<Spa />} />} />
        <Route path="/masseuse" element={<Layout childCom={<Messeuse />} />} />
        <Route
          path="/for-business"
          element={<Layout childCom={<AboutUs />} />}
        />
        <Route
          path="/advertisers"
          element={<Layout childCom={<Advertisers />} />}
        />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}
