module.exports = function(source) {
  const style = `
      let style = document.createElement("style");
      style.innerHTML = ${JSON.stringify(source)};
      document.head.appendChild(style)
`
  return style
}