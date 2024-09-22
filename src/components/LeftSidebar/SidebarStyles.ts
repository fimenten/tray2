import { css } from '@emotion/react';

export const sidebarStyles = css`
  .left-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 50px;
    height: 100vh;
    background-color: #f0f0f0;
    border-right: 1px solid #ccc;
    z-index: 1000;
    padding-top: 10px;
  }

  .hamburger-menu {
    padding: 10px;
    font-size: 24px;
    cursor: pointer;
    text-align: center;
  }

  .hamburger-menu-items {
    position: fixed;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    z-index: 1001;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .menu-item {
    padding: 5px 10px;
    cursor: pointer;
    white-space: nowrap;
  }

  .menu-item:hover {
    background-color: #f0f0f0;
  }

  /* Responsive design for smaller screens */
  @media (max-width: 768px) {
    .left-bar {
      width: 40px;
    }

    .hamburger-menu-items {
      left: 40px;
    }
  }
`;
