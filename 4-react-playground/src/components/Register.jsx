import { useState } from 'react';

const Register = () => {
  const [input, setInput] = useState({
    name: '',
    birth: '',
    job: '',
  });

  const onChangeInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <input
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
      </div>
    </div>
  );
};

export default Register;
