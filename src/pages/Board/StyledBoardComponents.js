import styled from 'styled-components';

export const PannelButton = styled.button`
  background-color:${(props) => props.theme.cellBackgroundRevealed};
  color: black;
  padding: 8px 10px ;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  user-select: none;
`;



export const BoardWrapper = styled.div`    
    color: white;
    text-align: center;
    font-size: 35px;
  
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  color: white;
`;

export const ResetBoard = styled.button`
    background-color:${(props) => props.theme.cellBackgroundRevealed};
    color: black;
    padding: 3px ;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
`;

export const TopPanel = styled.div`
    box-sizing: border-box;
    border-top: 2px solid #ffffff;
    border-left: 2px solid #ffffff;
    border-bottom: 2px solid #7b7b7b;
    border-right: 2px solid #7b7b7b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-radius: 5px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background-color: ${(props) => props.theme.secondaryBackground};
`;

export const ScoreBoard = styled.div`
    background-color: #000000;
    color: #ff0000;
    width: 2rem;
    border: 3px solid #777777;    
    padding: 5px 10px;
    font-size: 1rem;
    border-radius: 5px;
    text-align: center;
    box-shadow: inset 0 0 5px #333333;
    font-family: "Press Start 2P", cursive;
    font-weight: bold;
`;

export const TopPanelCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 0 20px;
`;

export const Grid = styled.div`
    align-self: center;
    justify-self: center;
    margin-top: 150px;
    margin: 80px 15 px 15px 15px;
    border-top: 8px solid ${(props) => props.theme.cellBackgroundRevealed}; /* Light border for top and left */
    border-left: 8px solid ${(props) => props.theme.cellBackgroundRevealed};
    border-bottom: 8px solid${(props) => props.theme.secondaryBackground}; /* Darker border for bottom and right */
    border-right: 8px solid${(props) => props.theme.secondaryBackground};
    overflow: auto;
`;

export const Emoji = styled.span`
    background-color:${(props) => props.theme.cellBackgroundRevealed};
    font-size: 1.3rem; 
`;

export const GameWrapper = styled.div`
    display: flex;
    height:calc(100vh - 80px);
    justify-content: center;

`;