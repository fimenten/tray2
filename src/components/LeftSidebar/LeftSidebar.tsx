import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 50px;
  height: 100vh;
  background-color: #f0f0f0;
  border-right: 1px solid #ccc;
  z-index: 1000;
  padding-top: 10px;
`;

export const HamburgerMenu = styled.div`
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
`;

export const MenuContainer = styled.div<{ visible: boolean }>`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  z-index: 1001;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.visible ? 'block' : 'none')};
  overflow: visible;
`;

export const MenuItem = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f0f0f0;
  }
`;


