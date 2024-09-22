import { current } from '@reduxjs/toolkit';
import { visualTray,Tray, TrayVisualGraph } from '../store/tray';

import { v4 as uuidv4 } from 'uuid';

export const serializeUnder = (graph: TrayVisualGraph, rootId: string, changeVisId = false, changeDataId = false): TrayVisualGraph => {
  const newGraph: TrayVisualGraph = {
    nodes: {},
    fromTo: {},
    toFrom: {},
    trayInformation: {},
    nodeInfo: { information: {} },
    selectedId: [],
    rootId: rootId,
    editingId: null,
    focusingId: null,
    contextMenuOpening: false,
  };

  const visIdMap: { [oldVisId: string]: string } = {};
  const dataIdMap: { [oldDataId: string]: string } = {};

  const traverse = (nodeId: string) => {
    if (!graph.nodes[nodeId]) return;

    // Generate or retain visual ID
    const newVisId = changeVisId ? uuidv4() : nodeId;
    visIdMap[nodeId] = newVisId;

    // Copy node and change visual ID if necessary
    const theTray = graph.nodes[nodeId];
    newGraph.nodes[newVisId] = { ...theTray };

    // Generate or retain data ID
    const oldDataId = theTray.data.id;
    const newDataId = changeDataId ? uuidv4() : oldDataId;
    dataIdMap[oldDataId] = newDataId;
    
    // Update node with new data ID
    newGraph.nodes[newVisId].data.id = newDataId;
    newGraph.trayInformation[newDataId] = graph.trayInformation[oldDataId];
    
    // Copy and change connections
    if (graph.fromTo[nodeId]) {
      newGraph.fromTo[newVisId] = [];
      graph.fromTo[nodeId].forEach((childId) => {
        const newChildVisId = changeVisId ? uuidv4() : childId;
        visIdMap[childId] = newChildVisId;
        newGraph.fromTo[newVisId].push(newChildVisId);
        
        if (!newGraph.toFrom[newChildVisId]) newGraph.toFrom[newChildVisId] = [];
        newGraph.toFrom[newChildVisId].push(newVisId);
        traverse(childId);
      });
    }
  };

  traverse(rootId);

  return newGraph;
};

// export const deserializeTray = (serializedData: string,state:TrayVisualGraph,parentId:string):visualTray => {
//   const parsedData = JSON.parse(serializedData);
//   const {trayId, trays, trayGraph, informations } = parsedData;
  
//   trayGraph.toFrom[trayId].push(parentId)

//   trays.map(d => 

//   )





