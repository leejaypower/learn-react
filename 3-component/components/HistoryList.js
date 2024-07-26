import React from "react";
import List from "./List.js";
import store from "../src/Store.js";

export default class KeywordList extends React.Component {
  constructor() {
    super();

    this.state = {
      historyList: [],
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const historyList = store.getHistoryList();

    this.setState({
      historyList,
    });
  }

  handleClickRemoveHistory(keyword) {
    store.removeHistory(keyword);
    this.fetch();
  }

  render() {
    return (
      <List
        data={this.state.historyList}
        onClick={this.props.onClick}
        hasDate
        onRemove={(keyword) => this.handleClickRemoveHistory(keyword)}
      ></List>
    );
  }
}
