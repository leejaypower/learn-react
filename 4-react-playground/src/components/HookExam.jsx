import { useReducer } from 'react';
import useInput from '../hooks/useInput';

const HookExam = () => {
  const [input, onChange] = useInput();

  return (
    <div>
      <input value={input} onChange={onChange} />
    </div>
  );
};

// reducer - 상태를 실제로 변화시키는 변환기
// 첫 인수: useReducer를 호출할 때 초기값을 준 상태값, 두번째 인수: 액션 객체
function reducer(state, { type, data }) {
  switch (type) {
    case 'INCREASE':
      return state + data;
    case 'MINUS':
      return state - data;
    default:
      return state;
  }
}

const Exam = () => {
  // dispatch - 상태 변화가 있어야 한다는 사실을 알리는, 발송하는 함수
  const [state, dispatch] = useReducer(reducer, 0);

  const onClickPlus = () => {
    // dispatch의 인수 : 상태가 어떻게 변화되길 원하는지 - 액션 객체
    dispatch({
      type: 'INCREASE',
      data: 1,
    });
  };

  const onClickMinus = () => {
    dispatch({
      type: 'MINUS',
      data: 1,
    });
  };

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
};

export { HookExam, Exam };
