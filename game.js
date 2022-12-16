let spieler = document.querySelector(".player");
spieler.style.left = "0px";
let punkteAnzeige = document.querySelector(".punkte");
let score = 0;
let spielfeld = document.querySelector(".playground");
let timer = new Timer(100);
let timer2 = new Timer(100);
let point = document.querySelector(".fisch");

function steuerung() {
  if (keyboard(39) && parseInt(spieler.style.left) < 500) {
    spieler.style.left = parseInt(spieler.style.left) + 5 + "px";
  }
  if (keyboard(37) && parseInt(spieler.style.left) > 0) {
    spieler.style.left = parseInt(spieler.style.left) - 5 + "px";
  }
}

function algen() {
  if (timer.ready()) {
    let x = Math.random() * 500;
    let h = document.createElement("div");
    h.classList.add("alge");
    h.style.bottom = "0px";
    h.style.right = x + "px";
    spielfeld.appendChild(h);
  }

  let steine = document.querySelectorAll(".alge");
  for (let stein of steine) {
    stein.style.bottom = parseInt(stein.style.bottom) + 5 + "px";

    if (parseInt(stein.style.bottom) > 500) {
      stein.parentNode.removeChild(stein);
    }
  }

  if (anyCollision(spieler, steine)) {
    window.location.replace("gameover.html");

    localStorage.setItem("score", score);

    location.href = "gameover.html";

    return;
  }
}

function fisch() {
  if (timer2.ready()) {
    let x = Math.random() * 500;
    let h = document.createElement("div");
    h.classList.add("fischi");
    h.style.bottom = "0px";
    h.style.right = x + "px";
    spielfeld.appendChild(h);
  }

  let steine = document.querySelectorAll(".fischi");
  for (let stein of steine) {
    stein.style.bottom = parseInt(stein.style.bottom) + 3 + "px";
    if (parseInt(stein.style.bottom) > 500) {
      stein.parentNode.removeChild(stein);
    }
  }
}

function loop() {
  steuerung();

  if (parseInt(spieler.style.left) > 0) {
    score = score + 1;
    punkteAnzeige.textContent = score;
  }

  algen();

  fisch();

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
