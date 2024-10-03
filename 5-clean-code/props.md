
- **불필요한 Props 복사 및 연산을 피하자**
  ```javascript
  function CopyProps({value}) {
    // 하위 컴포넌트에서 이 props 값을 조작해야할 경우 복사를 많이 하게 된다.
    const [copyValue] = useState(무거운연산(value)); // 굳이 상태로 만들 필요가 없다.
    const copyValue = 무거운연산(value); // 렌더링될때마다 무거운 연산이 수행됨

    const copyValue = useMemo(() => 무거운연산(value, [value])) // 이럴땐 useMemo를 사용하여 연산을 최적화하는 것이 합리적
    return <div>{copyValue}</div>
  }
  ```

  - **중괄호(Curly Braces) 사용법**
    - 언제 사용할까?
    - jsx 중괄호 안에는 표현식이 들어가기 때문에 className 같이 문자열인 경우 생략 가능
    ```jsx
    <header className="abc"></header>
    ```

  - **shorthand props 사용**
  ```jsx
  // props를 받아서 그대로 내려줄 때 스프레드 연산자를 사용할 수 있다.
  <ChildComponent {...props} />
  ```
  - 주의해야할 점 
    - 코드가 길어지고 유추하기 어려운 props가 많이 내려올 수록 코드를 예측하기 어렵고 유지보수가 어렵다.
    - 고차 컴포넌트인 경우 예측하기 어려운 props를 일반적으로 전달해주는 용도로만 사용하면 괜찮음
    - 불필요한 객체 더미를 넘기는 것보다는 관련없는 props는 발라내서 넘기는게 나을 수도 있다.
    ```javascript
    const { related_props, unrelated_props, ...rest } = props;
    ```


  - **인라인 스타일 주의하기**
    - jsx는 자바스크립트로 html을 표현한다.
    - 이 때 인라인 스타일을 넣어야할때는? jsx이기에 표현식을 넣어야한다.
    - key는 camel 케이스로, 중괄호 안에 넣기 (객체이므로) 
    ```jsx
    <button style={{backgrounColor: 'red', fontSize: '14px'}}>
    ```

- **객체 Props 지양하기**
  ```javascript
  Object.is(
    { hello: 'world' },   // 초기 랜더링
    { hello: 'world' },   // 두번째 랜더링
  )
  ```
 - props에 변화가 없어도 childComponent가 리랜더링될 수 있음
 - 초기 랜더링과 그 이후 랜더링에서 참조값이 달라지기 때문에 불필요한 랜더링을 유발할 수 밖에 없다. 
 - -> 변하지 않는 값일 경우 컴포넌트 외부로 드러내기
 - -> 필요한 값만 객체를 분해해서 props로 내려주기
 - -> 아주 헤비한 연산이거나 너무 잦은 연산이 있을 경우 `useMemo`를 통해 계산된 값을 메모이제이션한다.

- **너무 많은 props를 넘기는 경우**
  - 분리의 대상 ?
    - TanStack Query
    - Form Library
    - 상태 관리자
    - Context API
    - Composition 등도 좋지만... 우선은!
  1. One Depth 분리를 한다.
  2. 확장성을 위한 분리를 위해 도메인 로직을 다른 곳으로 몰아 넣는 시도를 첫번째로 해보자
```jsx
const App = () => {
  return (
    <JoinForm 
      user={user}
      auth={auth}
      location={location}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
      handleCancel={handleCancel}
    />
  )
}

// 아래와 같이 해보자
  return (
    <JoinForm 
      onSubmit={handleSubmit}
      onReset={handleReset}
      onCancel={handleCancel}
    >
      <CheckBoxForm formData={user}>
      <CheckBoxForm formData={auth}>
      <RadioButtonForm formData={location}>
    </JoinForm>
  )
```