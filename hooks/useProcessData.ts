import { useState, useEffect, useCallback } from 'react';
import { Edge, Node } from 'reactflow';
import { INITIAL_NODES, INITIAL_EDGES } from '../constants';
import { ProcessNodeData, ProcessStatus } from '../types';

export const useProcessData = () => {
  const [nodes, setNodes] = useState<Node<ProcessNodeData>[]>(INITIAL_NODES);
  const [edges, setEdges] = useState<Edge[]>(INITIAL_EDGES);
  const [isPaused, setIsPaused] = useState(false);

  // Called from NodeDetailModal to confirm a manual step
  const confirmStep = useCallback((nodeId: string) => {
    setNodes(currentNodes =>
      currentNodes.map(node => {
        if (node.id === nodeId && node.data.isAwaitingConfirmation) {
          return {
            ...node,
            data: { ...node.data, isAwaitingConfirmation: false },
          };
        }
        return node;
      })
    );
    // Unpause to allow the process to continue to the completion of this step
    setIsPaused(false);
  }, []);

  // Called from AlertCenter to start the shipping process after a new order
  const startShippingProcess = useCallback(() => {
    setNodes(currentNodes => {
      return currentNodes.map(node => {
        if (node.id === '5') { // Ensure product storage is marked as complete
          return { ...node, data: { ...node.data, status: 'completed' as ProcessStatus } };
        }
        if (node.id === '6') { // Start the shipping process
          return {
            ...node,
            data: {
              ...node.data,
              status: 'in_progress' as ProcessStatus,
              isAwaitingConfirmation: true, // It requires final approval
            },
          };
        }
        return node;
      });
    });

    setEdges(currentEdges =>
      currentEdges.map(edge => {
        if (edge.id === 'e5-6') {
          return { ...edge, animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } };
        }
        return edge;
      })
    );

    // Pause immediately because shipping (node 6) requires manual confirmation
    setIsPaused(true);
  }, []);

  const updateProcess = useCallback(() => {
    if (isPaused) {
      return;
    }

    let shouldPause = false;

    setNodes(currentNodes => {
      const activeNodeIndex = currentNodes.findIndex(n => n.data.status === 'in_progress');
      if (activeNodeIndex === -1) {
          // If nothing is in progress, find the first pending and start it.
          const firstPendingIndex = currentNodes.findIndex(n => n.data.status === 'pending');
          if (firstPendingIndex !== -1) {
            const newNodes = [...currentNodes];
            const nodeToStart = newNodes[firstPendingIndex];
            newNodes[firstPendingIndex] = {
                ...nodeToStart,
                data: {
                    ...nodeToStart.data,
                    status: 'in_progress' as ProcessStatus,
                    isAwaitingConfirmation: nodeToStart.data.requiresManualConfirmation
                }
            };
            if(nodeToStart.data.requiresManualConfirmation) {
                setIsPaused(true);
            }
            return newNodes;
          }
          return currentNodes;
      }
      
      const activeNode = currentNodes[activeNodeIndex];
      // If the current step is waiting for manual input, pause and wait.
      if (activeNode.data.isAwaitingConfirmation) {
        setIsPaused(true);
        return currentNodes;
      }

      // --- Complete current step ---
      let newNodes = currentNodes.map((node, index) => {
        if (index === activeNodeIndex) {
          // If completing 'Product Storage', pause for new order
          if (node.id === '5') {
            shouldPause = true;
          }
          return { ...node, data: { ...node.data, status: 'completed' as ProcessStatus } };
        }
        return node;
      });
      
      const nextNodeIndex = activeNodeIndex + 1;

      // --- Start next step ---
      if (nextNodeIndex < newNodes.length) {
        const prevNode = activeNode;
        const nextNode = newNodes[nextNodeIndex];

        const loss = Math.random() * 500;
        const newQuantity = (prevNode.data.currentQuantity ?? 50000) - loss;

        newNodes[nextNodeIndex] = {
            ...nextNode,
            data: {
                ...nextNode.data,
                status: 'in_progress' as ProcessStatus,
                totalQuantity: prevNode.data.currentQuantity,
                currentQuantity: Math.round(newQuantity),
                // Set confirmation flag for the new active node
                isAwaitingConfirmation: nextNode.data.requiresManualConfirmation,
            }
        };

        // If the newly started node requires confirmation, pause.
        if (nextNode.data.requiresManualConfirmation) {
            shouldPause = true;
        }

        // --- Update Edges ---
        setEdges(currentEdges =>
            currentEdges.map(edge => {
                // Animate new edge
                if (edge.source === activeNode.id && edge.target === nextNode.id) {
                    return { ...edge, animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } };
                }
                // De-animate previous edge
                if (edge.target === activeNode.id) {
                    return { ...edge, animated: false };
                }
                return edge;
            })
        );
      }
      
      if(shouldPause) {
        setIsPaused(true);
      }

      return newNodes;
    });
  }, [isPaused]);

  useEffect(() => {
    const intervalId = setInterval(updateProcess, 5000);
    return () => clearInterval(intervalId);
  }, [updateProcess]);

  return { nodes, setNodes, edges, setEdges, confirmStep, startShippingProcess };
};
