import React from 'react';

const InputField = ({ label, type, value, onChange, error }) => {
  // ラベルのためのIDを作成
  const id = label.replace(/\s+/g, '').toLowerCase(); 

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default InputField;
