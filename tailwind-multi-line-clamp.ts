module.exports = function({ addUtilities }:{addUtilities:any}) {
    addUtilities({
      '.line-clamp-2': {
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '2',
      },
    }, ['responsive']);
  }
  