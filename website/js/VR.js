const icon = document.getElementById("imgicon");
const nav = document.getElementById("scndNav")
icon.addEventListener("click", slideNav);
const vrbtn = document.getElementById("vrbtn");
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
    }
    else if(!tl2.reversed()){
      tl2.reverse()
      icon.style = "transform: translateX(0rem);"
      nav.style = "transform: translateX(0rem);"
      vrbtn.style = "transform: translateY(-500%);"
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