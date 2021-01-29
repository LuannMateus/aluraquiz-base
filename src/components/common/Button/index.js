import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PersonalButton = styled.button`
    background-color: ${({ theme }) => theme.colors.mainBg};
    color: ${({ theme }) => theme.colors.contrastText};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    width: 100%;
    padding: 8px 0px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
    margin-top: 16px;

    cursor: pointer;

    transition: .3s

    &:hover,
    &:focus {
      opacity: .5;
    }
    &:disabled {
      background-color: #979797;
      border: none;
      cursor: not-allowed;
    }
`;

const Button = (props) => {
  const { type, disabled, children } = props;

  return (
    <PersonalButton type={type} disabled={disabled}>
      {children}
    </PersonalButton>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Button;
