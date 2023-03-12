import React from "react";
import styled from "styled-components";
import Button from "../../button/Button";

const HomeBannerStyled = styled.div`
  height: 520px;
  width: 100%;
  background-image: ${(props) => props.theme.bg_button};
  margin-top: 45px;
  .banner {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    .banner-content {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 25px;
      width: 420px;
      h1 {
        font-size: 50px;
        font-weight: 700;
        color: white;
      }
      span {
        color: white;
        font-size: 16px;
        line-height: 28px;
      }
    }
  }
`;
const HomeBanner = () => {
  return (
    <HomeBannerStyled>
      <div className="banner">
        <div className="banner-content">
          <h1>Monkey Blogging</h1>
          <span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui atque
            labore inventore soluta dolorem nesciunt quibusdam natus placeat
            voluptas aspernatur!
          </span>
          <Button kind="primary" to={"/sign-up"}>
            Get Started
          </Button>
        </div>
        <div className="banner-image">
          <img src="img-banner.png" alt="banner" />
        </div>
      </div>
    </HomeBannerStyled>
  );
};

export default HomeBanner;
