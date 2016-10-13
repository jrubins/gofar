/**
 * Gets the offset (top, left) of the provided DOM element relative to the document.
 *
 * @param {Element} el
 * @returns {{top: Number, left: Number}}
 */
export function offset(el) {
  const box = el.getBoundingClientRect();

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;

  const clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
  const clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;

  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return {
    top: Math.round(top),
    left: Math.round(left),
  };
}
