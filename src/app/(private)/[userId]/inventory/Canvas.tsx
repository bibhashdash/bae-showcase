"use client"
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    BackgroundVariant,
    Controls,
    type Edge,
    EdgeChange,
    type Node,
    NodeChange,
    ReactFlow
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import {Button} from "@/components/ui/button";
import {useCallback, useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {DecisionShape} from "@/components/ui/decisionShape";
const nodeTypes = {
    decision: DecisionShape,
};
export const Canvas = () => {
    const [nodes, setNodes] = useState<Array<Node>>([]);
    const [edges, setEdges] = useState<Array<Edge>>([]);
    const addNode = (nodeType: string) => {
        setNodes(prevState => [
                ...prevState,
                {
                    id: uuidv4(),
                    position: {
                        x: Math.floor(Math.random() * 700),
                        y: Math.floor(Math.random() * 500)
                    },
                    data: {
                        label: `Node No. ${prevState.length + 1}`
                    },
                    type: nodeType
                }
            ]
        )
    }

    useEffect(() => {
        console.log(nodes);
    }, [nodes]);

    const onNodesChange = useCallback(
        (changes: NodeChange<Node>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange<Edge>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );

    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    return (
        <div className="w-full h-full border border-gray-200 rounded-lg">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                nodeTypes={nodeTypes}
            >
                <Background variant={BackgroundVariant.Lines} />
                <Controls />
            </ReactFlow>
            <div className="flex items-center gap-y-2 mt-4">
                {/*<Button onClick={() => addNode()}>Add Node</Button>*/}
                <Button onClick={() => addNode('decision')}>Add Decision Box</Button>
            </div>
        </div>
    )
}