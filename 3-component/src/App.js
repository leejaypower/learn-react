import React from "react";
import Header from "../components/Header.js";
import SearchForm from "../components/SearchForm.js";
import SearchResult from "../components/SearchResult.js";
import KeywordList from "../components/KeywordList.js";
import HistoryList from "../components/HistoryList.js";
import store from "./Store.js";
import Tabs, { TabType } from "../components/Tabs.js";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyword: "",
      searchResult: [],
      submitted: false,
      selectedTab: TabType.KEYWORD,
    };
  }

  search(searchKeyword) {
    const searchResult = store.search(searchKeyword);
    this.setState({
      searchResult,
      submitted: true,
    });
  }

  handleReset() {
    this.setState({
      searchKeyword: "",
      submitted: false,
    });
  }

  handleChangeInput(searchKeyword) {
    if (searchKeyword.length <= 0) {
      this.handleReset();
    }

    this.setState({ searchKeyword });
  }

  render() {
    const { searchKeyword, searchResult, submitted, selectedTab } = this.state;

    return (
      <>
        <Header title="검색" />
        <div className="container">
          <SearchForm
            value={searchKeyword}
            onChange={(value) => this.handleChangeInput(value)}
            onSubmit={() => this.search(searchKeyword)}
            onReset={() => this.handleReset()}
          />

          <div className="content">
            {submitted ? (
              <SearchResult data={searchResult} />
            ) : (
              <>
                <Tabs
                  selectedTab={selectedTab}
                  onChange={(selectedTab) => this.setState({ selectedTab })}
                />
                {selectedTab === TabType.KEYWORD && (
                  <KeywordList
                    onClick={(keyword) => this.search(keyword)}
                  ></KeywordList>
                )}
                {selectedTab === TabType.HISTORY && (
                  <HistoryList
                    onClick={(keyword) => this.search(keyword)}
                  ></HistoryList>
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}
