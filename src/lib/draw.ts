function draw(node: HTMLUListElement): SvelteActionReturnType {
	let drawing: boolean | null = null;
	function mouseEvtHandler(evt: MouseEvent) {
		const isLabel = evt.target instanceof HTMLLabelElement;
		const box = isLabel && evt.target.parentNode?.querySelector('input');
		switch (evt.type) {
			case 'mousedown':
        drawing = box ? !box.checked : true;
				break;
			case 'mouseleave':
			case 'mouseup':
				drawing = null;
				break;
			case 'mousemove':
				if (box && drawing !== null) {
					box.checked = drawing;
				}
				break;
		}
	}

	node.addEventListener('mousedown', mouseEvtHandler);
	node.addEventListener('mouseup', mouseEvtHandler);
	node.addEventListener('mousemove', mouseEvtHandler);
	node.addEventListener('mouseleave', mouseEvtHandler);

	return {
		destroy() {
			node.removeEventListener('mousedown', mouseEvtHandler);
			node.removeEventListener('mouseup', mouseEvtHandler);
			node.removeEventListener('mousemove', mouseEvtHandler);
			node.removeEventListener('mouseleave', mouseEvtHandler);
		}
	};
}

export default draw;
