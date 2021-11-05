import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import futsal from '../image/futsal.jpg'
import running from '../image/running.jpeg'
import basketball from '../image/basketball.jpeg'
import comming from '../image/comming.jpeg'

const Entrance = () => {
  return (
    <>
      <SportsMain>
        <SportsSub>
          <Link to="/futsal" style={{ textDecoration: 'none' }}>
            <Footsal>
              <img src={futsal} alt="futsal" className="entrance_img" />
              <div className="entrance_Text">
                <div className="entrance_mainText">5 on 5 의 짧지만 강렬함</div>
                <div className="entrance_subText">FUTSAL</div>
              </div>
            </Footsal>
          </Link>
        </SportsSub>
        <SportsSub>
          <Running>
            <img src={running} alt="running" className="entrance_img" />
            <div className="entrance_mainText">함께 달릴 준비가 되었나요?</div>
            <div className="entrance_subText">COMMING SOON</div>
          </Running>
        </SportsSub>
        <SportsSub>
          <BasketBall>
            <img src={basketball} alt="basketball" className="entrance_img" />
            <div className="entrance_mainText">왼손은 거들뿐</div>
            <div className="entrance_subText">COMMING SOON</div>
          </BasketBall>
        </SportsSub>
        <SportsSub>
          <CommingSoon>
            <img src={comming} alt="comming" className="entrance_img" />
            <div className="entrance_mainText">계속 업데이트 됩니다</div>
            <div className="entrance_subText">COMMING SOON</div>
          </CommingSoon>
        </SportsSub>
      </SportsMain>
    </>
  )
}

const SportsMain = styled.section`
  height: 100%;
  display: flex;
  background-color: none;
`

const SportsSub = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  background-size: cover;
  :hover {
    .entrance_mainText {
      color: white;
    }
    .entrance_subText {
      color: white;
    }
    .entrance_img {
      cursor: pointer;
      opacity: 1;
      filter: brightness(80%);
      transition: 0.3s ease-out;
    }
  }
`

const Footsal = styled.div`
  position: relative;
  .entrance_mainText {
    top: 45%;
    left: 26%;
    font-size: 1.3vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_subText {
    top: 50%;
    left: 37%;
    font-size: 2vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_img {
    opacity: 0.3;
    width: 25vw;
    height: 100vh;
    background-size: cover;
    vertical-align: middle;
  }
`

const Running = styled.div`
  position: relative;
  .entrance_Text {
  }
  .entrance_mainText {
    top: 45%;
    left: 22%;
    font-size: 1.3vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_subText {
    top: 50%;
    left: 19%;
    font-size: 2vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_img {
    opacity: 0.3;
    width: 25vw;
    height: 100vh;
    background-size: cover;
    vertical-align: middle;
  }
`

const BasketBall = styled.div`
  position: relative;
  .entrance_Text {
  }
  .entrance_mainText {
    top: 45%;
    left: 36%;
    font-size: 1.3vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_subText {
    top: 50%;
    left: 20%;
    font-size: 2vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_img {
    opacity: 0.3;
    width: 25vw;
    height: 100vh;
    background-size: cover;
    vertical-align: middle;
  }
`

const CommingSoon = styled.div`
  position: relative;
  .entrance_Text {
  }
  .entrance_mainText {
    top: 45%;
    left: 28%;
    font-size: 1.3vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_subText {
    top: 50%;
    left: 19%;
    font-size: 2vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_img {
    opacity: 0.3;
    width: 25vw;
    height: 100vh;
    background-size: cover;
    vertical-align: middle;
  }
`

export default Entrance
