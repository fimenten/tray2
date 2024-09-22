// src/hooks/useContextMenu.ts
import { useState, useEffect, useCallback } from 'react';

interface ContextMenuState {
  x: number;
  y: number;
  isOpen: boolean;
}

const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    x: 0,
    y: 0,
    isOpen: false,
  });

  const handleContextMenu = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        isOpen: true,
      });
    },
    []
  );

  const closeContextMenu = useCallback(() => {
    setContextMenu(prev => ({ ...prev, isOpen: false }));
  }, []);

  useEffect(() => {
    const handleClick = () => closeContextMenu();
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [closeContextMenu]);

  return { contextMenu, handleContextMenu, closeContextMenu };
};

export default useContextMenu;