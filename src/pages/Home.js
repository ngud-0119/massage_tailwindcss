import React, { useContext, useEffect } from "react";
import "../css/home.css";
import "@fontsource/open-sans";
import Hero_Section from "../component/hero/hero-section";
import BttomHomeSection from "../component/hero/bottom-home-section";
import MostRecentDiscussion from "../component/sections/most-recent-discussions";
import MostRecentSpaDiscussion from "../component/sections/most-recent-spa-discussions";
import MostRecentMasseuseDiscussion from "../component/sections/most-recent-masseuse-discussions";
import { Context } from "../context/dataContext";
export default function Home() {
  const { setIsSearchPage } = useContext(Context);
  useEffect(() => {

    setIsSearchPage(false)

  }, []);
  return (
    <>
      {/* <Hero_Section /> */}

      <MostRecentDiscussion />
      {/* <MostRecentSpaDiscussion />
      <MostRecentMasseuseDiscussion /> */}

      <BttomHomeSection />
    </>
  );
}
