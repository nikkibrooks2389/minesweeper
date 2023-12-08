import React from "react";
import styled, { css } from "styled-components";

export const StyledCell = styled.div`
  width: ${props => props.gridSize};
  height: ${props => props.gridSize};
  border-top: 3px solid ${(props) => props.theme.cellBackgroundRevealed};
  border-left: 3px solid ${(props) => props.theme.cellBackgroundRevealed};
  border-bottom: 3px solid ${(props) => props.theme.secondaryBackground};
  border-right: 3px solid ${(props) => props.theme.secondaryBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
  font-family: "Press Start 2P", cursive;

  ${props => (!props.details.revealed || props.details.flagged) && css`
    background-color: ${props.theme.cellBackgroundUnrevealed};
    box-shadow: ${props.theme.cellBoxShadow}; 
    background-image: ${props.theme.cellBackgroundGradient};
  `}

  ${props => (props.details.revealed && !props.details.flagged) && css`
    color: ${props.details.value === 1
      ? props.theme.cellvalue1
      : props.details.value === 2
        ? props.theme.cellvalue2
        : props.details.value === 3
          ? props.theme.cellvalue3
          : props.theme.cellTextColor};
    background-color: ${props.theme.cellBackgroundRevealed};
    box-shadow: none; 
  `}

  

`;

export const MineImage = styled.img`
  width: 30x; 
  height: 30px;
`;