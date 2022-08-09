import React, { useState, useRef, useEffect, useContext } from "react";
import { findDOMNode } from "react-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ReactPlayer from "react-player";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeMute from "@material-ui/icons/VolumeOff";
import FullScreen from "@material-ui/icons/Fullscreen";
import Popover from "@material-ui/core/Popover";
import screenful from "screenfull";
import Controls from "./Controls";
import './Player.css'
import ButtonDiv from "./ButtonsDiv";
import AppContext from "./store/AppContext";
import Form from "./Form";

const useStyles = makeStyles((theme) => ({
  
  playerWrapper: {
    width:"100%",
    height:"100%",
    objectFit: "cover",width: "fit-content",
    
    position: "relative",
    
  },

  controlsWrapper: {
    visibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topControls: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
  },
  middleControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },

  bottomControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // height:40,
  },

  button: {
    margin: theme.spacing(1),
  },
  controlIcons: {
    color: "#777",

    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
  },

  bottomIcons: {
    color: "#999",
    "&:hover": {
      color: "#fff",
    },
  },

  volumeSlider: {
    width: 100,
  },
}));




const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

let count = 0;

function Player(props) {
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 1023px)").matches
      )
    
      useEffect(() => {
        window
        .matchMedia("(min-width: 1023px)")
        .addEventListener('change', e => setMatches( e.matches ));
      }, []);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
  const [bookmarks, setBookmarks] = useState([]);
  const [state, setState] = useState({
    pip: false,
    playing: false,
    controls: false,
    light: false,

    muted: false,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
  });

  const AppCtx = useContext(AppContext);
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const {
    playing,
    controls,
    light,

    muted,
    loop,
    playbackRate,
    pip,
    played,
    seeking,
    volume,
  } = state;

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };



  const handleProgress = (changeState) => {
 
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const toggleFullScreen = (event) => {
    screenful.toggle(playerContainerRef.current);
    event.stopPropagation();
  };

  const handleMouseMove = () => {
    console.log("mousemove");
    controlsRef.current.style.visibility = "visible";
    count = 0;
    
  };



  const handlePlaybackRate = (event,rate) => {
    event.stopPropagation();
    setState({ ...state, playbackRate: rate });
    
  };

  const hanldeMute = (event) => {
    setState({ ...state, muted: !state.muted });
    event.stopPropagation();
  };


  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : "00:00";

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
  const elapsedTime =
    timeDisplayFormat == "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;
  const totalDuration = format(duration);

  return (
    <div className="main">
      
     
   <Container  onClick={handlePlayPause}   maxWidth= {matches===true ?"sm":"100%"} style={{paddingRight: "0",
        paddingLeft: "0",
        paddingTop: "0",
        paddingBottom: "0",
        margin:"0"
        }}>
        {(!AppCtx.form || matches)  &&(<div
       
          onMouseMove={handleMouseMove}
         
          ref={playerContainerRef}
          className={classes.playerWrapper}
        >
          <ReactPlayer
            ref={playerRef}
          width="100%"
           height={"100%"}
            url={props.url}
            pip={pip}
            playing={playing}
            controls={false}
            light={light}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onProgress={handleProgress}
            style={{   
              
            }}
            config={{
              file: {
                attributes: {
                  crossorigin: "anonymous",
                },
                
              },
            }}
          />

          <Controls
            ref={controlsRef}
            onPlayPause={handlePlayPause}
            playing={playing}
            played={played}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
            onMute={hanldeMute}
            muted={muted}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRate}
            onToggleFullScreen={toggleFullScreen}
            volume={volume}
            showButtons={matches}
            intDuration={duration}
            currentTime={currentTime}
          />
        </div>)}
        {!matches&& (AppCtx.form && <Form/>)}
        </Container>
    {matches && <ButtonDiv call="main" />}
    </div>
  );
}

export default Player;
