import h, { mount } from "./core";
import Banner from "./companents/Banner";
import "./assets/styles/base.css";
import "./assets/styles/home.css";

const content = h("div", { className: "app" }, [
  h("section", { className: "home" }, [
    // h("div", { className: "banner" }, [
    //   h("h1", { className: "banner__title" }, ["Lorem ipsum"]),
    //   h("button", { className: "btn banner__btn" }, ["Check"])
    // ])
  ]),
  createVElement("section", { className: "new" }, [
    h("div", { className: "new__header" }, [
      h("h1", { className: "headline" }, ["New"]),
      h("p", { className: "helper" }, [
        "You’ve never seen it before!"
      ]),
      h("button", { className: "btn btn--flat" }, ["View all"])
    ]),
    h("div", { className: "new__content" }, [
      h("div", { className: "card card--y" }),
      h("span", { className: "card__caption helper" }, [
        "Dorothy Perkins"
      ]),
      h("span", { className: "card__title subheads" }, [
        "Evening Dress"
      ])
    ])
  ]),
  h("nav", { className: "bottom-nav" }, [
    h("button", { className: "btn bottom-nav__btn btn--flat" }, [
      h("img", { src: "./images/icons/home.svg" }),
      h("span", {}, ["Home"])
    ]),
    h("button", { className: "btn bottom-nav__btn btn--flat" }, [
      h("img", { src: "./images/icons/shop.svg" }),
      h("span", {}, ["Shop"])
    ]),
    h("button", { className: "btn bottom-nav__btn btn--flat" }, [
      h("img", { src: "./images/icons/basket.svg" }),
      h("span", {}, ["Bag"])
    ]),
    h("button", { className: "btn bottom-nav__btn btn--flat" }, [
      h("img", { src: "./images/icons/heart.svg" }),
      h("span", {}, ["Favorites"])
    ]),
    h("button", { className: "btn bottom-nav__btn btn--flat" }, [
      h("img", { src: "./images/icons/profile.svg" }),
      h("span", {}, ["Profile"])
    ])
  ])
]);






mount(content, document.getElementById('root'));