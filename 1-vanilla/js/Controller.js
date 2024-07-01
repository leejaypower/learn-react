const tag = "[Controller]";

export default class Controller {
  constructor(store, { SearchFormView }) {
    console.log(tag);
    console.log(SearchFormView);

    this.store = store;

    this.SearchFormView = SearchFormView;

    // TODO
  }
}
