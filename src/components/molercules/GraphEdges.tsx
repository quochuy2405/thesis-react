/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGraphRNN } from "../../apis/graph-rnn";
import { useEffect, useState } from "react";
import { GraphView } from "react-digraph";
const GraphConfig = {
	NodeTypes: {
		empty: {
			typeText: "None",
			shapeId: "#empty",
			shape: (
				<symbol viewBox='0 0 100 100' id='empty' key='0'>
					<circle cx='50' cy='50' r='45' fill='#00DFA2'></circle>
				</symbol>
			),
		},
	},
	NodeSubtypes: {},
	EdgeTypes: {
		emptyEdge: {
			shapeId: "#emptyEdge",
			shape: (
				<symbol viewBox='0 0 50 50' id='emptyEdge' key='0'>
					<circle cx='10' cy='10' r='0' fill='currentColor'></circle>
				</symbol>
			),
		},
	},
};

const NODE_KEY = "id"; // Allows D3 to correctly update DOM
const GraphEdges = () => {
	const [graph, setGraph] = useState({
		edges: [],
		nodes: [],
	});
	const NodeTypes = GraphConfig.NodeTypes;
	const NodeSubtypes = GraphConfig.NodeSubtypes;
	const EdgeTypes = GraphConfig.EdgeTypes;
	const radius = 500; // Adjust the radius of the circle as needed
	const centerX = 150; // Adjust the x-coordinate of the circle center
	const centerY = 150; // Adjust the y-coordinate of the circle center
	const fetch = async () => {
		await getGraphRNN("1").then(({ data }: any) => {
			console.log('data', data)
			const nodes = data.nodes.map((item:any, index:any) => {
				const angle = (index / data.nodes.length) * 2 * Math.PI; // Calculate the angle based on the index
				const x = centerX + radius * Math.cos(angle);
				const y = centerY + radius * Math.sin(angle);

				return {
					id: index,
					title: item.node,
					x,
					y,
					type: "empty",
				};
			});

			const edges = data.edges
				.map((item:any) => {
					const names = item.edge
						.replaceAll("('", "")
						.replaceAll("'", "")
						.replaceAll(")", "")
						.replaceAll(" ", "")
						.split(",");

					const cropIndex = nodes.findIndex((item:any) => item.title === names[names.length - 1]);
					const edges_node = [];
					for (let i = 0; i < names.length - 1; i++) {
						const name = names[i];

						const source = {
							source: nodes.findIndex((item:any) => item.title === name),
							target: cropIndex,
							type: "emptyEdge",
						};
						edges_node.push(source);
					}
					return edges_node;
				})
				.flat();

			setGraph({ edges, nodes });
		});
	};

	useEffect(() => {
		fetch();
	}, []);

	return (
		<>
			<GraphView
				nodeKey={NODE_KEY}
				nodes={graph.nodes}
				edges={graph.edges}
				
				edgeArrowSize={1}
				nodeTypes={NodeTypes}
				nodeSubtypes={NodeSubtypes}
				edgeTypes={EdgeTypes}
			/>
		</>
	);
};
export default GraphEdges;
