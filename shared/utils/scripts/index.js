/**
 * Inserts a script into the DOM.
 *
 * @param {Object} opts
 * @param {String} opts.id
 * @param {String} opts.src
 * @param {String} [opts.async]
 */
export function insertScript(opts) {
  const { id, src, async = true } = opts;

  if (document.getElementById(id)) {
    return;
  }

  const scriptEl = document.createElement('script');
  scriptEl.id = id;
  scriptEl.src = src;
  if (async) {
    scriptEl.async = 1;
  }

  const firstJsEl = document.getElementsByTagName('script')[0];
  firstJsEl.parentNode.insertBefore(scriptEl, firstJsEl);
}
