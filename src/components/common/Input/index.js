import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PersonalInput = styled.input`
background-color: ${({ theme }) => theme.colors.mainBg};
color: #fff;
width: 100%;
margin: 8px 0px;
padding: 8px 4px;
border: 1px solid ${({ theme }) => theme.colors.primary};
border-radius: 4px;
`;

const Input = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    name, placeholder, value, onChange,
  } = props;

  return (
    <PersonalInput
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
};

Input.propTypes = {
  value: '',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
