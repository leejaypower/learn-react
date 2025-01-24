### 0(Zero)는 JSX에서 유효한 값
  - 자바스크립트에서 0은 falsy한 값이지만 JSX에서는 0이 렌더링될 수 있다.
  - 예를 들어 조건부 렌더링을 할 때 `array.length` 를 판단 조건으로 한다면 0이 출력될 수 있기에 주의!
  - 더 명확하게 `array.length > 0` 등으로 작성하자.

### 리스트 내부에서의 key
  - 리액트에서는 가상돔을 활용하기 때문에, 수많은 아이템들이 렌더링 될 때에는 렌더링 대상의 구분을 위해 고유한 키 값을 사용해야한다.
  - 특히나 **추가/수정/삭제**가 이루어질 때의 아이디 값은 더 중요하다.
  - **유니크 값을 생성하는 시점을 **렌더링** 하는 시점으로 잡으면 절대 안된다!** 불필요한 렌더링이 계속 발생할 가능성이 있다.

    ```jsx
    // key를 넣자
    <ul>
      {list.map((item, index) => (
        <li key={?}>{item}</li>
      ))}
    </ul>
    ```


    ```jsx
    // 리액트 컴포넌트는 props, setState 등 다양한 변화를 감지해서 여러번 렌더링을 하는데, 렌더링될 때마다 고유의 값을 계속해서 찍어내게 되기 때문에 좋지 않다!!
    <ul>
      {list.map((item, index) => (
        <li key={new Date().toString()}>{item}</li>
      ))}
    </ul>
    ```

    ```jsx
    // 이 경우 클릭했을 때 동일한 아이디 보장되지 않음
    <ul>
      {list.map((item, index) => (
        <li key={uuidv4()} onClick={() => handleDelete(uuidv4())}>{item}</li>
      ))}
    </ul>
    ```

    ```jsx
    // item의 id 값을 넣자 (서버에서 받는 고유한 값 or 컴포넌트 내에서 해당 아이템에 대한 id 부여)
    // 클라에서 id값을 넣을 때는... symbol 혹은 crypto 활용하면 좋을 것 같다
    <ul>
      {l ist.map((item, index) => (
        <li key={item.id} onClick={() => handleDelete(item.id)}>{item}</li>
      ))}
    </ul>
    ```

 ### 안전하게 Raw HTML 다루기
    1. 렌더링 될 데이터
    2. 유저가 다시 한 번 입력모드로 수정할 수 있는 데이터 - input, textarea

    ```jsx
    const SERVER_DATA = '<p>some raw html</p>'
    const markup = {__html: SERVER.DATA};

    // XSS에 매우 취약한 큰일나는 코드 
    return <div>{markup}</div>

    // 좀 더 안전해졌다..하지만 수정의 경우는?
    return <div dangerouslySetInnerHTML={markup}></div>
    ```
    
    ```jsx
    // DOMPurify 사용
    const sanitizeContent = {__html: DOMPurify.sanitize(SERVER.DATA)};
    setContentHTML(DOMPurify.sanitize(SERVER_DATA))

    <div dangerouslySetInnerHTML={sanitizeContent}></div>
    ```

    HTML sanitizer API도 나와있지만 아직 브라우저 지원이 미비한 상황이다.
