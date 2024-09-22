import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { TrayWrapper, TrayTitleContainer, TrayFoldButton, TrayTitle, TrayContent, TrayInformationContainer, TouchArea } from './TrayStyles';
import useEventManager from '../../hooks/useEventManager';
import { setContextMenuOpening, setEditingId, setfocusingId, updateTrayVisFold, updateSelected, updateTraycolor } from '../../store/tray';
import ContextMenu from '../ContextMenu/ContextMenu'; // Import the consolidated ContextMenu component
import { v4 } from 'uuid';
interface TrayProps {
  visId: string;

}
export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


const Tray: React.FC<TrayProps> = ({ visId }) => {

  const tray = useSelector((state: RootState) => state.trays.nodes[visId]);
  const inputRef = useRef<HTMLInputElement>(null);
  const trayRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  let [contextMenuPosition, setContextMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const childrenIds = useSelector((state: RootState) => state.trays.fromTo[visId]);
  const isEditing = useSelector((state: RootState) => state.trays.editingId == visId);
  const focusingTrayId = useSelector((state: RootState) => state.trays.focusingId);
  const isFocusing = focusingTrayId === visId;
  const isFolded = useSelector((state: RootState) => state.trays.nodes[visId].isFolded);
  // const canMelt = useSelector((state: RootState) => state.trays.nodes[visId].isMelt);
  const canMelt = true

  const anyChildrenFold = useSelector((state: RootState) => childrenIds.every(id => !state.trays.nodes[id].isFolded))

  // const isMelt = canMelt&&anyChildrenFold&&(childrenIds.length > 0)
  const isMelt = false;
  const flexDirection = tray.data.flexDirection;
  const color = tray.data.color

  const dispatch = useDispatch();

  const {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleKeyDown,
    handleNameChange,
    handleTitleDoubleClick,
    handleTrayDoubleClick,
    handleTrayFocus,
    handleFinishNameChange,
  } = useEventManager(visId);


  useEffect(() => {
    if (isFocusing && !isEditing && trayRef.current) {
      trayRef.current.focus();
    }
  }, [isFocusing, isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation()

    setContextMenuPosition({ x: e.pageX, y: e.pageY });
    dispatch(setContextMenuOpening(true))

  };
  if (!color) {
    if (childrenIds.length) {
      dispatch(updateTraycolor({ id: tray.id, color: getRandomColor() }))
    }
  }

  const closeContextMenu = () => {
    setContextMenuPosition(null);
    dispatch(setContextMenuOpening(false))
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSelected({ id: visId, checked: event.target.checked }))
  }


  if (!tray) return null;

  const titleContainerCSSmelt = isMelt ? { "height": "10px", "fontSize": "15px", "overflow": "hidden" } : {}


  return (
    <TrayWrapper
      ref={trayRef}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDoubleClick={handleTrayDoubleClick}
      onKeyDown={handleKeyDown}
      onFocus={handleTrayFocus}
      onContextMenu={handleContextMenu} // Handle right-click to show context menu
      tabIndex={0}
      style={{ "borderColor": color, margin: '0px 0' }} // Add border and margin between trays


    >{ }
      <TrayTitleContainer style={titleContainerCSSmelt}>
        
        {(childrenIds.length > 0)&&(isFolded) && (
    <TrayFoldButton
      onFocus={() => { }}
      onClick={() => { dispatch(updateTrayVisFold({ id: visId, fold: false })) }}
    >
      {isFolded ? '▶' : ''}
    </TrayFoldButton>
  )}

        {(
          <TrayTitle
          ref={inputRef}
          onDoubleClick={(e) => handleTitleDoubleClick(e)}
          contentEditable={isEditing}
          isEditing={isEditing} // Pass isEditing as a prop
          onBlur={(e) => handleFinishNameChange()}
          onInput={(e) => handleNameChange(e.currentTarget.textContent || '')}
        >
          {tray.data.name}
        </TrayTitle>


        )}

        <TrayInformationContainer>
        {(childrenIds.length > 0)&&(!isFolded) && (
          <TrayFoldButton
            onFocus={() => { }}
            onClick={() => { dispatch(updateTrayVisFold({ id: visId, fold: false })) }}
          >
            {isFolded ? '' : '▼'}
            </TrayFoldButton>
)}


          {/* <div style={{ display: 'flex', flexDirection: 'column', marginRight: '8px' }}>
          <small>{`Created: ${tray.createdAt.toLocaleDateString()}`}</small>
          <small>{`Updated: ${tray.updatedAt.toLocaleDateString()}`}</small>
        </div>  */}

          <text onClick={handleContextMenu} onFocus={() => { }}>
            ⋮
          </text>
          <div>
            <label>
              <input
                type="checkbox"
                // checked={checked}
                onChange={handleCheck}
              />
            </label>
          </div>
        </TrayInformationContainer>
      </TrayTitleContainer>

      {(!isFolded && childrenIds.length > 0) && (
        <TrayContent flexDirection={flexDirection}>
          {childrenIds.map((childId) => (
            <Tray key={childId} visId={childId} />
          ))}
          <TouchArea />
        </TrayContent>
      )}


      {contextMenuPosition && (
        <ContextMenu
          ref={contextMenuRef}
          trayId={visId}
          position={contextMenuPosition}
          onClose={closeContextMenu}

        />
      )}
    </TrayWrapper>
  );
};

export default Tray;
