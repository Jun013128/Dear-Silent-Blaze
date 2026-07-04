const
menu = document.querySelector("#header__nav"),
buttonOpen = document.querySelector("#header__btn-open"),
buttonClose = document.querySelector("#header__btn-close"),
fv = document.querySelector(".fv"),
fvTop = document.querySelector(".fv__top"),
fvBottom = document.querySelector(".fv__bottom");


// ハンバーガーメニュー

buttonOpen.addEventListener("click", () => {
  // モーダルとしてひらく
  menu.showModal();
});
buttonClose.addEventListener("click", () => {
  // メニューをとじる
  menu.close();
});

menu.addEventListener("click", (event) => {
  // dialog本体クリックだけbackdrop扱い
  if (event.target === menu) {
    menu.close();
  }
});

// メニュー内リンクを押したら閉じる
for (const link of menu.querySelectorAll("a[href]")) {
  link.addEventListener("click", () => {
    menu.close();
  });
}

// ファーストビュー

window.addEventListener("load", () => {
  fv.classList.add("is-active");

  /* is-active後にtransitionを削除 */
  setTimeout(() => {
    fvTop.style.transition = "none";
    fvBottom.style.transition = "none";
  }, 1200); /* 画像フェードイン完了後 */
});

window.addEventListener("scroll", () => {
  if (!fv.classList.contains("is-active")) return;

  const scrollY = window.scrollY;
  const fvHeight = fv.offsetHeight;
  const scale = 1 + (scrollY / fvHeight) * 0.1;

  if (scrollY <= fvHeight) {
    fvTop.style.transform = `scale(${scale})`;
    fvBottom.style.transform = `scale(${scale})`;
  }
});