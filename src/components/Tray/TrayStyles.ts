import styled from 'styled-components';



export const MeltTray = styled.div`
border-left: 1px solid #ccc;
margin: 0px;
padding: 0px;
width: 100%;
`;

export const TrayWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  background-color: #e0e0e0;
  cursor: move;
  /* border-top: 3px solid white; White border between trays */
  border-left: 3px solid white; /* White border between trays */
  border-bottom: 3px solid white; /* White border between trays */

  overflow: hidden;
  transition: order 0.3s;
  position: relative;
  box-sizing: border-box;
  margin: 0px;
`;


export const TrayTitleContainer = styled.div`
  display: flex;
  flex: 1;
  min-width: 50%;
  width: 100px;
  word-wrap: break-word;
  white-space: normal;
  /* font-weight: bold; */
  outline: none;
  cursor: text;
  color: var(--title-color);
  line-height: 1.2;
  overflow: hidden;
  transition: max-height 0.3s ease;
  font-size: 1em;
  /* font-weight: bolder; */
  align-items: center;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  /* padding: 5px 10px; */
  box-sizing: border-box;
  min-height: 30px;
  transition: min-height 0.3s ease;

`;

export const TrayInformationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: right;
`


export const TrayFoldButton = styled.button`
  cursor: pointer;
  background: none;
  border: 0px;
`;

export const TrayTitle = styled.div<{ isEditing: boolean }>`
  flex: 1;
  min-width: 50%;
  width: 100px;
  word-wrap: break-word;
  white-space: normal;
  font-weight: bolder;
  outline: none;
  cursor: text;
  color: var(--title-color);
  line-height: 1.2;
  overflow: hidden;
  background-color: ${(props) => (props.isEditing ? 'white' : 'transparent')};
  padding-left: 10px;
  /* font-style: italic; Makes the text inside italic */
  font-family: Arial;
  :hover {
    text-decoration: underline;
  }

  :empty::before {
    content: "Untitled";
    font-style: italic;
  }

  :focus {
    max-height: none;
  }
`;





interface TrayContentProps {
  flexDirection: 'row' | 'column';
}

export const TrayContent = styled.div<TrayContentProps>`
  margin-left: 0px;
  border-color: #000;

  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  /* padding-left: 1px; */
  padding-top: 10px;
  /* padding-right: 0px; */
  padding-bottom: 10px;
  background-color: white; /* White background for padding area */
  
  /* Inner wrapper for the actual content */
  & > div {
    background-color: #e0e0e0; /* Tray content background color */
    flex: 1;
  }
`;


export const TouchArea = styled.div`
  display: block;
`