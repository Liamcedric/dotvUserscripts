"use strict";

const setupObserver = new MutationObserver((mutations) => {
	const addedNode = mutations.find(
		(mutation) =>
			mutation.type === "childList" &&
			mutation.addedNodes.length > 0 &&
			mutation.addedNodes[0].nodeType === Node.ELEMENT_NODE &&
			mutation.addedNodes[0].classList.contains("app-container")
	)?.addedNodes[0];

	if (addedNode) {
		setupObserver.disconnect();
		main();
	}
});
setupObserver.observe(document.body, { childList: true, subtree: true });

function main() {
	console.log("started");
