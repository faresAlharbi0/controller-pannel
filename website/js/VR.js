
const icon = document.getElementById("imgicon");
icon.addEventListener("click", slideNav);
const vrcontainer = document.getElementById("vrcontainer");
const tl2 = gsap.timeline({
  reversed: true,
  paused: true,
  defaults: {
    duration: 0.55
  }
});
tl2.set(vrcontainer,{autoAlpha:1})
tl2.to(vrcontainer,{ height: "35rem"})
function slideNav() {
    // play or reverse the timeline
    tl2.reversed() ? tl2.play() : tl2.reverse();
  }

const vrinputscontainer = document.getElementById("vrinputscontainer");

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition, recognition, recording = false;
recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "en-US";

recognition.onresult = (e) =>{
  text = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
  console.log(text);
}
recognition.start();