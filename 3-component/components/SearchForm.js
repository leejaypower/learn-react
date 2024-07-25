import React from "react";

const SearchForm = ({ value, onChange, onSubmit, onReset }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  const handleReset = () => {
    onReset();
  };

  const handleChangeInput = (event) => {
    onChange(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <input
        type="text"
        placeholder="검색어를 입력하든가 말든가~"
        autoFocus
        value={value}
        onChange={handleChangeInput}
      />
      {/* 리액트의 element 변수 */}
      {/* {resetBtn} */}

      {/* 삼항 연산자도 가능 */}
      {value.length > 0 ? (
        <button type="reset" className="btn-reset"></button>
      ) : null}
    </form>
  );
};

export default SearchForm;
