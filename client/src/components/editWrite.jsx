/*global kakao*/
import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { FaChevronDown } from 'react-icons/fa'
import GlobalStyle from '../globalStyle/globalStyle'
import Footer from '../components/footer'
import WriteContentsMap from '../components/map/writeContentsMap'
import CalendarWrite from '../utils/calenderWrite'
import SelectBoxWrite from '../utils/selectBoxWrite'
import store from '../store/store'
import { useDispatch } from 'react-redux'
import { writePostData } from '../_actions/post_action'

const EditWrite = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  let userPost = store.getState().post
  let userInfo = store.getState().user

  const titleRef = useRef()
  const groundRef = useRef()
  const content = useRef()


  const Token = userInfo.loginSuccess.accessToken
  const postData = userPost.postData.postsData
  console.log(postData)

  const handledate = (date) => {
    let ChangeDate =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2)
    setStartDate(ChangeDate)
  }

  useEffect(() => {
      if(postData.userPhone === "") {
        setphoneOpen(false)
      } else {
        setphoneOpen(true)
      }
  },[])

  const startTime = postData.startTime.slice(11, 19)
  const endTime = postData.endTime.slice(11, 19)

  const [startDate, setStartDate] = useState(postData.startTime)

  const [postTitle, setPostTitle] = useState(postData.title) // title
  const [postDivision, setPostDivision] = useState(postData.division) // division
  const [postStartTime, setPostStartTime] = useState(startTime) // startTime
  const [postEndTime, setPostEndTime] = useState(endTime) // endTime
  const sports = 'futsal' // sports
  const [postContent, setPostContent] = useState('') // content
  const [postGround, setPostGround] = useState('') // ground
  const [postPhoneOpen, setphoneOpen] = useState(false) // phoneOpen
  const [postAdressName, setAdressName] = useState('') // adressName
  const userId = userInfo.loginSuccess.userData.id

//   console.log(postDivision)

  const [getPlace, setGetPlace] = useState(postData.placeName)
  const [getGroundData, setGetGroundData] = useState([])
  const [groundData, setGroundData] = useState({})

  // const a = [...getGroundData, getGroundData]
  // console.log(startDate)

  // 게시글 제목 가져오기
  const handleInputTitle = (e) => {
    setPostTitle(e.target.value)
  }
  // start, end 셀렉트 박스 컴포넌트 value 가져오기
  const handleStartHour = (e) => {
    setPostStartTime(e.target.value)
  }
  const handleEndHour = (e) => {
    setPostEndTime(e.target.value)
  }
  const handleClickMember = () => {
    setPostDivision('용병모집')
  }
  const handleClickMatch = () => {
    setPostDivision('경기제안')
  }
  const handlePhoneCheck = (checked) => {
    postPhoneOpen ? setphoneOpen(false) : setphoneOpen(true)
  }
  const handleInputText = (e) => {
    setPostContent(e.target.value)
  }

  const getData = (getPlace) => {
    setGetPlace(getPlace)
  }
  // console.log('getPlace ====> ', getPlace)
//   console.log('placeName ====>=========== ', getPlace.place_name)
//   console.log('addressName ====> ', getPlace.address_name)
//   console.log('phone ====> ', getPlace.phone)
//   console.log('longitude ====> ', getPlace.x)
//   console.log('latitude ====> ', getPlace.y)
//   console.log('placeUrl ====> ', getPlace.place_url)
//   console.log(postStartTime, postEndTime)

  useEffect(() => {
    setGroundData({
      placeName: getPlace.place_name,
      addressName: getPlace.address_name,
      phone: getPlace.phone,
      longitude: getPlace.x,
      latitude: getPlace.y,
      placeUrl: getPlace.place_url
    })
  }, [getPlace])

  // console.log(`${startDate} ${postStartTime}`)

  // 등록하기 버튼 클릭시 발생하는 이벤트
  const handelSendPost = () => {
    dispatch(
      writePostData(
        postTitle,
        postDivision,
        startDate,
        postStartTime,
        postEndTime,
        sports,
        postContent,
        groundData,
        postPhoneOpen,
        Token
      )
    ).then((res) => {
      // console.log(res.payload)
      history.push(`/post/id=${postData.id}`)
    })
  }

  return (
    <>
      <GlobalStyle />
      <WriteContainer>
        <WriteIn>
          <div className="write_title">게시글 수정</div>
          <WriteTitle>
            <input
              type="text"
              value={postData.title}
              className="write_postTitle"
              onChange={(e) => {
                  handleInputTitle(e)
                }}
              ref={titleRef}
            />
          </WriteTitle>
          <WriteMap>
            <WriteContentsMap
              getPlace={getPlace}
              getData={getData}
              setGetGroundData={setGetGroundData}
              getGroundData={getGroundData}
            />
          </WriteMap>

          <WritePlace>
            <div className="write_palce">선택한 경기장</div>
            <input
              type="text"
              value={getPlace.place_name}
              className="write_choiceGround"
              ref={groundRef}
            />
          </WritePlace>
          <WriteRequest>
            <div className="write_kindRequest">요청 종류</div>
            <RequestBtn>
              <div
                className={
                  postDivision === '용병모집' ? 'write_btn1Click' : 'write_btn1'
                }
                onClick={handleClickMember}
              >
                용병모집
              </div>
              <div
                className={
                  postDivision === '경기제안' ? 'write_btn2Click' : 'write_btn2'
                }
                onClick={handleClickMatch}
              >
                경기제안
              </div>
            </RequestBtn>
          </WriteRequest>
          <WriteDate>
            <div className="write_data">경기 일정</div>
            <CalendarWrap>
              <CalendarWrite
                className="Calender"
                setStartDate={handledate}
                startDate={startDate}
              />
              <DownWrap>
                <FaChevronDown />
              </DownWrap>
              <TimeWrap>
                <SelectBoxWrite
                  handleStartHour={handleStartHour}
                  handleEndHour={handleEndHour}
                />
              </TimeWrap>
            </CalendarWrap>
          </WriteDate>
          <WritePhoneCheck>
            <div className="write_phonecheck">전화번호 표시</div>
            <input
              type="checkbox"
              className="write_checkBox"
              checked={postPhoneOpen ? "checked" : false}
              onChange={(e) => handlePhoneCheck(e)}
            />
          </WritePhoneCheck>
          <WriteEtc>
            <div className="write_etc">요청사항</div>
            <textarea
              className="write_textArea"
              value={postData.content}
              onChange={(e) => handleInputText(e)}
              ref={content}
            ></textarea>
          </WriteEtc>
          <div className="write_send" onClick={handelSendPost}>
            등록하기
          </div>
        </WriteIn>
      </WriteContainer>
      <Footer />
    </>
  )
}

const WriteContainer = styled.div`
  display: flex;
  width: 100%;
`

const WriteIn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .write_title {
    display: flex;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    margin: 80px 0px 20px 0px;
  }
  .write_send {
    display: flex;
    justify-content: center;
    margin: 30px 0px 50px 700px;
    font-size: 1.6rem;
    :hover {
      color: #890909;
      cursor: pointer;
    }
  }
`

const WriteTitle = styled.div`
  display: flex;
  justify-content: center;
  .write_postTitle {
    max-width: 800px;
    width: 780px;
    height: 50px;
    font-size: 1.6rem;
    border-top: none;
    border-left: none;
    border-right: none;
    background-color: #fafafa;
    :focus {
      outline: none;
    }
  }
`

const WriteMap = styled.div`
  display: flex;
  max-width: 800px;
  width: 100vw;
  margin: 0px auto 0px auto;
  z-index: 1;
  /* height: 100px; */
`

const WritePlace = styled.div`
  display: flex;
  max-width: 800px;
  justify-content: center;
  flex-direction: column;
  margin: 20px auto 20px auto;
  .write_palce {
    display: flex;
    font-size: 1.3rem;
  }
  .write_choiceGround {
    width: 780px;
    height: 30px;
    margin: 20px 0px 0px 0px;
    padding: 0px 0px 10px 0px;
    font-size: 1.5rem;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid black;
    background-color: #fafafa;
  }
`

const WriteRequest = styled.div`
  display: flex;
  max-width: 800px;
  flex-direction: column;
  /* align-items: center; */
  margin: 30px auto 20px auto;
  .write_kindRequest {
    display: flex;
    font-size: 1.3rem;
    margin: 0px 0px 0px 0px;
  }
  .write_btn1 {
    display: flex;
    justify-content: left;
    margin: 20px 0px 0px 0px;
    padding: 15px 153px 10px 153px;
    border: 1px solid black;
    border-radius: 10px;
    font-size: 1.3rem;
    :hover {
      background-color: #840909;
      color: #fafafa;
      cursor: pointer;
    }
  }
  .write_btn1Click {
    display: flex;
    justify-content: left;
    margin: 20px 0px 0px 0px;
    padding: 15px 154px 10px 154px;
    background-color: #840909;
    border-radius: 10px;
    font-size: 1.3rem;
    color: #fafafa;
  }
  .write_btn2 {
    display: flex;
    justify-content: left;
    margin: 20px 0px 0px 20px;
    padding: 15px 153px 10px 153px;
    border: 1px solid black;
    border-radius: 10px;
    font-size: 1.3rem;
    :hover {
      background-color: #840909;
      color: #fafafa;
      cursor: pointer;
    }
  }
  .write_btn2Click {
    display: flex;
    justify-content: left;
    margin: 20px 0px 0px 20px;
    padding: 15px 154px 10px 154px;
    background-color: #840909;
    border-radius: 10px;
    font-size: 1.3rem;
    color: #fafafa;
  }
`
const RequestBtn = styled.div`
  display: flex;
  flex-direction: row;
`

const WriteDate = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  justify-content: center;
  margin: 20px auto 20px auto;
  .write_data {
    font-size: 1.3rem;
    margin-left: 10px;
  }
`

const TimeWrap = styled.div``

const CalendarWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0px 0px 0px;
  position: relative;
`

const DownWrap = styled.div`
  /* width: 10px; */
  position: absolute;
  top: 15%;
  right: 17%;
  color: #000000;
  z-index: -1;
`

const WritePhoneCheck = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 800px;
  justify-content: left;
  align-items: center;
  margin: 20px auto 20px auto;
  .write_phonecheck {
    font-size: 1.3rem;
    margin-right: 20px;
    margin-top: 3px;
  }
  .write_checkBox {
    transform: scale(1.5);
    /* color: #840909; */
    margin-right: 630px;
  }
`

const WriteEtc = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  justify-content: left;
  align-items: center;
  margin: 20px auto 20px auto;
  .write_etc {
    font-size: 1.3rem;
    margin-right: 710px;
  }
  .write_textArea {
    margin-top: 20px;
    width: 780px;
    height: 200px;
    resize: none;
    font-size: 1.1rem;
  }
`

export default EditWrite