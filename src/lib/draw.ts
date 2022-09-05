function draw(node: HTMLUListElement): SvelteActionReturnType {
	let drawing: boolean | null = null;

	function handler(evt: PointerEvent) {
		const isLabel = evt.target instanceof HTMLLabelElement;
		const box = isLabel && evt.target.parentNode?.querySelector('input');
		switch (evt.type) {
			case 'pointerdown':
				drawing = box ? !box.checked : true;
				break;
			case 'pointerleave':
			case 'pointerup':
				drawing = null;
				break;
			case 'pointermove':
				if (box && drawing !== null && box.checked !== drawing) {
					box.checked = drawing;
					box.dispatchEvent(new Event('change', { bubbles: true }));
				}
				break;
		}
	}

	node.addEventListener('pointerdown', handler);
	node.addEventListener('pointerup', handler);
	node.addEventListener('pointermove', handler);
	node.addEventListener('pointerleave', handler);

	return {
		destroy() {
			node.removeEventListener('pointerdown', handler);
			node.removeEventListener('pointerup', handler);
			node.removeEventListener('pointermove', handler);
			node.removeEventListener('pointerleave', handler);
		}
	};
}

export default draw;
