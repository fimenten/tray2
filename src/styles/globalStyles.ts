import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :root {
  --tray-bg-color: #e0e0e0;
  /* --tray-border-color: #ccc; */
  --tray-content-bg-color: #f5f5f5;
  --title-color: #333;
  --placeholder-color: #999;
  --hover-bg-color: #f0f0f0;
  --menu-bg-color: white;
  --menu-border-color: #ccc;
}

/* Base Tray Styles */
.tray {
  width: 100%;
  max-width: 100%;
  background-color: var(--tray-bg-color);
  cursor: move;
  border: 3px;
  border-color: #f5f5f5;
  border-top-width: 1px;
  /* border-top-color: #000; */
  border-bottom-width: 3px;
  border-left-width: 3px;
  border-right: none;
  overflow: hidden;
  transition: order 0.3s;
  position: relative;
  box-sizing: border-box;
  margin: 0;
}

.tray.dragging {
  opacity: 0.8;
  z-index: 1;
}

/* Tray Title Container */
.tray-title-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0 10px 10px;
  box-sizing: border-box;
  min-height: 30px;
  transition: min-height 0.3s ease;
}

/* Checkbox */
.tray-checkbox {
  flex: 0 0 auto;
  margin: 0px;
  padding: 0;
  opacity: 0;
  /* Makes the checkbox invisible */
  /* Alternatively, you could use: visibility: hidden; */
}

/* Title */
.tray-title {
  flex: 1;
  min-width: 50%;
  width: 100px;
  word-wrap: break-word;
  white-space: normal;
  font-weight: bold;
  outline: none;
  cursor: text;
  color: var(--title-color);
  line-height: 1.2;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.tray-title:focus {
  background-color: var(--menu-bg-color);
  max-height: none;
}

.tray-title:empty::before {
  content: 'Untitled';
  color: var(--placeholder-color);
  font-style: italic;
}

.tray-title:hover {
  text-decoration: underline;
}

/* Context Menu Button */
.tray-context-menu-button {
  flex: 0 0 auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  padding: 0;
}

/* Tray Content */
.tray-content {
  padding-left: 1px;
  padding-top: 20px;
  padding-right: 0px;
  padding-bottom: 10px;
  background-color: var(--tray-content-bg-color);
  display: flex;
}

.tray .tray {
  margin: 0;
  width: 100%;
}

/* Menu Styles */
.context-menu,
.label-menu,
.label-selector,
.label-remover {
  position: fixed;
  background-color: var(--menu-bg-color);
  border: 1px solid var(--menu-border-color);
  padding: 5px;
  border-radius: 5px;
  z-index: 1000;
}

.menu-item,
.label-item {
  padding: 5px;
  cursor: pointer;
}

.menu-item:hover,
.label-item:hover {
  background-color: var(--hover-bg-color);
}

/* Tray Labels */
.tray-labels {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
}

.tray-label {
  display: inline-block;
  background-color: var(--hover-bg-color);
  border-radius: 3px;
  font-size: 12px;
  padding: 2px 5px;
  color: white;
}

/* Split Tray */
.tray.split {
  display: flex;
}

.tray.split-horizontal {
  flex-direction: row;
}

.tray.split-vertical {
  flex-direction: column;
}

.tray.split>.tray-content {
  display: flex;
  flex: 1;
}

.tray.split-horizontal>.tray-content {
  flex-direction: row;
}

.tray.split-vertical>.tray-content {
  flex-direction: column;
}

.tray.split>.tray-content>.tray {
  flex: 1;
  min-width: 0;
  min-height: 0;
}

/* Drag Indicators */
.tray.drag-top::before,
.tray.drag-bottom::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
}

.tray.drag-top::before {
  top: 0;
}

.tray.drag-bottom::after {
  bottom: 0;
}

/* Fold Button */
.tray-fold-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  padding: 0;
}

.tray-fold-button-right {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  padding: 0;
}

/* Color Picker */
.color-picker {
  position: relative;
}

.color-options {
  display: none;
  position: absolute;
  right: 100%;
  top: 0;
  background: var(--menu-bg-color);
  border: 1px solid var(--menu-border-color);
  padding: 5px;
  border-radius: 3px;
}

.color-picker:hover .color-options {
  display: flex;
  flex-wrap: wrap;
  width: 100px;
}

.color-option {
  width: 20px;
  height: 20px;
  margin: 2px;
  border-radius: 50%;
  cursor: pointer;
}

.color-option:hover {
  transform: scale(1.2);
}

/* Tray Selection Dialog */
.tray-selection-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--menu-bg-color);
  padding: 10px;
  border: 1px solid var(--menu-border-color);
  z-index: 1000;
  border-radius: 5px;
}

.tray-selection-dialog select {
  display: block;
  margin: 5px 0;
  width: 100%;
  padding: 5px;
}

.tray-selection-dialog button {
  margin-right: 5px;
  padding: 5px;
  background-color: var(--hover-bg-color);
  border: 1px solid var(--menu-border-color);
  border-radius: 3px;
  cursor: pointer;
}

.tray-selection-dialog button:hover {
  background-color: var(--tray-bg-color);
}

/* Label Manager */
.label-manager {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--menu-bg-color);
  padding: 10px;
  border-radius: 5px;
}

.label-selector select,
.label-selector input,
.label-selector button,
.label-remover select,
.label-remover button {
  margin: 5px 0;
  padding: 5px;
  cursor: pointer;
}

.context-menu .menu-item.focused {
  background-color: #f0f0f0;
  outline: none;
}

.template-selection-popup {
  position: fixed;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 10000;
}

.template-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.template-item {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}

.template-item:hover {
  background-color: #f0f0f0;
}

/* Network Tray Info Styles */
.network-tray-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 5px;
  font-size: 0.7em;
  max-width: 100px;
}

.network-tray-info button {
  font-size: 0.8em;
  padding: 1px 3px;
  margin-bottom: 2px;
  cursor: pointer;
  border: none;
  border-radius: 2px;
}

.network-tray-info button[title]:hover::after {
  content: attr(title);
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 4px;
  border-radius: 2px;
  font-size: 0.8em;
  white-space: nowrap;
  z-index: 1000;
  top: 100%;
  left: 0;
}

.network-tray-buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 5px;
  gap: 2px;
}

.network-tray-buttons button {
  font-size: 0.7em;
  padding: 1px 3px;
  cursor: pointer;
  border: none;
  border-radius: 2px;
  background-color: #f0f0f0;
  width: 100%;
  text-align: left;
}

.network-tray-buttons button:hover {
  background-color: #e0e0e0;
}

/* Adjust Tray Title Container for Network Tray */
.tray.network-tray .tray-title-container {
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  padding: 3px 5px;
}

.tray.network-tray .tray-title {
  flex: 1;
  min-width: 0;
  margin-right: 5px;
  font-size: 0.9em;
}

.tray.network-tray .tray-context-menu-button {
  order: -1;
  margin-right: 2px;
  font-size: 0.8em;
}

.tray.network-tray .tray-checkbox-container {
  order: -2;
  margin-right: 2px;
}

.tray.network-tray .tray-created-time {
  font-size: 0.6em;
  color: #888;
  margin-left: auto;
  /* align-self: flex-end; */
}

.tray.network-tray .tray-labels {
  width: 100%;
  margin-top: 2px;
  font-size: 0.7em;
}

.tray.network-tray .network-tray-info,
.tray.network-tray .network-tray-buttons {
  flex-shrink: 0;
}

/* Fold Button */
.tray-fold-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  padding: 2px 5px;
  margin-right: 5px;
  transition: transform 0.3s ease;
  color: #555;
}

.tray-fold-button:hover {
  color: #000;
}

.tray-fold-button.folded {
  transform: rotate(-90deg);
}

/* Context Menu Button */
.tray-context-menu-button {
  flex: 0 0 auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 2px 5px;
  color: #555;
  transition: color 0.3s ease, transform 0.3s ease;
}

.tray-context-menu-button:hover {
  color: #000;
  transform: scale(1.1);
}

/* Tray Title Container */
.tray-title-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 5px 10px;
  box-sizing: border-box;
  min-height: 30px;
  transition: min-height 0.3s ease;
}

/* 
html, body {
    height: 75vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

body > .tray {
    height: 75vh;
    display: flex;
    flex-direction: column;
}

body > .tray > .tray-title-container {
    flex-shrink: 0;
}

body > .tray > .tray-content {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
    height: 50%;

} */
/* Left Bar Styles */
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

/* Adjust main content to accommodate left bar */
body>.tray {
  margin-left: 50px;
  width: calc(100% - 50px);
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
  .left-bar {
    width: 40px;
  }

  body>.tray {
    margin-left: 40px;
    width: calc(100% - 40px);
  }
}

/* Menu item styles */
.menu-item {
  padding: 5px 10px;
  cursor: pointer;
  white-space: nowrap;
}

.menu-item:hover {
  background-color: #f0f0f0;
}

.action-buttons {
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000;
}

.action-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: #4CAF50;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.3s;
}

.action-button:hover {
  background-color: #45a049;
  transform: scale(1.1);
}

.action-button:active {
  transform: scale(0.95);
}
`;

export default GlobalStyle;