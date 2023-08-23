const icon = document.getElementById("imgicon");
const nav = document.getElementById("scndNav")
icon.addEventListener("click", slideNav);
const vrbtn = document.getElementById("vrbtn");
const startbtn = document.getElementById("startbtn");
const vrcontainer = document.getElementById("vrcontainer");
const tl2 = gsap.timeline({
  reversed: true,
  paused: true,
  defaults: {
    duration: 0.55
  }
});
tl2.set(vrcontainer,{autoAlpha:1})
tl2.to(vrcontainer,{ height: "30rem"})
function slideNav() {
    // play or reverse the timeline
    if(tl2.reversed()){
      tl2.play()
      icon.style = "transform: translateX(6.5rem);"
      nav.style = "transform: translateX(16em);"
      vrbtn.style = "transform: translateY(0%);" 
      startbtn.style = "transform: translateY(0%);" 
    }
    else if(!tl2.reversed()){
      tl2.reverse()
      icon.style = "transform: translateX(0rem);"
      nav.style = "transform: translateX(0rem);"
      vrbtn.style = "transform: translateY(-500%);"
      startbtn.style = "transform: translateY(-500%);" 
    }
  }
let vrtext
let vrmsg = ""
const vrinputscontainer = document.getElementById("vrinputscontainer");
vrinputscontainer.scrollTop = vrinputscontainer.scrollHeight;
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition, recognition, recording = false;
recognition = new SpeechRecognition();
recognition.interimResults = false;
recognition.lang = "en-US";
function runvr(){
  recognition.onresult = (e) =>{
    vrtext = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
    if(vrtext != "" && vrtext != undefined){
      vrmsg += '<div class="vrinputs"><div class="vrmsg">'+vrtext+'</div></div>'
      console.log(vrtext);
    }
  }
}
recognition.addEventListener('end', () => {
  if(recording == true){
    if(vrtext != "" && vrtext != undefined && vrmsg != undefined){
      vrinputscontainer.innerHTML = vrmsg
    }
    vrtext = ""
    recognition.start()
  }
});

let audioIN = { audio: true };
//  audio is true, for recording

// Access the permission for use
// the microphone
navigator.mediaDevices.getUserMedia(audioIN)// 'then()' method returns a Promise
.then(function (mediaStreamObj) {

  // Connect the media stream to the
  // first audio element
  let audio = document.querySelector('audio');
  //returns the recorded audio via 'audio' tag

  // 'srcObject' is a property which
  // takes the media object
  // This is supported in the newer browsers
  if ("srcObject" in audio) {
    audio.srcObject = mediaStreamObj;
  }
  else {   // Old version
    audio.src = window.URL
      .createObjectURL(mediaStreamObj);
  }
  const startbtn = document.getElementById("startbtn");
  let audioRecording = false;


  // This is the main thing to recorded
  // the audio 'MediaRecorder' API
  let mediaRecorder = new MediaRecorder(mediaStreamObj);
  // Pass the audio stream

  startbtn.addEventListener('click',(e)=>{
    if(audioRecording == false){
      startbtn.classList.toggle("direction");
      startbtn.innerHTML = "stop"
      audioRecording = true
      mediaRecorder.start();
    }
    else if(audioRecording == true){
      startbtn.classList.toggle("direction");
      startbtn.innerHTML = "start"
      audioRecording = false
      mediaRecorder.stop();
    }
  })

  // If audio data available then push
  // it to the chunk array
  mediaRecorder.ondataavailable = function (ev) {
    dataArray.push(ev.data);
  }

  // Chunk array to store the audio data
  let dataArray = [];

  // Convert the audio data in to blob
  // after stopping the recording
  mediaRecorder.onstop = function (ev) {

    // blob of type mp3
    console.log(dataArray)
    let audioData = new Blob(dataArray,
      { 'type': "audio/x-wav" });
      file = new File([audioData], "audio", {'type': 'audio/wav'})
      uploadAudio(file);
      // After fill up the chunk
      // array make it empty
      dataArray = [];

      // Creating audio url with reference
      // of created blob named 'audioData'
      let audioSrc = window.URL
      .createObjectURL(audioData);
    }
  })

// If any error occurs then handles the error
.catch(function (err) {
  console.log(err.name, err.message);
});
startbtn.addEventListener('click',(e)=>{
  if(recording == false){
    startbtn.classList.toggle("direction");
    startbtn.innerHTML = "on"
  }
  else if(recording == true){
    startbtn.classList.toggle("direction");
    startbtn.innerHTML = "off"
  }
})
vrbtn.addEventListener('click',(e)=>{
  if(recording == false){
    vrbtn.classList.toggle("direction");
    vrbtn.innerHTML = "on"
    recording = true
    recognition.start();
    runvr()
  }
  else if(recording == true){
    recognition.stop();
    recording = false
    vrbtn.classList.toggle("direction");
    vrbtn.innerHTML = "off"
  }
})
function uploadAudio(input){
  const formData = new FormData();
  formData.append('audio', input);
  fetch('/upload', {
    method: 'POST',
    command: 'exportWAV',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      vrmsg += '<div class="vrinputs"><div class="vrmsg">'+data+'</div></div>'
      vrinputscontainer.innerHTML = vrmsg
    })
  .catch(error => {
    console.error('Error:', error);
  });

}