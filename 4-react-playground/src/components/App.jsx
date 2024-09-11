import '../App.css';
import './Header';
// vite는 확장자 안 써도됨
import Register from './Register';
import { Exam, HookExam } from './HookExam';
import { useState, useEffect, useRef, useCallback, createContext } from 'react';

// props나 부모 컴포넌트가 바뀌면 리렌더링
// => 관련이 없다면 state를 몰아넣지 말고 분리해서 불필요한 리렌더링 방지
// 파일로 분리하는건 생략하겠음

const Bulb = ({ light }) => {
  return (
    <div>
      {light === 'ON' ? (
        <h1
          style={{
            backgroundColor: 'orange',
          }}
        >
          ON
        </h1>
      ) : (
        <h1
          style={{
            backgroundColor: 'grey',
          }}
        >
          OFF
        </h1>
      )}
    </div>
  );
};

const LightButton = () => {
  const [light, setLight] = useState('OFF');

  return (
    <>
      <Bulb light={light}></Bulb>
      <button
        onClick={() => {
          setLight(light === 'ON' ? 'OFF' : 'ON');
        }}
      >
        {light === 'ON' ? 'OFF' : 'ON'}
      </button>
    </>
  );
};

const Counter = () => {
  // const state = useState()
  //  console.log(state); --> state[0]: state의 값, state[1]: 상태 변화함수

  // 따라서 구조 분해하는게 일반적임!
  const [count, setCount] = useState(0);

  // 배열의 값이 들어가게 되면 첫번째 인수의 콜백 함수 실행
  useEffect(() => {
    console.log(count);
  }, [count]);

  // unMount
  useEffect(() => {
    // 클린업, 정리함수
    return () => {
      console.log('unMount');
    };
  }, []);

  return (
    <div>
      <h1>{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
    </div>
  );
};

// 일반적으로 context는 컴포넌트 외부에 선언 - 리렌더링으로 인한 중복 생성 방지
export const context = createContext();

function App() {
  const isMount = useRef(false);

  // mount - 최초로 컴포넌트가 마운트 될 때 한 번만 호출
  useEffect(() => {
    console.log('mount');
  }, []);

  // update - 두 번째 인수를 생략. 리렌더링 될 때마다 실행됨
  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    console.log('update');
  });

  // (최적화를 하고 싶은 함수, 종속성 배열)
  // 첫 번째 인수의 함수를 그대로 반환함
  // 의존성 배열의 값이 변경되었을 때 다시 생성하여 최적화 -> 즉 **함수를 메모이제이션**
  const func = useCallback(() => {}, []);

  return (
    <>
      {/* <LightButton></LightButton>
      <Counter></Counter> */}
      {/* <Register></Register> */}
      {/* <HookExam></HookExam> */}
      {/* provider안에 감싸진 모든 컴포넌트들은 context의 데이터를 공급받을 수 있게된다. */}
      <context.Provider value={func}>
        <Exam></Exam>
      </context.Provider>
    </>
  );
}

export default App;
