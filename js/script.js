const
menu = document.querySelector("#header__nav"),
buttonOpen = document.querySelector("#header__btn-open"),
buttonClose = document.querySelector("#header__btn-close"),
fv = document.querySelector(".fv"),
fvTop = document.querySelector(".fv__top"),
fvBottom = document.querySelector(".fv__bottom"),
mainSlider = document.querySelector("#main-slider"),
filterBtns = document.querySelectorAll(".cat-list__btn"),
menuCategories = document.querySelectorAll("[data-category]");


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

if (fv) {
  window.addEventListener("load", () => {
    fv.classList.add("is-active");

    setTimeout(() => {
      fvTop.style.transition = "none";
      fvBottom.style.transition = "none";
    }, 1200);
  });

  window.addEventListener("scroll", () => {
    if (!fv.classList.contains("is-active")) return;

    const scrollY = window.scrollY;
    const fvHeight = fv.offsetHeight;
    const scale = 1 + (scrollY / fvHeight) * 0.2;

    if (scrollY <= fvHeight) {
      fvTop.style.transform = `scale(${scale})`;
      fvBottom.style.transform = `scale(${scale})`;
    }
  });
}

// アクセススライダー

if (mainSlider) {
  const main = new Splide("#main-slider", {
    type: "fade",
    autoplay: true,
    interval: 6000,
    speed: 2000,
    rewind: true,
    pagination: false,
    arrows: false,
  });

  const thumbnails = new Splide("#thumbnail-slider", {
    perPage: 3,
    pagination: false,
    isNavigation: true,
    arrows: false,
  });

  main.sync(thumbnails);
  main.mount();
  thumbnails.mount();
}

// メニューフィルター

if (filterBtns.length > 0) {

  // 選択中のカテゴリを管理するSet
  const activeFilters = new Set(["all"]);

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      if (filter === "all") {
        // ALLを押したら全部リセット
        activeFilters.clear();
        activeFilters.add("all");
        filterBtns.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
      } else {
        // ALLを外す
        activeFilters.delete("all");
        document.querySelector("[data-filter='all']").classList.remove("is-active");

        // すでに選択中なら外す、そうでなければ追加
        if (activeFilters.has(filter)) {
          activeFilters.delete(filter);
          btn.classList.remove("is-active");
        } else {
          activeFilters.add(filter);
          btn.classList.add("is-active");
        }

        // 何も選ばれていなかったらALLに戻す
        if (activeFilters.size === 0) {
          activeFilters.add("all");
          document.querySelector("[data-filter='all']").classList.add("is-active");
        }
      }

      // 表示・非表示を更新
      menuCategories.forEach(category => {
        if (activeFilters.has("all")) {
          category.hidden = false;
        } else {
          category.hidden = !activeFilters.has(category.dataset.category);
        }
      });
    });
  });

}