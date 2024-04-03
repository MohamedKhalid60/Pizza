var header = document.getElementById("header");
var homeBack = document.getElementById("homeBack");
window.onscroll = function () {
  if (window.scrollY > 200) {
    header.classList.add("header-fixed");
    homeBack.classList.add("show");
  } else {
    header.classList.remove("header-fixed");
    homeBack.classList.remove("show");
  }
};
homeBack.addEventListener("click", function () {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});

var recipes = [];
var one = document.getElementById("one");
var two = document.getElementById("two");
var three = document.getElementById("three");
var next = document.getElementById("next");
var prev = document.getElementById("prev");
var prevImg = document.getElementById("prevImg");
var nextImg = document.getElementById("nextImg");
var close = document.getElementById("close");
var details = document.getElementById("details");
var imgvar = document.getElementsByClassName("imgvar");
var overlay = document.getElementById("overlay");
var overlayItem = document.getElementById("overlayItem");

async function get(kind) {
  var response = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${kind}`
  );
  var data = await response.json();
  recipes = data.recipes;
  console.log(recipes);
  var count = 0;
  display(count);
  next.addEventListener("click", function () {
    count += 4;
    if (count > recipes.length - 1) {
      count = 0;
    }
    display(count);
  });
  prev.addEventListener("click", function () {
    count -= 4;
    if (count < 0) {
      count = recipes.length - 1;
    }
    display(count);
  });
}
function kind() {
  one.addEventListener("click", function () {
    get("pizza");
  });
  two.addEventListener("click", function () {
    get("beef");
  });
  three.addEventListener("click", function () {
    get("salad");
  });
}
get("pizza");
kind();

var cartoona = "";

function display(startIndex) {
  for (var i = startIndex; i < Math.min(startIndex + 4, recipes.length); i++) {
    cartoona += `
                  <div class="col-xl-3">
                          <div class="card">
                            <div class="overlayImg">
                              <span id="details"  ><i class="fa-solid fa-share"></i></span>
                            </div>
                            <img class="imgvar" src=${recipes[i].image_url} alt="" />
                            <h3>${recipes[i].publisher}</h3>
                            <p>${recipes[i].title}</p>
                          </div>
                        </div>`;
  }
  var row = document.getElementById("row");
  row.innerHTML = cartoona;
  row.addEventListener("click", function (e) {
    if (e.target.classList.contains("imgvar")) {
      var imgsrc = e.target.src;
      // console.log(imgsrc);
      overlayItem.style.backgroundImage = `url(${imgsrc})`;
      overlay.style.display = "flex";
    }
  });

  cartoona = "";
}
close.addEventListener("click", function () {
  overlay.style.display = "none";
});
var counter = 0;
nextImg.addEventListener("click", nextSlider);
function nextSlider() {
  counter++;
  if (counter > imgvar.length - 1) {
    counter = 0;
  } else {
    var imgsrc = imgvar[counter].src;
    overlayItem.style.backgroundImage = `url(${imgsrc})`;
  }
}
prevImg.addEventListener("click", prevSlider);
function prevSlider() {
  counter--;
  if (counter < 0) {
    counter = imgvar.length - 1;
  } else {
    var imgsrc = imgvar[counter].src;
    overlayItem.style.backgroundImage = `url(${imgsrc})`;
  }
}
// function displayData() {
//   var container = "";
//   for (var i = 0; i < recipes.length; i++) {
//     container += `
//     <div id="overlay" class="overlay">
//         <div class="row justify-content-between">
//           <div id="overlayItem" class="col-xl-4 overlayItem">
//             <span id="prevImg"><i class="fa-solid fa-arrow-left"></i></span>
//             <span id="nextImg"><i class="fa-solid fa-arrow-right"></i></span>
//             <span id="close"> <i class="fa-solid fa-xmark"></i></span>
//           </div>
//           <div class="text col-xl-6">
//             <h2>${recipes[i].publisher}</h2>
//             <p>
//             ${recipes[i].publisher}
//             </p>
//             <p>
//             ${recipes[i].title}
//             </p>
//             <button class="btn btn-info">Order Now</button>
//           </div>
//         </div>
//       </div>
//     `;
//   }
//   document.getElementById("pagin").innerHTML = container;
// }
