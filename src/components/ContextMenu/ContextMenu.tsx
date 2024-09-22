import React, { useState, useRef, useEffect, forwardRef } from 'react';
import styled from '@emotion/styled';
import { SketchPicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store'; // Adjust the import path
import { updateTraycolor, updateTrayFlex } from '../../store/tray';

const Menu = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid black;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 10px;
`;

const MenuItem = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

interface ContextMenuProps {
  trayId: string;
  position: { x: number; y: number };
  onClose: () => void;
  tabIndex?: number;
}

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(({ trayId, position, onClose, tabIndex = 0 }, ref) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const dispatch = useDispatch();
  const tray = useSelector((state: RootState) => state.trays.nodes[trayId]);
  const color = tray.data.color;
  const flex = tray.data.flexDirection;
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Close the context menu if clicked outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex((prevIndex) => {
          if (prevIndex === null) return 2;
          return prevIndex > 0 ? prevIndex - 1 : 2;
        });
        break;
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex((prevIndex) => {
          if (prevIndex === null) return 0;
          return prevIndex < 2 ? prevIndex + 1 : 0;
        });
        break;
      case 'Enter':
        event.preventDefault();
        if (focusedIndex === 0) {
          setShowColorPicker(!showColorPicker);
        } else if (focusedIndex === 1) {
          toggleFlexDirection();
        } else if (focusedIndex === 2) {
          onClose();
        }
        break;
      case 'Escape':
        event.preventDefault();
        onClose();
        break;
      default:
        break;
    }
  };

  const handleColorChange = (color: any) => {
    dispatch(updateTraycolor({ id: trayId, color: color.hex }));
  };

  const toggleFlexDirection = () => {
    const newDirection = flex === 'row' ? 'column' : 'row';
    dispatch(updateTrayFlex({ id: trayId, flexDirection: newDirection }));
  };

  return (
    <Menu
      ref={(element) => {
        menuRef.current = element;
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = element;
        }
      }}
      style={{ top: position.y, left: position.x }}
      tabIndex={tabIndex}
      onKeyDown={handleKeyDown}
      autoFocus
    >
      <MenuItem
        onClick={() => setShowColorPicker(!showColorPicker)}
        tabIndex={0}
        style={{ backgroundColor: focusedIndex === 0 ? '#f0f0f0' : 'transparent' }}
      >
        Change Color
      </MenuItem>
      {showColorPicker && (
        <div onClick={(e) => e.stopPropagation()}>
          <SketchPicker color={color} onChangeComplete={handleColorChange} />
        </div>
      )}
      <MenuItem
        onClick={toggleFlexDirection}
        tabIndex={0}
        style={{ backgroundColor: focusedIndex === 1 ? '#f0f0f0' : 'transparent' }}
      >
        Toggle Flex Direction (Current: {flex})
      </MenuItem>
      <MenuItem
        onClick={onClose}
        tabIndex={0}
        style={{ backgroundColor: focusedIndex === 2 ? '#f0f0f0' : 'transparent' }}
      >
        Close Menu
      </MenuItem>
    </Menu>
  );
});

export default ContextMenu;
