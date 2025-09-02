import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  Node,
  Edge,
  NodeProps,
  OnNodesChange,
  OnEdgesChange,
  addEdge,
  Connection,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import { ProcessNodeData } from '../types';
import { STATUS_STYLES } from '../constants';
import { NodeDetailModal } from './NodeDetailModal';
import { motion } from 'framer-motion';

// Custom Node Component
const CustomNode: React.FC<NodeProps<ProcessNodeData>> = ({ data }) => {
  const { icon, color, pulse } = STATUS_STYLES[data.status];
  const progress = data.currentQuantity !== undefined && data.totalQuantity ? (data.currentQuantity / data.totalQuantity) * 100 : 0;
  
  return (
    <motion.div 
      className={`w-48 p-3 rounded-lg shadow-md border-2 ${color} backdrop-blur-sm transition-all duration-300 hover:shadow-indigo-500/30 hover:border-indigo-500`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="font-bold text-sm text-gray-100">{data.label}</p>
        <div className={pulse ? 'animate-pulse' : ''}>
          {icon}
        </div>
      </div>
      {data.currentQuantity !== undefined && data.totalQuantity !== undefined && (
        <div>
          <div className="w-full bg-slate-700 rounded-full h-2.5 mb-1">
            <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-xs text-gray-400 text-right">{data.currentQuantity.toLocaleString()} / {data.totalQuantity.toLocaleString()} kg</p>
        </div>
      )}
    </motion.div>
  );
};

interface FlowDiagramProps {
  nodes: Node<ProcessNodeData>[];
  setNodes: Dispatch<SetStateAction<Node<ProcessNodeData>[]>>;
  edges: Edge[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
}

const FlowDiagram: React.FC<FlowDiagramProps> = ({ nodes, setNodes, edges, setEdges }) => {
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  const [selectedNode, setSelectedNode] = useState<Node<ProcessNodeData> | null>(null);

  const onNodesChange: OnNodesChange = (changes) => setNodes((nds) => applyNodeChanges(changes, nds));
  const onEdgesChange: OnEdgesChange = (changes) => setEdges((eds) => applyEdgeChanges(changes, eds));
  const onConnect = (params: Connection) => setEdges((eds) => addEdge(params, eds));
  const onNodeClick = (event: React.MouseEvent, node: Node<ProcessNodeData>) => {
    setSelectedNode(node);
  };
  
  return (
    <>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
          className="bg-transparent"
        >
          <Controls showInteractive={false} />
          <MiniMap nodeStrokeWidth={3} zoomable pannable className="!bg-slate-800 border border-slate-700" />
          <Background color="#475569" gap={16} />
        </ReactFlow>
        {selectedNode && (
            <NodeDetailModal node={selectedNode} onClose={() => setSelectedNode(null)} />
        )}
    </>
  );
};

export default FlowDiagram;