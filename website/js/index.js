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