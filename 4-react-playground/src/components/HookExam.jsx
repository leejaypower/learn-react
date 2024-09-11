import { useReducer, useMemo, useCallback, useContext } from 'react';
import useInput from '../hooks/useInput';
import { context } from './App';

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
  // 인수로 주어진 context로부터 공급된 데이터를 반환해주는 useContext
  const data = useContext(context);

  // dispatch - 상태 변화가 있어야 한다는 사실을 알리는, 발송하는 함수
  const [state, dispatch] = useReducer(reducer, 0);

  const onClickPlus = useCallback(() => {
    // dispatch의 인수 : 상태가 어떻게 변화되길 원하는지 - 액션 객체
    dispatch({
      type: 'INCREASE',
      data: 1,
    });
  }, []);

  const onClickMinus = useCallback(() => {
    dispatch({
      type: 'MINUS',
      data: 1,
    });
  }, []);

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
};

const Exam2 = () => {
  // 최초로 컴포넌트가 렌더링될 때 실행. 이후에는 의존성 배열이 변경되었을 때 콜백 함수 실행
  // 콜백 함수가 반환하는 값을 그대로 반환
  const a = useMemo(() => {
    return 1;
  }, []);

  // 두 번째 인수로 전달한 deps를 기준으로 메모이제이션
};

export { HookExam, Exam };
