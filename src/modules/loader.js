export default class Loader {
  constructor(text) {
    this.element = document.createElement("div");
    this.text = text || "Loading Fibonacci";
    this.element.textContent = this.text;
    this.element.classList.add("loader-off");
    document.querySelector(".loader").appendChild(this.element);

    this.activateLoader = this.activateLoader.bind(this);
    this.deactivateLoader = this.deactivateLoader.bind(this);
  }

  activateLoader() {
    this.element.classList.add("loader-on");
  }

  deactivateLoader() {
    this.element.classList.remove("loader-on");
  }
}
