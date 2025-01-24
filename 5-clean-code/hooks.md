### Hooks API는 왜 사용되게 되었을까?

  1. 2018년부터(React 16.8) React 컴포넌트에는 함수형(Class) 컴포넌트 뿐만 아니라 함수형 컴포넌트가 등장하게 되었다.
  2. [항상 `React.Component`를 extends를 해야하고, render 함수를 호출해야하는 무겁고 귀찮은 행위를 해야했고](3-component/components/HistoryList.js), 이런 보일러 플레이트를 항상 작성해야하는지에 대해 고민하게 되었다.
  3. 그러한 배경으로 [`StatelessComponent`](3-component/components/Header.js) 가 만들어졌지만,
  4. state가 있고 없고를 따지면서 컴포넌트를 선언하는 것이 혼란스러웠고, 무엇보다 함수 컴포넌트는 결국 Stateless, Stateful 둘다 될 수 있기 때문에 (함수 내부 구현부가 하는 일이기에) 이에 대해 많은 의견이 오갔다.
      ```jsx
      // 함수형 컴포넌트에 상태를 주입하기 위해 HOC 패턴을 자주 사용했다.
      // 함수형 컴포넌트를 감싸서 상태를 추가하거나 기능을 확장할 수 있기 때문
      function withState(Component) {
        return class extends React.Component {
          state = {
            count: 0,
          };

          increment = () => {
            this.setState((prevState) => ({ count: prevState.count + 1 }));
          };

          render() {
            return (
              <Component
                count={this.state.count}
                increment={this.increment}
                {...this.props}
              />
            );
          }
        };
      }

      function StatelessComponent({ count, increment }) {
        return (
          <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
          </div>
        );
      }

      const StatefulComponent = withState(StatelessComponent);
      ```

      ```jsx
      // render props 패턴을 사용해서 상태 관리 로직을 함수형 컴포넌트에 전달하여 상태 다루는 경우
      class Counter extends React.Component {
        state = {
          count: 0,
        };

        increment = () => {
          this.setState((prevState) => ({ count: prevState.count + 1 }));
        };

        render() {
          return this.props.render({
            count: this.state.count,
            increment: this.increment,
          });
        }
      }

      function StatelessComponent({ count, increment }) {
        return (
          <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
          </div>
        );
      }

      function App() {
        return (
          <Counter
            render={({ count, increment }) => (
              <StatelessComponent count={count} increment={increment} />
            )}
          />
        );
      }
      ```

  5. 많은 의견 공방 끝에 공식적으로 React Hooks 가 등장하게 되었다!



### useEffect() 기명 함수와 함께 사용하기
  - 한 컴포넌트 안에 useEffect가 많아지고,  코드가 복잡해지면 useEffect의 익명 함수 부분을 기명 함수로 바꿔보는 것도 방법이다!
  - 디버깅 할 때도 기명 함수들은 로그에 콜스택으로 쌓여서 파악하기에 유용하다!

    ```jsx
    // 이름을 적어서 이 구현부가 뭘 하는지 나타내기
    useEffect(
      function onInit() {
        if (!isSuccessToGetList) {
          return;
        }
        setActiveItem(initialItem);
      },
      [isSuccessToGetList]
    );

    // 클린업 함수에도 유용하게 쓸 수 있다!
    useEffect(function addEvent() {
      document.addEventListener();
      
      return function removeEvent(){{
        document.removeEventListener
      }}
    }, [])
    ```
