import styled from "styled-components";

export const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: "Press Start 2P", cursive;
  background-color: ${props => props.theme.secondaryBackground};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-style: dashed; /* Change the border style */
  border-color: #607d8b; /* Gray */ /* Change the border color */
  border-radius: 20px;
`;


export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: ${props => props.theme.textColor};
  text-transform: uppercase;
  letter-spacing: 2px;
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
   font-size: 1.5rem;
}
`;

export const SettingsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
  `