// src/components/ContextMenu/ContextMenuStyles.ts
import styled from 'styled-components';

export const MenuWrapper = styled.div`
  position: fixed;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const MenuItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;