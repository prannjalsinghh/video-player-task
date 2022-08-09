import Player from "./components/player";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "./components/store/AppContext";
import Form from "./components/Form";

function App(){
  const [url,setURL] = useState('')
  const AppCtx = useContext(AppContext);
  const pages = AppCtx.page || 0;

  useEffect(()=>{
    setUrl();
  },[AppCtx.page]);

  function setUrl(){
    if(pages===0){
      setURL('https://media.videoask.com/transcoded/dabd0292-cf99-40ba-a12a-245a279b31dc/video.mp4?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJtZWRpYV9pZCI6ImRhYmQwMjkyLWNmOTktNDBiYS1hMTJhLTI0NWEyNzliMzFkYyIsImV4cCI6MTY2MDI3NDk4M30.r8J0NyQiQLA71N-p_0WFx_f45w1QYNjdQKtmTgSK6-XHtVUJbz0hC4_hOl3EQFGMxcNVTadUeDSGhPeJs1nkVLAB6YOC69RxNqIQ3AQlih-5ogkOJ7nxcAKN3VWoGJw9e69JGLvcKskWCz9RtHsXQKswE70q1gSoQMJITvRG5RhM1lfd4E7tlYZkXU_Y0VtJJ7un8J3F1IbYCnHa1wrIFw-QAch9zOqt6GoScuvM6xF9pUdq7ZXey0hdESEnyLDeKKoIyZWccSYjpBcbqyu6YWOl-IT67CKwbEbU4lDjCh9euMkVSbSIrWbcvE1mx_BdKntIdqCW8yqM9s42U8DcE2yT7hcO4iNsWAN1yftigGB90s9wqHJ0re2NgkekDlSX-ubicCBpJacIQNHHAYRdfaWYs9txR_aH3UsgmiI3Jj6_8XD7LrDJvBYNdKa7aZygz7x4uCihisevBNGZgz2SgbvX0lXe5Tx2Fe6L8lQ-jmM6unrLFSWl4HoT9NQMfh3khK02GQNVrUy6KhL7-0WR0TTwzuuAnZWJp2XY0Z2AbGRXRg4c2Wr2xHQnbWg2HrgSDworE1xoePftCAQWNpXhMXNTJS4SVqPsvdO6uZcBsNHEG3ECpvvAAhOph3Jp9V9EJVx6kEkHkAXCB2SAF_165cdXiKySoOi0YPg2MwQ6gZ4tp://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4')
    }
    else if(pages===1){
      setURL("https://media.videoask.com/transcoded/435ae671-33f0-45a4-b958-62402c2b6133/video.mp4?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJtZWRpYV9pZCI6IjQzNWFlNjcxLTMzZjAtNDVhNC1iOTU4LTYyNDAyYzJiNjEzMyIsImV4cCI6MTY2MDI4OTg0OH0.yVSV7G8yHNBQ4_zt-Dl5rrOlyVQ67E1kFVupRy9y7OI1U-rdpK7Gr-8UYqymLBUgUWW-2O5Gf1URxkELismj_3g4npfKq8Lp9p1OuLguu-AmxSM8nQRFwNSRiXXq4A6NNogoe5dlanO0Ob6Yz7SGKg0ttKiJTpI2vn-UJ7Ru882TPQi51ELD167GmNyej7n4ASSZWAX4YrWu9xLm3D8gg4FIjQwGPOqbBCe_Eipy996JHfGhPVBTS1-dxy7qxFeHnYMK_k1A8Zd5joa7-uAA_xSjTEasNQwvRxcKswNCHOHH_iR5tEwYLhgJXw71Lx2UQgiNmBDkWD7Zf2RCthy0FCj5M8vboiTdYEdAxPZQMq5uvHFudDjfGhCE5qZ31WlR8SSu625y7f97lT0PzWUDMXuRKStSPSqr8hEZ1PrTXdc457CxbSJhcYWVBhrtGtnonNJ8DhHZjsNAyII2W2nvIObhIVi5uhGrNBm4Iunu66P83qtoTRSzcWWazMSJzlZzW7KODUikLK5-6RvQKUea-9p4yektvfZFWX2iCuQe0PCGFx3FnjvrF8gToTnvzY5n_u5nBOnKwiiq7ARq5DLp2dWk9tkjmF-b961bKJuotyMLbI_roHBXeQIKjJADv8H6U46vXqJr4UnlVfKYrq7aLfd8Ww3_UO7tsySvIRWalnQ")
    }
    else if(pages===2){
      setURL("https://media.videoask.com/transcoded/e8762b7e-7699-495d-a72c-24ea32902eea/video.mp4?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJtZWRpYV9pZCI6ImU4NzYyYjdlLTc2OTktNDk1ZC1hNzJjLTI0ZWEzMjkwMmVlYSIsImV4cCI6MTY2MDI4OTg0OH0.YLhQxpUOFmgUfFkg07LIdKLgGRkxeBATOAXfEWh7_Mh2CYfkZ39Cg5EExfX4bokAEx_IxGfDBGJDuOGuTCs6TL2YbiiNBSpv9ipsQN2WqRwsaKj8jVZagfS-VD7RfFy9Xj0vbzbwgmJ1tgHtipldy0rERDX4qzEAH0NN50wnoc1-NNY6IoJx43IReKBCYhxX_WWaeXD4ueWH-wXFq27d9mfS1VgEbZsjJRvtg46WZ8yASWLP4aU8gQrI0lAeDGuIfe8BuvJgNgUGmkZQMliWgazOVq40MBFjxK-NCqR9iwomkRiE1xwBJHtrA2YE9d_hS0StWi3xQjQ00J_4CqAlA34_N3_3Qiu42CI3BYQcwdbBIc7mAKVKN3BbGeLTH3VGgv_lX0_KqnVk7w1BUN039ZL4hW6BKazIkzx012LojkcWxfdZP0T9wB43TfHXcLxOtRF0Ovl-Tuxy2vUOPjxUQxic0iCobi2hIYoJJqZer1qLqysBnIxUENp7Ns1kj-3BP1CwzoNQL1Rwyqph_PuuWWwxt021iW8F_g7Bxnb5twVNW7tRY9YF8jkr_BlhFGg9kXJzqsmhTxZhWzExxZX4V-NhIbXeSVMayY2YVDetoDCEcRFK0wT8yxb02tCXyRHZ9U0vwqaVnhFjdJB71TkSnwBn4En050s1uJBhWeTcdeE")
    }
  }
  return(
    
      <Player page={pages} url={url}/>
      
   
  )
}

export default App;