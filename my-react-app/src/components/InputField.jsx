import React from 'react';

const InputField = ({ label, type, value, onChange, error }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
      />
    {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default InputField;
