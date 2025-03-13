### 디렉터리 구조 설계
- 결합도가 높은 컴포넌트를 하는 역할에 따라 분리할 때는 prefix를 붙여 결합도를 나타내자 
  ```
  TodoList 로 묶어버리기

  components/
  - TodoList.jsx
  - TodoListItem.jsx
  - TodoListItemButton.jsx
  ```

- 너무 많은 불필요 depth를 가져가지 말자. flat하게 1 depth 나열이 가능한가 고민해보자


### Primitive UI
  - React에서 `class`를 `className` 등으로 사용해야하거나 하는 특징으로 인해 개발하다보면 웹 표준을 지키거나 챙기기가 어려워질 수 있다.
  - 어떤 기능을 만들게 될 때에도 도메인이 녹아있는 이름으로 컴포넌트 이름을 짓게 된다.
  - 디자인 시스템이나 컴포넌트를 Primitive하게 만들어 확장하기 위해서는 좀 더 **생김새를 묘사**하는게 좋다. - Box, Circle, List, Square

  ```tsx
  // ❌ 도메인 중심 네이밍
  function LoginButton({ onClick }: { onClick: () => void }) {
    return <button onClick={onClick}>로그인</button>;
  }

  // ✅ Primitive한 네이밍
  function Button({ variant, size, children, ...props }: ButtonProps) {
    return (
      <button 
        className={`btn ${variant} ${size}`} 
        {...props}
      >
        {children}
      </button>
    );
  }

  // 사용 예시
  function LoginPage() {
    return <Button variant="primary" size="large">로그인</Button>;
  }
  ```

  - 좀 더 시맨틱한 Primitive UI를 묘사하기 - Radix UI, Chakra UI 참고해보기

    ```tsx
    // 최대한 웹 표준에 익숙하게 만들 수 있는 방법
    interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
      variant?: 'primary' | 'secondary';
      size?: 'small' | 'medium' | 'large';
    }

    function Button({ variant, size, disabled, type = 'button', ...props }: ButtonProps) {
      return (
        <button
          type={type}
          disabled={disabled}
          aria-disabled={disabled}
          {...props}
        />
      );
    }
    ```
