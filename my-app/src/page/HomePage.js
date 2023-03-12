import React from "react";
import styled from "styled-components";
import HeaderHomePage from "../components/Home/header/HeaderHomePage";
import HomeBanner from "../components/Home/HomeBanner";
import HomeFeature from "../components/Home/HomeFeature";
import HomeNewest from "../components/Home/HomeNewest";
import HomePostOther from "../components/Home/HomePostOther";

const HeaderStyle = styled.div``;
const HomePage = () => {
  document.title = "Home";
  // const handleSignOut = () => {
  //   signOut(auth);
  // };
  return (
    <HeaderStyle className="max-w-[1180px] flex flex-col justify-center align-middle mx-auto">
      <HeaderHomePage></HeaderHomePage>
      <HomeBanner></HomeBanner>
      <HomeFeature></HomeFeature>
      <HomeNewest></HomeNewest>

      <HomePostOther></HomePostOther>
    </HeaderStyle>
  );
};

export default HomePage;
