import { useState, useRef } from 'react';

const Register = () => {
  const [input, setInput] = useState({
    name: '',
    birth: '',
    job: '',
  });

  const countRef = useRef(0);

  // vue의 ref와도 비슷하군
  const inputRef = useRef();
  // state의 변화로 인해 리렌더링이 되도 내부적으로 reset이 되지 않게 설계됨

  const onChangeInput = (event) => {
    countRef.current++;
    console.log(countRef.current);
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = () => {
    if (input.name === '') {
      // 이름을 입력하는 DOM 요소 focus
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        name="name"
        value={input.name}
        onChange={onChangeInput}
        placeholder={'이름'}
      ></input>

      <div>
        <input
          name="birth"
          value={input.birth}
          type="date"
          onChange={onChangeInput}
        />
      </div>

      <div>
        <select name="job" value={input.job} onChange={onChangeInput}>
          <option>전사</option>
          <option>도적</option>
          <option>궁사</option>
          <option>마법사</option>
        </select>

        <button onClick={onSubmit}>제출</button>
      </div>
    </div>
  );
};

export default Register;
