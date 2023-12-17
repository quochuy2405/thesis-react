/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { GraphView } from "react-digraph";
import { useSelector } from "react-redux";

const NODE_KEY = "id"; // Allows D3 to correctly update DOM

const GraphEdges: React.FC = () => {
	const data = useSelector((state: RootState) => state.graphedges.data);
	const show = useSelector((state: RootState) => state.graphedges.show);
	const [graph, setGraph] = useState<any>({
		edges: [],
		nodes: [],
	});

	const GraphConfig = {
		NodeTypes: {
			node: {
				typeText: "Image Related",
				shapeId: "#node",
				shape: (
					<symbol viewBox='0 0 100 100' id='node' key='0'>
						<circle cx='50' cy='50' r='45' fill='#00DFA2'></circle>
					</symbol>
				),
			},
			nodecrop: {
				typeText: "Face Detect",
				shapeId: "#nodecrop",
				shape: (
					// <svg id='nodecrop' viewBox='0 0 160 40' xmlns='http://www.w3.org/2000/svg'>
					<symbol viewBox='0 0 60 60' id='nodecrop' key='0'>
						<defs>
							<clipPath id='circleClip'>
								<circle cx='30' cy='30' r='30' />
							</clipPath>
						</defs>
						<image
							href='https://cdn.vox-cdn.com/thumbor/MbYxeyxG82sFlibdnv9Br1aCLg8=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/24395697/bkq6gtrpcnw43vsm5zm62q3z.png'
							className='object-contain rounded-full overflow-hidden h-full w-full'
							clipPath='url(#circleClip)'
						/>
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
						<circle cx='10' cy='10' r='0' fill='#F05941'></circle>
					</symbol>
				),
			},
		},
	};
	const [config, setConfig] = useState(GraphConfig.NodeTypes);
	const NodeSubtypes = GraphConfig.NodeSubtypes;
	const EdgeTypes = GraphConfig.EdgeTypes;
	const radius = 500; // Adjust the radius of the circle as needed
	const centerX = 150; // Adjust the x-coordinate of the circle center
	const centerY = 150; // Adjust the y-coordinate of the circle center

	const fetch = async () => {
		let NodeTypes = { ...config };
		const nodes = data.nodes.map((item: any, index: any) => {
			const angle = (index / data.nodes.length) * 2 * Math.PI; // Calculate the angle based on the index
			const x = centerX + radius * Math.cos(angle);
			const y = centerY + radius * Math.sin(angle);
			const isNode = item.node.includes("crop");
			const keyNode = isNode ? "nodemain" : "noderelated";

			const url = isNode
				? "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
				: "https://cdn.vox-cdn.com/thumbor/MbYxeyxG82sFlibdnv9Br1aCLg8=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/24395697/bkq6gtrpcnw43vsm5zm62q3z.png";

			NodeTypes = {
				...NodeTypes,
				[keyNode + index]: {
					typeText: "Face Detect ",
					shapeId: `#${keyNode}${index}`,
					shape: (
						// <svg id='nodecrop' viewBox='0 0 160 40' xmlns='http://www.w3.org/2000/svg'>
						<symbol viewBox='0 0 30 30' id={keyNode + index} key={index}>
							<defs>
								<clipPath id={`circleClip${index}`}>
									<circle cx='15' cy='15' r={isNode ? "18" : "15"} />
								</clipPath>
							</defs>
							<image
								href={url}
								className='object-contain rounded-full overflow-hidden w-full h-full'
								clipPath={`url(#circleClip${index})`}
							/>
						</symbol>
					),
				},
			};

			return {
				id: index,
				title: item.node,
				x,
				y,
				type: keyNode + index,
			};
		});
		setConfig(NodeTypes);

		const edges = data.edges
			.map((item: any) => {
				const names = item.edge
					.replaceAll("('", "")
					.replaceAll("'", "")
					.replaceAll(")", "")
					.replaceAll(" ", "")
					.split(",");

				const cropIndex = nodes.findIndex((item: any) => item.title === names[names.length - 1]);
				const edges_node = [];
				for (let i = 0; i < names.length - 1; i++) {
					const name = names[i];

					const source = {
						source: nodes.findIndex((item: any) => item.title === name),
						target: cropIndex,
						type: "emptyEdge",
					};
					edges_node.push(source);
				}
				return edges_node;
			})
			.flat();

		setGraph({ edges, nodes });
	};

	useEffect(() => {
		fetch();
	}, []);
	if (!show) return <></>;
	return (
		<>
			<GraphView
				nodeKey={NODE_KEY}
				nodes={graph.nodes}
				edges={graph.edges}
				edgeArrowSize={1}
				nodeTypes={config}
				nodeSubtypes={NodeSubtypes}
				edgeTypes={EdgeTypes}
			/>
		</>
	);
};
export default GraphEdges;
