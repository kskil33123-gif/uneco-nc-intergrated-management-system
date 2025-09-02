import { useState, useEffect, useCallback } from 'react';
import { Edge, Node } from 'reactflow';
import { INITIAL_NODES, INITIAL_EDGES } from '../constants';
// FIX: Import ProcessStatus to use for type casting.
import { ProcessNodeData, ProcessStatus } from '../types';

const processSteps = ['1', '2', '3', '4', '5', '6'];

export const useProcessData = () => {
  const [nodes, setNodes] = useState<Node<ProcessNodeData>[]>(INITIAL_NODES);
  const [edges, setEdges] = useState<Edge[]>(INITIAL_EDGES);

  const updateProcess = useCallback(() => {
    setNodes(currentNodes => {
      const activeNodeIndex = currentNodes.findIndex(n => n.data.status === 'in_progress');
      
      if (activeNodeIndex === -1) { // If nothing is in progress, start the first one
        const firstPendingIndex = currentNodes.findIndex(n => n.data.status === 'pending');
        if (firstPendingIndex !== -1) {
            // FIX: Use immutable update with map. Mixed mutable and immutable patterns can cause type inference issues.
            return currentNodes.map((node, index) => {
              if (index === firstPendingIndex) {
                // FIX: Explicitly cast status to ProcessStatus to prevent TypeScript from widening the type to 'string'.
                return { ...node, data: { ...node.data, status: 'in_progress' as ProcessStatus } };
              }
              return node;
            });
        }
        return currentNodes; // Or loop back to start
      }
      
      const nextNodeIndex = activeNodeIndex + 1;
      
      // If it's the last node, just complete it and stop.
      if (activeNodeIndex >= currentNodes.length - 1) {
        // FIX: Use immutable update with map.
        return currentNodes.map((node, index) => {
          if (index === activeNodeIndex) {
            return {
              ...node,
              data: {
                ...node.data,
                // FIX: Explicitly cast status to ProcessStatus to prevent TypeScript from widening the type to 'string'.
                status: 'completed' as ProcessStatus,
                currentQuantity: node.data.totalQuantity
              }
            };
          }
          return node;
        });
      }
      
      // Update current and next node
      const newNodes = currentNodes.map((node, index) => {
        if (index === activeNodeIndex) {
          // FIX: Explicitly cast status to ProcessStatus to prevent TypeScript from widening the type to 'string'.
          return { ...node, data: { ...node.data, status: 'completed' as ProcessStatus } };
        }
        if (index === nextNodeIndex) {
            const prevNode = currentNodes[activeNodeIndex];
            const loss = Math.random() * 500;
            const newQuantity = (prevNode.data.currentQuantity ?? 50000) - loss;

            // FIX: Explicitly cast status to ProcessStatus to prevent TypeScript from widening the type to 'string'.
            return { ...node, data: { ...node.data, status: 'in_progress' as ProcessStatus, totalQuantity: prevNode.data.currentQuantity, currentQuantity: Math.round(newQuantity) } };
        }
        return node;
      });

      setEdges(currentEdges => {
          return currentEdges.map(edge => {
              if (edge.source === processSteps[activeNodeIndex] && edge.target === processSteps[nextNodeIndex]) {
                  return { ...edge, animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } };
              }
               if (edge.source === processSteps[activeNodeIndex - 1] && edge.target === processSteps[activeNodeIndex]) {
                  return { ...edge, animated: false };
              }
              return edge;
          });
      });

      return newNodes;
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateProcess, 5000); // Update every 5 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { nodes, setNodes, edges, setEdges };
};
