//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//
//
//
//radians = (Math.PI/180) * degrees.
let likeCircle = false; //true 調整文字的轉向(輪盤上的文字)
let datas = [
  "1800",
  "3000",
  "4000",
  "6000",
  "1000",
  "再接再厲",
  "777",
  "776",
  "775",
  "774",
  "773",
]; //資料

let sectionR = document.querySelector(".section_roulette");
let textArea = document.querySelector(".textArea");
let rollBtn = document.querySelector(".component > .img > img");
let playArea = document.querySelector(".playArea");
let rouletteArea = document.querySelector("#rouletteArea");
let rouletteBG = document.querySelector("section.section1");
let canvas = document.querySelector("#roulette");
let closeBtn = document.querySelector(".close > span");
let rouletteImg = document.querySelector(".playArea .background");

let segmentNum = datas.length;
let target = Math.floor(Math.random() * Math.floor(segmentNum));
let diff = 0.93;
let degree = Math.ceil(360 / segmentNum);
let targetDegree = Math.floor(target * degree + degree / 2);

let cneterX = undefined;
let centerY = undefined;
let radius = undefined;
let smallRadis = undefined;

function createText(text, x, y, d) {
  let span = document.createElement("span");
  textArea.appendChild(span);
  span.classList.add("rouletteText");

  span.innerText = text;
  span.style.transform = ` translate(${x - span.offsetWidth / 2}px, ${
    y - span.offsetHeight / 2
  }px) ${likeCircle ? `rotate(${90 - d}deg)` : `rotate(${-d}deg)`}`;
}

function draw() {
  sectionR.style.height = `${Math.max(
    playArea.offsetHeight,
    window.innerWidth
  )}px`;

  canvas.width = rouletteArea.offsetWidth;
  canvas.height = rouletteArea.offsetHeight;
  cneterX = canvas.width / 2;
  centerY = canvas.height / 2;
  radius = Math.min(canvas.width, canvas.height) / 2;
  smallRadis = Math.ceil(radius * diff);
  textArea.innerHTML = "";

  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = "rgb(222, 182, 116)";
    ctx.arc(cneterX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "rgb(254, 250, 235)";
    ctx.arc(cneterX, centerY, smallRadis, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    for (let i = 0; i < segmentNum; i++) {
      ctx.moveTo(cneterX, centerY);

      let x = cneterX + smallRadis * Math.cos((Math.PI * i * degree) / 180);
      let y = centerY + smallRadis * Math.sin((Math.PI * i * degree) / 180);
      ctx.lineTo(x, y);

      //cal text
      let textDegree = Math.floor(i * degree + degree / 2);
      let textR = Math.ceil(smallRadis * 0.8);

      let textX = cneterX + textR * Math.cos((Math.PI * textDegree) / 180);
      let textY = centerY + textR * Math.sin((Math.PI * textDegree) / 180);

      let textX_relative = textX - cneterX;
      let textY_relative = centerY - textY;

      console.log(textX_relative, textY_relative, textDegree);
      createText(datas[i], textX_relative, textY_relative, textDegree);
    }
    ctx.stroke();
  }
}
document.querySelector("#reload").addEventListener("click", () => {
  window.location.reload();
});
closeBtn.addEventListener("click", () => {
  window.location.reload();
});

window.onresize = () => {
  draw();
};
setTimeout(() => {
  draw();
}, 100);

let nowRoll = false;
rollBtn.addEventListener("click", () => {
  if (nowRoll) return;

  console.log("click");
  nowRoll = true;

  let basicDis = targetDegree - 90;
  rouletteArea.style.transform = `rotate(${basicDis + 360 * 2}deg)`;
  setTimeout(() => {
    nowRoll = false;

    document.querySelector("#postResult").innerHTML = `${
      parseInt(datas[target]) ? "購物金" : ""
    }`;
    document.querySelector("#result").innerHTML = `${
      parseInt(datas[target]) ? `$${datas[target]}` : datas[target]
    }`;
    $("#resultModal").modal("show");
  }, 3000);
});
