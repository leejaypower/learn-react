import { useState } from 'react';

// ** hook **
// 1. 함수 컴포넌트, 커스텀 훅 내부에서만 호출 가능
// 2. 조건부로 호출될 수 없음
// 3. Custom Hook 을 만들 수 있다!

// 리액트는 'use'가 prefix로 붙는 함수를 custom hook으로 판단해서 에러가 나지 않음
function useInput() {
  // useState와 같은 hook을 사용하는 로직이라면 custom hook으로 분리 가능함
  // --> vue의 composable과 비슷한 개념으로 보임

  const [input, setInput] = useState('');
  const onChange = (event) => {
    setInput(event.target.value);
  };

  return [input, onChange];
}

export default useInput;
