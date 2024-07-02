const tag = "[Controller]";

export default class Controller {
  constructor(store, { SearchFormView }) {
    console.log(tag);
    console.log(SearchFormView);

    this.store = store;

    this.searchFormView = SearchFormView;

    this.subscribeViewEvents();
  }

  subscribeViewEvents() {
    this.searchFormView
      .on("@submit", (event) => this.search(event.detail.value))
      .on("@reset", () => this.reset());
  }

  search(keyword) {
    console.log(tag, keyword);
  }

  reset() {
    console.log(tag, "reset");
  }
}
