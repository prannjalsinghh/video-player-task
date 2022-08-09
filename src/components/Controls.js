import React, { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeMute from "@material-ui/icons/VolumeOff";
import FullScreen from "@material-ui/icons/Fullscreen";
import Popover from "@material-ui/core/Popover";
import ButtonDiv from "./ButtonsDiv";
import './Controls.css';


const useStyles = makeStyles((theme) => ({
  controlsWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  button: {
    margin: theme.spacing(1),
  },
  controlIcons: {
    color: "black",
    backgroundColor:"white",
    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "black",
      backgroundColor:"white",
      fontSize: 50,
      transform: "scale(1)",
    },
  },

  bottomIcons: {
    color: "#999",
    "&:hover": {
      color: "#fff",
    },
  },

 
}));



const Controls = forwardRef(
  (
    {
      onSeek,
      onSeekMouseDown,
      onSeekMouseUp,
      onDuration,
      onRewind,
      onPlayPause,
      onFastForward,
      playing,
      played,
      elapsedTime,
      totalDuration,
      onMute,
      muted,
      onVolumeSeekDown,
      onChangeDispayFormat,
      playbackRate,
      onPlaybackRateChange,
      onToggleFullScreen,
      volume,
      onVolumeChange,
      onBookmark,
      showButtons,
      intDuration,
      currentTime
    },
    ref
  ) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      event.stopPropagation();
    };

    const handleClose = () => {
      setAnchorEl(null);
      
    };
    useEffect(()=>{
      move();
    },[currentTime])
    function move() {
      console.log(currentTime/intDuration)
        var elem = document.getElementById("myBar");
        elem.style.width = (currentTime/intDuration) *100 + "%";
     
    }

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
      <div ref={ref} className={classes.controlsWrapper}>
        <Grid
          container
          direction="column"
          justify="space-between"
          style={{ flexGrow: 1 }}
        >
          <Grid>
            
            <div id="myProgress">
            <div id="myBar"></div>
            </div>
           
            <Grid container justify="flex-end" alignItems="center">
              <IconButton
                onClick={onMute}
                className={`${classes.bottomIcons} ${classes.volumeButton}`}
              >
                {muted ? (
                  <VolumeMute fontSize="" />
                ) : volume > 0.5 ? (
                  <VolumeUp fontSize="" />
                ) : (
                  <VolumeDown fontSize="" />
                )}
              </IconButton>
              <Typography
                variant="body1"
                style={{ color: "#fff", marginLeft: 16 }}
              >
                {elapsedTime}/{totalDuration}
                
                {console.log(typeof(elapsedTime))}
              </Typography>
              <Grid item>
                <Button
                  onClick={handleClick}
                  aria-describedby={id}
                  className={classes.bottomIcons}
                  variant="text"
                >
                  <Typography>{playbackRate}X</Typography>
                </Button>

                <Popover
                  container={ref.current}
                  open={open}
                  id={id}
                  onClose={handleClose}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Grid container direction="column-reverse">
                    {[0.5, 1, 1.5, 2].map((rate) => (
                      <Button
                        key={rate}
                        onClick={(event) =>{ handleClose(); onPlaybackRateChange(event,rate)}}
                        variant="text"
                      >
                        <Typography
                          color={
                            rate === playbackRate ? "secondary" : "inherit"
                          }
                        >
                          {rate}X
                        </Typography>
                      </Button>
                    ))}
                  </Grid>
                </Popover>
                <IconButton
                  onClick={onToggleFullScreen}
                  className={classes.bottomIcons}
                >
                  <FullScreen fontSize="" />
                </IconButton>
              </Grid>
            </Grid>
            
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            style={{ padding: 16 }}
          >
            
          </Grid>

          <Grid container direction="row" alignItems="center" justify="center">
            {!playing && <IconButton
              onClick={onPlayPause}
              className={classes.controlIcons}
              aria-label="play"
            >
              <PlayArrowIcon fontSize="inherit" />
            </IconButton>}
          </Grid>
          {/* bottom controls */}
          <Grid container direction="column" alignItems="center">
            {!showButtons && <ButtonDiv call="controls"/>}
          </Grid>
          <div className="poweredBy">
              Powered By: <span style={{fontWeight:"bolder"}}>videoask</span>
          </div>
        </Grid>
      </div>
    );
  }
);

Controls.propTypes = {
  onSeek: PropTypes.func,
  onSeekMouseDown: PropTypes.func,
  onSeekMouseUp: PropTypes.func,
  onDuration: PropTypes.func,
  onRewind: PropTypes.func,
  onPlayPause: PropTypes.func,
  onFastForward: PropTypes.func,
  onVolumeSeekDown: PropTypes.func,
  onChangeDispayFormat: PropTypes.func,
  onPlaybackRateChange: PropTypes.func,
  onToggleFullScreen: PropTypes.func,
  onMute: PropTypes.func,
  playing: PropTypes.bool,
  played: PropTypes.number,
  elapsedTime: PropTypes.string,
  totalDuration: PropTypes.string,
  muted: PropTypes.bool,
  playbackRate: PropTypes.number,
};
export default Controls;
