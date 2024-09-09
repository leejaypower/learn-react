import { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [job, setJob] = useState('');

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeBirth = (event) => {
    setBirth(event.target.value);
  };

  const onChangeJob = (event) => {
    setJob(event.target.value);
  };

  return (
    <div>
      <input value={name} onChange={onChangeName} placeholder={'이름'}></input>

      <div>
        <input value={birth} type="date" onChange={onChangeBirth} />
      </div>

      <div>
        <select value={job} onChange={onChangeJob}>
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
