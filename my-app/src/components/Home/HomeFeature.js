import styled from "styled-components";
import HomeFeatureHeader from "./HomeFeatureHeader";
import HomeFeatureItem from "./HomeFeatureItem";

const HomeFeatureStyled = styled.div`
  margin-top: 50px;
`;
const HomeFeature = () => {
  return (
    <HomeFeatureStyled>
      <HomeFeatureHeader>Feature</HomeFeatureHeader>
      <HomeFeatureItem></HomeFeatureItem>
    </HomeFeatureStyled>
  );
};

export default HomeFeature;
