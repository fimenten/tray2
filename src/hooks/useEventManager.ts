import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { serializeUnder,  } from '../utils/trayUtils'; // Adjust the import path as needed
import { v4 as uuidv4 } from 'uuid'; // For generating new UUIDs
import {addTray,addTrayEdge,moveTray, setEditingId, setfocusingId, updateTrayName, TrayInfo, visualTray,moveFocus, removeTrayEdge,toggleFold, setContextMenuOpening,updateTrayVisFold, TrayVisualGraph, mergeGraph } from '../store/tray'; // Adjust the import path as needed
import { addEdge, Vertex } from '../store/graphCore';



const useEventManager = (visId:string) => {
  const dispatch = useDispatch();

  const isEditing = useSelector((state: RootState) => state.trays.editingId === visId);
  const parentId = useSelector((state: RootState) => state.trays.fromTo[visId][0]);
  const contextMenuOpening = useSelector((state: RootState) => state.trays.contextMenuOpening);
  const isFold = useSelector((state: RootState) => state.trays.nodes[visId].isFolded);
  
  const stateCopy =  useSelector((state: RootState) => state.trays);
  
  
  const shallowCopyTray = (visId: string) => {

    // const serialized = useSelector((state:RootState)=>serializeTray(state, visId));
    // serialized.id = uuidv4(); // Generate a new UUID for the copied tray
    navigator.clipboard.writeText(JSON.stringify({type:"shallow",visId:visId}))
          .then(() => console.log('Copied to clipboard'))
    .catch((err) => console.error('Failed to copy to clipboard', err));;
    // console.log('Tray copied to clipboard:', serialized);
  };

  const deepCopyTray = (visId: string) => {
  
    const ret = {type:"deep",data:serializeUnder(stateCopy, visId)}
    console.log(ret);
    
    navigator.clipboard.writeText(JSON.stringify(ret))
      .then(() => console.log('Copied to clipboard'))
      .catch((err) => console.error('Failed to copy to clipboard', err));
  };


  const pasteTray = async (parentId: string) => {
    const str = await navigator.clipboard.readText();
    const serialized = JSON.parse(str);
    if (serialized["type"]==="shallow"){
      const {pastedVisId} = serialized;
      // change all visID under
      const washed: TrayVisualGraph = serializeUnder(stateCopy,pastedVisId,true,false)
      dispatch(mergeGraph({pastedGraph:washed}))
      dispatch(addTrayEdge({from:visId,to:washed.rootId}))
      dispatch(addTrayEdge({from:parentId,to:visId}))      
    }

    else if (serialized["type"]==="deep") {
      //change all dataId and visId Under
      const data:TrayVisualGraph  = serialized["data"]
      const washed:TrayVisualGraph = serializeUnder(data,data.rootId,true,true)
      dispatch(mergeGraph({pastedGraph:washed}))
      dispatch(addTrayEdge({from:visId,to:washed.rootId}))
    }
    else{}
  };
  // const cutTray = async (trayId: string) => {
  //   const parentId = trayState.trayGraph.parentOf[trayId];
  //   if (!parentId || parentId === 'null') return; // Can't cut the root or trays without parents
  //   dispatch(setFocusingTrayId(parentId))
  //   // Copy the tray to the clipboard
  //   await copyTray(trayId);

  //   // Remove the tray from its parent
  //   dispatch(removeEdge({ parentId, childId: trayId }));

  //   console.log(`Tray ${trayId} cut and removed from parent ${parentId}`);
  // };

  const handleDragStart = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    if (contextMenuOpening){return}
    event.stopPropagation();
    event.dataTransfer.setData('text/plain', visId);
    event.dataTransfer.effectAllowed = 'move';
  }, [visId,contextMenuOpening]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const droppedVisId = event.dataTransfer.getData('text/plain');
    const droppedTray: Vertex = {id:droppedVisId}
    const newParentTray: Vertex = {id:visId}

    dispatch(moveTray({newParent:newParentTray,dropped:droppedTray}))
  }, [dispatch, visId]);

  const handleFinishNameChange = useCallback(() => {
    dispatch(setEditingId(null));
    dispatch(setfocusingId(visId)); 
  }, [dispatch, visId]);


  const handleNameChange = useCallback((newName: string) => {
    dispatch(updateTrayName({ id: visId, name: newName }));

    // dispatch(setEditingTrayId(null)); // 編集モードを解除
  }, [dispatch, visId]);

  const handleTitleDoubleClick = useCallback((event:React.MouseEvent) => {
    dispatch(setEditingId(visId)); // トレイを編集モードに設定
    event.stopPropagation()
  }, [dispatch, visId]);

  const createNewTray = useCallback(() => {
    const newTrayInfo : TrayInfo = {id:uuidv4(),name:"NewTray",flexDirection:"column"};
    const newTrayVis : visualTray = {id:uuidv4(),data:newTrayInfo,isFolded:true};
    dispatch(addTray(newTrayVis))
    dispatch(addTrayEdge({from:visId,to:newTrayVis.id}))
    dispatch(updateTrayVisFold({id:visId,fold:false}))
    dispatch(setfocusingId(newTrayVis.id))
    dispatch(setEditingId(newTrayVis.id))


  },[dispatch,visId]);

  const handleTrayDoubleClick = useCallback((event:React.MouseEvent) => {
    createNewTray()
    event.stopPropagation()
  }, [createNewTray]);

  const handleTrayFocus = useCallback(() => {
    // dispatch(setFocusingTrayId(trayId))
  },[])


  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (isEditing) {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          handleFinishNameChange();
        }
        return;
      }

      if (contextMenuOpening) {
        // switch (event.key) {
        //   case 'ArrowUp':
        //   case 'ArrowDown':
        //   case 'Enter':
        //   case 'Escape':
        //     event.preventDefault();
        //     break;
        //   default:
        //     event.preventDefault();
        //     break;
        // }
        // return;
      }

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          dispatch(moveFocus({ direction: 'upper', visId: visId }));
          break;
        case 'ArrowDown':
          event.preventDefault();
          dispatch(moveFocus({ direction: 'lower', visId: visId }));
          break;
        case 'ArrowLeft':
          event.preventDefault();
          dispatch(moveFocus({ direction: 'left', visId: visId }));
          break;
        case 'ArrowRight':
          event.preventDefault();
          dispatch(moveFocus({ direction: 'right', visId: visId }));
          break;
        case 'Enter':
          event.preventDefault();
          if (event.ctrlKey) {
            createNewTray()
          } else if (event.shiftKey) {
            dispatch(setEditingId(visId));
          } else {
            dispatch(toggleFold({id:visId}))
          }
          break;
        case 'Delete':
          event.preventDefault();
          if (event.ctrlKey) {
            dispatch(removeTrayEdge({from:parentId,to:visId}));
          }
          break;
        case "C":
          if (event.shiftKey){
            event.preventDefault();
            shallowCopyTray(visId)
            break
          }
          break
        case 'c':
          if (event.ctrlKey) {
            event.preventDefault();
            deepCopyTray(visId);
            break
          }
          break
        // case 'x':
        //   if (event.ctrlKey) {
        //     event.preventDefault();
        //     cutTray(visId);
        //   }
        //   break;
        case 'v':
          if (event.ctrlKey) {
            event.preventDefault();
            pasteTray(visId);
          }
          break;
        case 'V':
          event.preventDefault();
          pasteTray(visId);
          break;
        case ' ':
          if (event.ctrlKey) {
            event.preventDefault();
            setContextMenuOpening(true);
            simulateRightClick(event);
          }
          break;
        default:
          break;
      }
    },
    [dispatch,visId,contextMenuOpening, createNewTray, handleFinishNameChange, isEditing,parentId]
  );
  const simulateRightClick = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const simulatedEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      view: window,
      button: 2, // Right click
      buttons: 2,
      clientX: rect.left + rect.width / 2, // Simulate the click at the center of the element
      clientY: rect.top + rect.height / 2,
    });

    event.target?.dispatchEvent(simulatedEvent);
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleKeyDown,
    handleNameChange,
    handleTitleDoubleClick,
    handleTrayDoubleClick,
    handleTrayFocus,
    handleFinishNameChange
  };
};

export default useEventManager;
