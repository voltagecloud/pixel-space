function draw(node: HTMLUListElement): SvelteActionReturnType {
	let drawing: boolean | null = null;

	function mouseHandler(evt: MouseEvent) {
		console.log(evt.type);

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
				if (box && drawing !== null && box.checked !== drawing) {
					box.checked = drawing;
					box.dispatchEvent(new Event('change', { bubbles: true }));
				}
				break;
		}
	}

	function touchHandler(evt: TouchEvent) {
		console.log(evt.type, evt.detail);
		// evt.preventDefault();
	}


	node.addEventListener('touchstart', touchHandler);
	node.addEventListener('touchmove', touchHandler);
	node.addEventListener('touchend', touchHandler);
	node.addEventListener('touchcancel', touchHandler);

	node.addEventListener('mousedown', mouseHandler);
	node.addEventListener('mouseup', mouseHandler);
	node.addEventListener('mousemove', mouseHandler);
	node.addEventListener('mouseleave', mouseHandler);

	return {
		destroy() {
			node.removeEventListener('touchstart', touchHandler);
			node.removeEventListener('touchmove', touchHandler);
			node.removeEventListener('touchend', touchHandler);
			node.removeEventListener('touchcancel', touchHandler);
		
			node.removeEventListener('mousedown', mouseHandler);
			node.removeEventListener('mouseup', mouseHandler);
			node.removeEventListener('mousemove', mouseHandler);
			node.removeEventListener('mouseleave', mouseHandler);
		}
	};
}

export default draw;
