### React 컴포넌트
- 모던 웹이 유저에게 기대하는 다양한 상호작용(인터랙션)에 대응하기 위한 구성요소
- React 컴포넌트는 **마크업으로 뿌릴 수 있는 JS 함수**이다.

- **self-closing-tag**
    - 명시적으로 닫는 태그가 필요 없는 태그
    ```jsx
    <Img></Img>
    <Img />
    ```

    - 실수를 방지하기 위해 컴포넌트명은 커스텀 컴포넌트인지 기본 HTML 요소인지 아닌지의 명확한 차이를 가져야한다. (PascalCase vs lower case)
    - 리액트 컴포넌트라면 자식 노드(자식 컴포넌트)같은 그 하위에 HTML 관련된 무언가가 아무것도 존재하지 않는다면 닫는 태그를 위와 같이 생략하자 
    - 즉 자식 요소를 가질 수 없는 `Void Element`에 대해 이해하고, 닫는 태그가 정말 필요한지 파악하자!


- **Fragment 지향하기**
    - Fragment : React v16.2 부터 사용
        - DOM에 별도의 노드를 추가하지 않고 여러 자식을 그룹화할 수 있다
    ```jsx
    return (
        <React.Fragment>
            <ChildA />
            <ChildB />
            <ChildC />
        </React.Fragment>
    );
    ```
    - JSX에서는 단일 요소가 아닌 노드를 반환할 수 없어서 무조건 div와 같은 태그로 감싸서 내보내곤 했다.
    - 이를 보완하기 위한 `React.Fragment`
    - fragment Shortcut
        ```jsx
        return <>Clean Code React</>; // 예시일뿐 이젠 string render도 상관 없어짐
        ```
    - 루프를 돌려서 element를 만들어 key를 바인딩해야하는 경우 fragment에 index 을 넣어줄 수도 있다 (shortcut은 사용 불가)
        ```jsx
        <React.Fragment key={id}>
        </React.Fragement>
        ```

- **Fragment 지양하기**
    - 루트 컴포넌트가 싱글일 경우 굳이 쓰지 않기
    - 아래의 경우를 봐보자
    ```jsx
        return (
            <div>
                <h1>{ isLoggedIn ? 'User' : <></> }</h1> // 굳이 fragment를 반환할 필요 없음
                <h1>{ isLoggedIn ? 'User' : null }</h1> // 명시적으로 null을 반환하거나
                <h1>{ isLoggedIn && 'User' }</h1> 
                { isLoggedIn && <h1>User</h1> } // 이런 식으로 써도 좋다
            </div>
        )
    ```

- **JSX 컴포넌트안에 함수를 반환해서 렌더링하는 경우 지양**
    - 또한 jsx 컴포넌트를 store나 util 함수에 넣는 것 지양
        - scope가 꼬일 수 있다.
        - 반환 값을 명확하게 알기 힘들다.


- **컴포넌트 내부에 컴포넌트 선언 지양**
    ```jsx
    funtion OuterComponent() : Element {
        const InnterComponent = () : Element => {
            return <div>Inner component </div>;
        };

        return (
            <div>
                <InnerComponent />
            </div>
        );
    }
    ```
    - 결합도가 증가한다.
        - 구조적으로 스코프적으로 종속된 개발이 된다.
        - 나중에 확장성이 생겨서 분리될 때 힘들어진다.
        - 상위 컴포넌트 리랜더될 때 하위 컴포넌트가 재생성되는 것 때문에 손해가 생긴다. (성능 저하)

    - 차라리 한 파일 내에 두 개의 컴포넌트(컴포넌트 외부에)를 작성하는게 어떨까? 

- **displayName**

