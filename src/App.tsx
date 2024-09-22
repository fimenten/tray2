import React, { useState, useEffect, useRef } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootState } from './store';
import { store, persistor } from './store';
import { MenuContainer, MenuItem, SidebarContainer, HamburgerMenu } from './components/LeftSidebar/LeftSidebar';
import Tray from './components/Tray/Tray';
import { resetAllTray } from './store/tray';
// import { resetTray } from './store/tray'; // Import the reset action

const App = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [keysVisible, setKeysVisible] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith('persist:')
    );
    setKeys(storedKeys);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleKeysVisible = () => {
    setKeysVisible(!keysVisible);
  };

  const handleKeySelect = (key: string) => {
    console.log('Selected key:', key);
    // Do something with the selected key
  };

  const handleResetTray = () => {
    dispatch(resetAllTray());
    setMenuVisible(false); // Close the menu after resetting
  };

  const rootId = useSelector((state: RootState) => state.trays.rootId);

  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <div style={{ display: 'flex' }}>
          <SidebarContainer>
            <HamburgerMenu onClick={toggleMenu}>☰</HamburgerMenu>
          </SidebarContainer>

          <MenuContainer ref={menuRef} visible={menuVisible}>
            <MenuItem onClick={toggleKeysVisible}>ページ一覧を表示</MenuItem>
            {keysVisible && keys.map((key) => (
              <MenuItem key={key} onClick={() => handleKeySelect(key)}>
                {key.replace('persist:', '')}
              </MenuItem>
            ))}
            <MenuItem onClick={handleResetTray}>トレイをリセット</MenuItem> {/* Reset Tray Menu Item */}
          </MenuContainer>

          <div style={{ marginLeft: '50px', flexGrow: 1 }}>
            <Tray visId={rootId} />
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
