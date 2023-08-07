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