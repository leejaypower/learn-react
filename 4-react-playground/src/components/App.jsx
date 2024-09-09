import '../App.css';
import './Header';
// vite는 확장자 안 써도됨
import { useState } from 'react';

function App() {
  // const state = useState()
  //  console.log(state); --> state[0]: state의 값, state[1]: 상태 변화함수

  // 따라서 구조 분행하는게 일반적임!
  const [state, setCount] = useState(0);
  const [light, setLight] = useState('OFF');

  return (
    <>
      <div>
        <h1>{light}</h1>
        <button
          onClick={() => {
            setLight(light === 'ON' ? 'OFF' : 'ON');
          }}
        >
          {light === 'ON' ? 'OFF' : 'ON'}
        </button>
      </div>
      <h1>{state}</h1>
      <button
        onClick={() => {
          setCount(state + 1);
        }}
      >
        +
      </button>
    </>
  );
}

export default App;
