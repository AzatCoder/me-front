export const draggable = (
  draggable: HTMLElement,
  dragBy: HTMLElement,
) => {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  dragBy.addEventListener('mousedown', dragMouseDown);

  function dragMouseDown(e: MouseEvent) {
    // e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: MouseEvent) {
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    draggable.style.top = (draggable.offsetTop - pos2) + 'px';
    draggable.style.left = (draggable.offsetLeft - pos1) + 'px';
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}