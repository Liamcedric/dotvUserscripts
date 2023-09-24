if (JSON.parse(localStorage.getItem("scriptSettings"))?.raidShareGroup) main();

function main() {
	watchForTabChange();
}

function watchForTabChange(): void {
	const tabObserver = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (
					node instanceof Element &&
					node.querySelector(
						"div.dotv-container.router-container > div:nth-child(7)"
					)
				) {
					addButton();
				}
			});
		});
	});

	tabObserver.observe(document.getElementById("game-view") as HTMLElement, {
		childList: true,
		subtree: true,
	});
}
function addButton(): void {
	const buttonsContainer = document.querySelector(
		"#game-view > div > div.dotv-container.router-container > div:nth-child(6) > div > div:nth-child(6)"
	);

	const newButton = buttonsContainer?.lastChild?.cloneNode(true) as Element;
	const f = newButton.firstChild as HTMLElement;
	f.classList.add("inactive");

	const buttonText = (newButton.querySelector("h4").textContent = "test");

	//set buttons active status
	newButton.addEventListener("click", () => {
		const f = newButton.firstChild as HTMLElement;
		f.classList.remove("inactive");
		window.history.pushState({}, "", `#/${buttonText}-raid`);

		const buttons = Array.from(buttonsContainer.childNodes) as HTMLElement[];
		buttons.slice(0, -1).forEach((element: HTMLElement) => {
			const f = element.firstChild as HTMLElement;
			f.classList.add("inactive");
		});
	});
	const buttons = Array.from(buttonsContainer.childNodes) as HTMLElement[];
	buttons.slice(0, -1).forEach((element: HTMLElement) => {
		element.addEventListener("click", () => {
			const f = newButton.firstChild as HTMLElement;
			f.classList.add("inactive");
		});
	});

	buttonsContainer?.appendChild(newButton as Node);
}
