const colorPalette = [
  '#2ec7c9',
  '#b6a2de',
  '#5ab1ef',
  '#ffb980',
  '#d87a80',
  '#8d98b3',
  '#e5cf0d',
  '#97b552',
  '#95706d',
  '#dc69aa',
  '#07a2a4',
  '#9a7fd1',
  '#588dd5',
  '#f5994e',
  '#c05050',
  '#59678c',
  '#c9ab00',
  '#7eb00a',
  '#6f5553',
  '#c14089'
];

const theme = {
  color: colorPalette,

  title: {
    textStyle: {
      fontWeight: 'normal',
      color: '#008acd'
    }
  },

  tooltip: {
    backgroundColor: 'rgba(50,50,50,0.5)',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#008acd'
      },
      crossStyle: {
        color: '#008acd'
      },
      shadowStyle: {
        color: 'rgba(200,200,200,0.2)'
      }
    }
  },

  grid: {
    borderColor: '#eee'
  },

  line: {
    smooth: true,
    symbol: 'emptyCircle',
    symbolSize: 3
  }
};
export default theme;
