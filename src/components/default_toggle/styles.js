import styled from 'styled-components';

export const SwitchLabel = styled.span`
  margin-right: 10px;
`;

export const SwitchInput = styled.input.attrs({ type: 'checkbox' })`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  margin-right: 10px;
  background-color: #d8d8d8;
  border-radius: 12px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:checked {
    background-color: #5cb85c;
  }

  &:focus {
    outline: none;
  }

  &:before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #fff;
    transition: transform 0.3s ease;
  }

  &:checked:before {
    transform: translateX(24px);
  }
`;

export const SwitchSlider = styled.span`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  transition: transform 0.3s ease;

  &:before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #d8d8d8;
    transition: background-color 0.3s ease;
  }

  &:checked:before {
    background-color: #5cb85c;
  }

  &:focus {
    outline: none;
  }
`;

export const SwitchWrapper = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
`;
