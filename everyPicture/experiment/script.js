(function(){
  'use strict';
  console.log("reading JS");

  var tree = document.querySelector("#tree");
  var background = document.querySelector("#background");
  var base = document.querySelector("#base");
  var butterfly = document.querySelector("#butterfly");
  var story = document.querySelector(".trunk");

  function hideAll() {
    butterfly.style.opacity = "0";
    butterfly.style.transform = "scale(0.7)";
    story.style.display = "none";
    base.style.transform = "scale(1)";
  }

  function showAll() {
    butterfly.style.opacity = "1";
    butterfly.style.transform = "scale(1)";
    story.style.display = "block";
    base.style.transform = "scale(1.3)";
  }

  hideAll();

  tree.addEventListener("click", function (event) {
    event.stopPropagation();
    showAll();
  });

  background.addEventListener("click", function () {
    hideAll();
  });

})()
