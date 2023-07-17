const expandicon = document.getElementById("expandIcon");
expandicon.addEventListener("click", slideMenu);
const slider = document.getElementById("sliderpanel");
const tl = gsap.timeline({
  reversed: true,
  paused: true,
  defaults: {
    duration: 0.75
  }
});
tl.set(slider,{autoAlpha:1})
tl.to(slider,{ width: "90%"})
function slideMenu() {
  // play or reverse the timeline
  tl.reversed() ? tl.play() : tl.reverse();
  if(!tl.reversed()){
    expandicon.innerHTML = "<span class='material-symbols-outlined'>keyboard_double_arrow_right</span>";
  }
  else{
    expandicon.innerHTML = " <span class='material-symbols-outlined'>keyboard_double_arrow_left</span>";
  }
}
const baseUrl ="http://localhost:2500/";
const Forward = document.getElementById("forward");
Forward.addEventListener("click",addDirection);
const Backward = document.getElementById("backward");
Backward.addEventListener("click",addDirection);
const Left = document.getElementById("left");
Left.addEventListener("click",addDirection);
const Right = document.getElementById("right");
Right.addEventListener("click",addDirection);
const Stop = document.getElementById("stop");
Stop.addEventListener("click",addDirection);
async function addDirection(e){
  e.preventDefault();
  const res = await fetch(baseUrl,
    {method:'POST',
    headers:{"Content-Type":'application/json'},
    body: JSON.stringify({parcel: e.target.id})
  });
  printDirection(e.target.id)
}
const box = document.getElementById("directions_entery");
let message ="";
function printDirection(e){
  message = '<div class="messageContainer"><div class="directionentery">'+e+'</div><div class="message">'+new Date().toLocaleTimeString()+'</div></div>' + message
  box.innerHTML = message;
}

