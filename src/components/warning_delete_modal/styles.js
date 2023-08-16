import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: red;
  border-radius: 100px;
  box-shadow: rgba(255, 0, 0, .2) 0 -25px 18px -14px inset, rgba(255, 0, 0, .15) 0 1px 2px, rgba(255, 0, 0, .15) 0 2px 4px, rgba(255, 0, 0, .15) 0 4px 8px, rgba(255, 0, 0, .15) 0 8px 16px, rgba(255, 0, 0, .15) 0 16px 32px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  /* Apply width and height if provided, otherwise use default values */
  height: ${props => props.height ? props.height : '50px'};
  width: ${props => props.width ? props.width : '150px'};

  font-weight: 600;
  margin-right: 32px;

  :hover {
    box-shadow: rgba(255, 0, 0, 0.35) 0 -25px 18px -14px inset, rgba(255, 0, 0, 0.25) 0 1px 2px, rgba(255, 0, 0, 0.25) 0 2px 4px, rgba(255, 0, 0, 0.25) 0 4px 8px, rgba(255, 0, 0, 0.25) 0 8px 16px, rgba(255, 0, 0, 0.25) 0 16px 32px;
    transform: scale(1.02);
  }    
`;
