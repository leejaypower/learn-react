- **올바른 상태 초기값을 설정하자**
  ```javascript
  const [state, setState] = useState(); // warning!
  ```
   - 초기에 렌더링 되는 값 : 가장 먼저 순간적으로 보여질 수도 있는 값
   - 렌더링 이슈, 무한 루프, 타입 불일치로 의도치 않는 동작 -> 런타임 에러
   - 넣지 않으면 undefined, 상태값 초기화에도 실수가 나올 수 있다.

- **업데이트 되지 않는 일반 객체라면 컴포넌트 외부로 추출하자**
  ```javascript
  export const component = () => {
    const INFO = {
      a: 'a',
      b: 'b'
    };

    return <MyComp info={INFO}></MyComp>
  }
  ```
  - 위처럼 일반적으로 상수를 다루는 경우 매번 렌더링될 때마다 같은 값이더라도 불필요하게 참조하고 갖고 있음
  - 컴포넌트 내부에 변수를 만들 때는 렌더링마다 고유의 값을 가질 수도 있는 값인지 아닌지를 판단하기 (vue의 computed 처럼 렌더링마다 재계산되는지)
  - 업데이트 되지 않는 일반 값을 다룬다면 상태로 바꾸거나(필요시 판단), 외부로 추출하는 것이 좋음

- **플래그 상태로 바꾸기**
  ```javascript
  function FlagState() : Element {
    const isLogin = hasToken
    && hasCookie
    && isValidCookie
    && !isNewUser
    && isValidToken
    && 추가적인 요구사항

    return <div>{isLogin && '안녕하세요!'}</div>
  }
  ```
  - 굳이 상태를 만들 필요가 없어보일 때는 useState()를 만들지 말고 컴포넌트 내부의 변수를 활용하자

- **리렌더링 방지가 필요하다면 useState 대신 useRef**
  - 컴포넌트의 전체적인 수명과 동일하게 지속된 정보를 일관적으로 제공해야하는 경우
  - 예를 들어 isMount와 같이 mount 여부를 확인하는 변수를 만들때 useEffect와 함께 useRef를 사용하자
  - useRef 가 DOM에만 붙일 수 있는 api가 아니다! 불필요한 렌더링 방지에 효과적임


- **연관된 상태 단순화하기**
  - `Keep IT Simple Stupid`
  - 상태를 만들 때 연관된 것들끼리 묶어서 처리하면 에러를 방지하고 코드가 간결해진다.
  - 열거형 데이터로 만들어보기
  ```javascript
  const [promiseState, setPromiseState] = useState<
    'loading', 'finish', 'error'
  >('pending')
  ```
  - 연관된 상태를 객체로 묶기 - 하나의 상태를 무조건 하나의 useState로 만들 필요는 없다.
  ```javascript
  const [fetchState, setFetchState] = useState({
    isLoading: false,
    isFinish: false,
    isError: false,
  })
  ```
- **useState 대신 useReducer가 필요한 경우**
  - 상태를 구조화할 필요가 있을 때, 상태를 세밀하게 조작할 때
  ```javascript
  const [state, dispatch] = useReducer(reducer, INIT_STATE)
  
  const reducer = (state, action) => {
    // reducer 안에서는 switch문 사용을 추천
    switch (action.type) {
      case 'FETCH_LOADING':

       // reducer를 사용할 때는 이전 상태값에 대한 보장이 없을 수도 있을까? 그래서 상태 값을 하나 하나 지정하는게 더 나을수도
       // return {...state, isLoading: true }
      return { isLoading: true, isSuccess: false, isFail: false }

      case 'FETCH_SUCCESS':
        return {...state, isSuccess: true }

      case 'FETCH_FAIL':
        return {...state, isFail: true }

      default:
        return INIT_STATE
        break;
    }
  }

  ///
  dispatch({type: 'FETCH_LOADING'})
  ```
  - react에 의존적인 코드가 아니라서 여러 곳에서 재사용 가능하다는 장점
  - 내부 로직이 추상화되고 호출부에서 추론 가능
  - 서드파티 없이 상태 관리할 때도 유용


- **상태로직 Custom Hooks로 뽑아내기**
  - vue3의 composable과 비슷한 개념
  - 필요에 따라 코드를 확장성 있고 재사용 가능하게 작성하기
  - 호출부에서는 내부 로직을 모른 채로 추상화
  - custom hook에서 return 할 때는 반드시 튜플 형태([state, dispatch])로 내보낼 필요는 없다. 객체 등 필요한 형태로 내보내자.

- **이전상태 활용하기**
  - prev state 사용을 권장
  ```javascript
  const [age, setAge] = useState(0);

  setAge(age + 1); // 보다는
  setAge((prevAge) => prevAge + 1); // 이렇게
  ```
  - setState 자체가 비동기적 업데이트를 거칠 수 있기 때문에 다음 상태 값을 계산할 때 state 값에 의존해서는 안된다.
  - `updater function`을 callback에 넣는 방법을 통해 예상치 못한 결과 발생(타이밍 이슈)을 방지한다.
  - 같은 맥락으로 같은 상태를 다른 handler에서 바라볼 경우애도 사이드 이펙트가 생길 가능성이 높다. 
    - 기대한 값의 이전 값을 사용할 수도 있기 때문. 이미 업데이트된 확실한 현재 값을 사용하려면 위와 같은 패턴으로 작성하는 것이 좋다.
  