### Hooks API는 왜 사용되게 되었을까?

  1. 2018년부터(React 16.8) React 컴포넌트에는 함수형(Class) 컴포넌트 뿐만 아니라 함수형 컴포넌트가 등장하게 되었다.
  2. [항상 `React.Component`를 extends를 해야하고, render 함수를 호출해야하는 무겁고 귀찮은 행위를 해야했고](../3-component/components/HistoryList.js), 이런 보일러 플레이트를 항상 작성해야하는지에 대해 고민하게 되었다.
  3. 그러한 배경으로 [`StatelessComponent`](../3-component/components/Header.js) 가 만들어졌지만,
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

### 한 가지 역할만 수행하는 useEffect 
- 한 번에 하나의 역할만 수행하는 단일 책임의 원칙
- 종속성 배열에 너무 많은 관찰 대상이 들어가고 있는게 아닌지 항상 고민하기
  ```jsx
    function LoginPage({token, newPath}) {
      // 🚨 위험한 로직
      useEffect(() => {
        // prevPath를 useRef로 저장해놓는다고 가정
        if (prevPath !== newPath) {
          redirect(newPath);
        }

        if (preToken !== token){
          const userInfo = setLogin(token)
          // ...로그인 로직
        }
      }, [token, newPath])
      
    }
  ```

    ```jsx
    function LoginPage({token, newPath}) {
      // 분리하는걸 두려워하지 말자. 정확히 의존성 분리!
      useEffect(() => {
        redirect(newPath);
      }, [newPath])

      useEffect(() => {
        const userInfo = setLogin(token)
        // ...로그인 로직

        if(options){
          // 부가적인 로직
        }
      }, [token, options])
    }
  ```

### useEffect() 내부의 비동기
  - `async` `await`은 useEffect에서 사용할 수가 없다.
  - `useEffect`의 콜백 함수는 클린업 함수 혹은 undefined를 반환
  - `async/await`, `promise` 들은 promise 를 반환하기 때문에 예상치 못하는 코드가 실행될 수 있다.
  - fetchData가 실행되는 동안 컴포넌트가 언마운트되면 응답을 받아도 상태를 업데이트하면 안되는데 실행되는 등
    ```jsx
    // 불가
    useEffect(async () => {
      const result = await fetchData();
    }, []) 
    ```
  - **리액트에서 통신 로직 및 상태는 `tanstackQuery`를 통해서 관리하는 것이 권장됨.** 하지만 써야한다면...
    ```jsx
    useEffect(() => {
      let isMounted = true; // cleanup을 위한 플래그

      // 내부에서 async/await을 호출, 혹은 즉시 실행 함수를 따로 만들어서 호출
      // useEffect 자체는 동기적으로 실행되도록
      const fetchData = async () => {
        const result = await someFetch();
      }
      fetchData();

      return () => {
        isMounted = false; // 컴포넌트 언마운트 시 상태 업데이트 방지
      };
    }, [dependency]) 
    ```
