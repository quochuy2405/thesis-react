const lightColorPalette = [
	"#F9B572",
	"#FFDFDF",
	"#B3A492",
	"#00A9FF",
	"#89CFF3",
	"#2192FF",
	"#45FFCA",
	"#FF8787",
	"#7EAA92",
	"#9ED2BE",
	"#FFD9B7",
	"#967E76",
	"#9BABB8",
	"#EEE3CB",
	"#D7C0AE",
	"#C4DFDF",
	"#FF6969",
	"#3A98B9",
];

export function getRandomColor() {
	return lightColorPalette[
		Math.floor(Math.random() * lightColorPalette.length)
	];
}

export function bytesToGB(bytes: number) {
	const gigabyte = Math.pow(2, 30);
	return Number((bytes / gigabyte).toFixed(2));
}

export const arrayToTree = (folders: Array<string>, prefix: string) => {
	const tree = {};

	folders.forEach((path) => {
		// Remove the specified prefix
		const pathWithoutPrefix = path.startsWith(prefix)
			? path.substring(prefix.length)
			: path;

		const pathParts = pathWithoutPrefix.split("/");
		let currentLevel: any = tree;

		pathParts.forEach((folder, index) => {
			if (!currentLevel[folder]) {
				currentLevel[folder] = index === pathParts.length - 1 ? null : {};
			}
			currentLevel = currentLevel[folder];
		});
	});

	return tree;
};
export const getObjectByPath = (path: string, tree: object) => {
	const pathParts = path.split("/");
	console.log("pathParts", pathParts);
	let currentLevel: any = { ...tree };

	for (const folder of pathParts) {
		console.log("folder", folder);
		console.log("currentLevel", currentLevel?.[folder]);
		if (currentLevel?.[folder] === null) {
			return currentLevel;
		}
		currentLevel = currentLevel?.[folder];
	}

	return currentLevel; // Return null if the path is not found
};
