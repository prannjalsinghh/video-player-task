import React, { useContext, useState } from "react";
import App from "../App";
import styles from "./ButtonDiv.module.css";
import Form from "./Form";
import AppContext from "./store/AppContext";
const ButtonDiv = (props) => {
  const AppCtx = useContext(AppContext);

  function renderCampaign() {
    AppCtx.setPages(1);
  }
  function learnFacebook() {
    AppCtx.setPages(2);
  }
  function showForm(){
    AppCtx.setForm(true);
  }
  return (
    <>
      {AppCtx.page === 0 && (
        <div className={styles.buttonDiv}>
          <button
            style={{
              backgroundColor:
                props.call === "controls"
                  ? "rgba(0, 0, 0, 0.45)"
                  : "rgba(13, 14, 14, 0.1)",
              color: props.call === "controls" ? "white" : "black",
            }}
            onClick={renderCampaign}
          >
            <div className={styles.eachButton}>
              <span className={styles.alphabet}>A</span>
              <span>Campaign Structure</span>
            </div>
          </button>
          <button
            style={{
              backgroundColor:
                props.call === "controls"
                  ? "rgba(0, 0, 0, 0.45)"
                  : "rgba(13, 14, 14, 0.1)",
              color: props.call === "controls" ? "white" : "black",
            }}
            onClick={learnFacebook}
          >
            <div className={styles.eachButton}>
              <span className={styles.alphabet}>B</span>
              <span>Learn Facebook Basics</span>
            </div>
          </button>
        </div>
      )}
     {!AppCtx.form && (AppCtx.page === 1 && (
        <div className={styles.secondDiv}>
          <button onClick={showForm}>Download "Campaign Structure Guide"</button>
        </div>
      ))}
      {!AppCtx.form  && (AppCtx.page === 2 && (
        <div className={styles.secondDiv}>
          <button onClick={showForm}>Sign up for free webinar</button>
        </div>
      ))}
      {AppCtx.form  && <Form call={props.call}/>}
      
    </>
  );
};
export default ButtonDiv;
