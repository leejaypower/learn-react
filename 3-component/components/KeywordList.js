import React from "react";
import List from "./List.js";
import store from "../src/Store.js";

export default class KeywordList extends React.Component {
  constructor() {
    super();

    this.state = {
      keywordList: [],
    };
  }

  componentDidMount() {
    const keywordList = store.getKeywordList();

    this.setState({
      keywordList,
    });
  }

  render() {
    return (
      <List
        data={this.state.keywordList}
        onClick={this.props.onClick}
        // 리액트 element를 반환하는 함수: render props
        // 조합하는 컴포넌트
        renderItem={(item, index) => {
          return (
            <>
              <span className="number">{index + 1}</span>
              <span>{item.keyword}</span>
            </>
          );
        }}
      ></List>
    );
  }
}
