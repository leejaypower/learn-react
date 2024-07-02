import { on, qs } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchFormView]";

export default class SearchFormView extends View {
  constructor() {
    super(qs("#search-form-view"));

    this.inputElement = qs("[type=text]", this.element);
    this.resetElement = qs("[type=reset]", this.element);
    this.showResetBtn(false);
    this.bindEvents();
  }

  showResetBtn(visible = true) {
    this.resetElement.style.display = visible ? "block" : "none";
  }

  bindEvents() {
    on(this.inputElement, "keyup", () => this.handleKeyup());
    on(this.resetElement, "click", () => this.handleReset());
    on(this.element, "submit", (event) => this.handleSubmit(event));
  }

  handleKeyup() {
    console.log(tag, "handleKeyup", this.inputElement.value);
    const { value } = this.inputElement;
    this.showResetBtn(value.length > 0);

    if (value.length <= 0) {
      this.handleReset();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { value } = this.inputElement;
    this.emit("@submit", { value });
  }

  handleReset() {
    // 여기서 일종의 비즈니스 로직(?)이 바로 들어가면 안되지용.. 그리고 맥락에 맞지 않는 함수 사용
    // this.inputElement.value = "";
    // this.handleKeyup();
    this.emit("@reset");
  }
}
