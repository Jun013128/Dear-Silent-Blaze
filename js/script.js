const
menu = document.querySelector("#header__nav"),
buttonOpen = document.querySelector("#header__btn-open"),
buttonClose = document.querySelector("#header__btn-close");



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