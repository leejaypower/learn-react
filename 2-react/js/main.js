class App extends React.Component {
  // 제어 컴포넌트 (Controlled component)
  constructor() {
    super();

    // 상태 관리를 위한 내부 변수 state
    this.state = {
      searchKeyword: "",
      searchResult: [],
    };
  }

  // 리액트에서 이벤트 처리 함수는 관행적으로 handle로 시작한다
  handleChangeInput(event) {
    // state 변경해도 render 함수가 돌지 않는다.
    // this.state.searchKeyword = event.target.value;
    // 모델 변경 후 view를 강제로 변경하는 것은 역시 권장되지 않는다. - reactive한 특성을 사용하지 않음
    // this.forceUpdate();

    const searchKeyword = event.target.value;

    if (searchKeyword.length <= 0) {
      return this.handleReset();
    }

    this.setState({
      searchKeyword,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event, this.state.searchKeyword);
  }

  handleReset() {
    // 상태 변경을 알리는 약속 -  ** 항상 비동기로 동작 **
    // this.setState({
    //   searchKeyword: "",
    // });

    this.setState(
      () => {
        return { searchKeyword: "" };
      },
      () => {
        console.log("reset", this.state.searchKeyword);
      }
    );
  }

  render() {
    let resetBtn = null;

    // element 변수를 사용한다면 요렇게
    if (this.state.searchKeyword.length > 0) {
      resetBtn = <button type="reset" className="btn-reset"></button>;
    }

    return (
      // 비어있는 태그 - root element처럼 동작하지만 실제 dom에 반영되지 않음
      // - vue의 template tag와 비슷해보임 ?
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          <form
            onSubmit={(event) => this.handleSubmit(event)}
            onReset={() => this.handleReset()}
          >
            <input
              type="text"
              placeholder="검색어를 입력하든가 말든가~"
              autoFocus
              value={this.state.searchKeyword}
              onChange={(event) => this.handleChangeInput(event)}
            />
            {/* 리액트의 element 변수 */}
            {/* {resetBtn} */}

            {/* 삼항 연산자도 가능 */}
            {this.state.searchKeyword.length > 0 ? (
              <button type="reset" className="btn-reset"></button>
            ) : null}
          </form>
          <div className="content">
            {this.state.searchResult.length > 0 ? (
              <div>검색 결과</div>
            ) : (
              <div className="empty-box">검색 결과가 없습니다.</div>
            )}
          </div>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
// jsx 문법 <App />을 주면 render에서 반환하는 react element를 반환한다.
