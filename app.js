const object = document.querySelector(".base");
const radialButton = document.querySelector("#radial");
const linearButton = document.querySelector("#linear");
const reverseButton = document.querySelector(".reverseColors");
const setting_page = document.querySelector(".setting");
const dir = {
  top: document.querySelector("#top"),
  bottom: document.querySelector("#bottom"),
  left: document.querySelector("#left"),
  right: document.querySelector("#right"),
  //
  top_right: document.querySelector("#top_right"),
  top_left: document.querySelector("#top_left"),
  bottom_right: document.querySelector("#bottom_right"),
  bottom_left: document.querySelector("#bottom_left"),
};

let reverse = false;
let values = {
  type: "linear",
  direction: "right bottom",
  firstColor: "",
  secondColor: "",
};

//generates random colors
function color() {
  let val = "";
  for (let i = 0; i <= 5; i++) {
    val += Math.floor(Math.random() * 9);
  }
  return "#" + val;
}

function setConfig(status) {
  let structure = `${values.type}-gradient(${
    values.type === "linear" ? `to ${values.direction},` : ""
  }${status === true ? values.secondColor : values.firstColor},${
    status === true ? values.firstColor : values.secondColor
  })`;
  object.style.background = structure;
  object.innerHTML = `<div class='Content'><code>background: <span class='yellow'>${
    values.type
  }-gradient</span> ( ${
    values.type === "linear"
      ? `<span class='gray'>to</span> <span class='purple'>${values.direction}</span>,`
      : ""
  } <div class='firstColorBox colorBox'></div>${
    status === true ? values.secondColor : values.firstColor
  }, <div class='secondColorBox colorBox'></div>${
    status === true ? values.firstColor : values.secondColor
  } );</code></div>`;

  //event handlers
  const con = document.querySelector(".Content");
  const firstColorBox = document.querySelector(".firstColorBox");
  const secondColorBox = document.querySelector(".secondColorBox");
  con.classList.remove("anime");
  //when mouse enters code box
  con.addEventListener("mouseover", () => {
    con.classList.add("copy");
  });
  //when mouse leaves the box
  con.addEventListener("mouseout", () => {
    con.classList.remove("copy");
  });
  //when double click happens
  con.addEventListener("dblclick", function (e) {
    party.confetti(this);
    //saving text on the clipboard
    navigator.clipboard.writeText("background:" + structure + ";");

    con.classList.remove("copy");
    con.classList.add("doneCopy");
    setTimeout(() => {
      con.classList.remove("doneCopy");
    }, 2000);
  });
  firstColorBox.style.backgroundColor = `${
    status === true ? values.secondColor : values.firstColor
  }`;
  secondColorBox.style.backgroundColor = `${
    status === true ? values.firstColor : values.secondColor
  }`;
}

//when a button on keyboard clicked
document.addEventListener("keyup", (event) => {
  //if the button is space
  if (event.keyCode === 32) {
    setting_page.style.display = "flex";
    values.firstColor = color();
    values.secondColor = color();
    //set the settings
    setConfig();
  }
});

//setting options
radialButton.addEventListener("click", () => {
  values.type = "radial";
  setConfig();
});
linearButton.addEventListener("click", () => {
  values.type = "linear";
  setConfig();
});
reverseButton.addEventListener("click", () => {
  reverse = !reverse;
  setConfig(reverse);
});

//switch between directions
for (let direction in dir) {
  dir[direction].addEventListener("click", () => {
    values.direction = direction.split("_").join(" ");
    setConfig();
  });
}
