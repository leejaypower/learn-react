import '../App.css';
import './Header';
// vite는 확장자 안 써도됨
import Register from './Register';
import HookExam from './HookExam';
import { useState } from 'react';

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
  const [state, setCount] = useState(0);

  return (
    <div>
      <h1>{state}</h1>
      <button
        onClick={() => {
          setCount(state + 1);
        }}
      >
        +
      </button>
    </div>
  );
};

function App() {
  return (
    <>
      {/* <LightButton></LightButton>
      <Counter></Counter> */}
      {/* <Register></Register> */}
      <HookExam></HookExam>
    </>
  );
}

export default App;
