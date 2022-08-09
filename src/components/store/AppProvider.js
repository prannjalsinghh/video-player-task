import { useReducer } from "react";
import React from "react";
import AppContext from "./AppContext";

const defaultAppPage = {
  page: 0,
  form:false
//   url: "https://media.videoask.com/transcoded/dabd0292-cf99-40ba-a12a-245a279b31dc/video.mp4?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJtZWRpYV9pZCI6ImRhYmQwMjkyLWNmOTktNDBiYS1hMTJhLTI0NWEyNzliMzFkYyIsImV4cCI6MTY2MDI3NDk4M30.r8J0NyQiQLA71N-p_0WFx_f45w1QYNjdQKtmTgSK6-XHtVUJbz0hC4_hOl3EQFGMxcNVTadUeDSGhPeJs1nkVLAB6YOC69RxNqIQ3AQlih-5ogkOJ7nxcAKN3VWoGJw9e69JGLvcKskWCz9RtHsXQKswE70q1gSoQMJITvRG5RhM1lfd4E7tlYZkXU_Y0VtJJ7un8J3F1IbYCnHa1wrIFw-QAch9zOqt6GoScuvM6xF9pUdq7ZXey0hdESEnyLDeKKoIyZWccSYjpBcbqyu6YWOl-IT67CKwbEbU4lDjCh9euMkVSbSIrWbcvE1mx_BdKntIdqCW8yqM9s42U8DcE2yT7hcO4iNsWAN1yftigGB90s9wqHJ0re2NgkekDlSX-ubicCBpJacIQNHHAYRdfaWYs9txR_aH3UsgmiI3Jj6_8XD7LrDJvBYNdKa7aZygz7x4uCihisevBNGZgz2SgbvX0lXe5Tx2Fe6L8lQ-jmM6unrLFSWl4HoT9NQMfh3khK02GQNVrUy6KhL7-0WR0TTwzuuAnZWJp2XY0Z2AbGRXRg4c2Wr2xHQnbWg2HrgSDworE1xoePftCAQWNpXhMXNTJS4SVqPsvdO6uZcBsNHEG3ECpvvAAhOph3Jp9V9EJVx6kEkHkAXCB2SAF_165cdXiKySoOi0YPg2MwQ6gZ4tp://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
};

const appReducer = (state, action) => {

    if(action.type==='CHANGE'){
        return{
            page:action.page,
            form:state.form
        }
    }
    if(action.type==="CHANGE_FORM"){
        return{
            page:state.page,
            form:action.i
        }
    }
};

const AppProvider = (props) => {
  const [appState, dispatchAppState] = useReducer(appReducer, defaultAppPage);

  const pageChanger = (page) => {
    dispatchAppState({ type: "CHANGE", page: page });
    
  };
  const formSetter = (i)=>{
    dispatchAppState({type:"CHANGE_FORM",i:i})
  }
  const appContext = {
    page: appState.page,
    form:appState.form,
    setPages: pageChanger,
    setForm: formSetter
  };

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};
export default AppProvider;
