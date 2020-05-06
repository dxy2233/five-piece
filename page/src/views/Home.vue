<template>
  <div class="home">
    <canvas id="checkerboard" @click="drop"></canvas>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      status: true, // 黑:true, 白:false
      canvasDom: '',
      blackPoint: [],
      whitePoint: [],
      pieceSpace: '',
      lrPadding: '',
      tbPadding: '',
    }
  },
  mounted() {
    this.createBoard()
  },
  methods: {
    createBoard() {
      let board = document.getElementById('checkerboard')
      let width = board.offsetWidth
      let height = board.offsetHeight
      this.canvasDom = board.getContext('2d')
      board.width = width
      board.height = height
      this.canvasDom.strokeStyle = '#5B5B5B'
      this.pieceSpace = ((width - height > 0 ? height : width) - 30) / 14
      this.lrPadding = (width - this.pieceSpace * 14) / 2
      this.tbPadding = (height - this.pieceSpace * 14) / 2
      for (let i = 0; i < 15; i++) {
        this.canvasDom.moveTo(
          i * this.pieceSpace + this.lrPadding,
          this.tbPadding
        )
        this.canvasDom.lineTo(
          i * this.pieceSpace + this.lrPadding,
          this.pieceSpace * 14 + this.tbPadding
        )
        this.canvasDom.stroke()
      }
      for (let i = 0; i < 15; i++) {
        this.canvasDom.moveTo(
          this.lrPadding,
          i * this.pieceSpace + this.tbPadding
        )
        this.canvasDom.lineTo(
          this.pieceSpace * 14 + this.lrPadding,
          i * this.pieceSpace + this.tbPadding
        )
        this.canvasDom.stroke()
      }
    },
    clearBoard() {
      // 重绘画布
      this.canvasDom.clearRect(0, 0, 10000, 10000)
      this.createBoard()
      // 清空数组
      this.blackPoint = []
      this.whitePoint = []
      this.status = true
    },
    drop(e) {
      // 确定点位&防止超出棋盘
      let pointX = Math.floor(
        (e.offsetX - this.lrPadding + this.pieceSpace / 2) / this.pieceSpace
      )
      let pointY = Math.floor(
        (e.offsetY - this.tbPadding + this.pieceSpace / 2) / this.pieceSpace
      )
      if (pointX > 15 || pointX < 0 || pointY > 15 || pointY < 0) return
      // 判断是否能落子
      const isOccupy = [...this.blackPoint, ...this.whitePoint].some((item) => {
        return item.toString() === [pointX, pointY].toString()
      })
      if (isOccupy) return
      // 绘图
      this.canvasDom.beginPath()
      this.status
        ? (this.canvasDom.fillStyle = '#000')
        : (this.canvasDom.fillStyle = '#fff')
      this.canvasDom.arc(
        this.lrPadding + pointX * this.pieceSpace,
        this.tbPadding + pointY * this.pieceSpace,
        this.pieceSpace / 3,
        0,
        2 * Math.PI,
        true
      )
      this.canvasDom.fill()
      this.canvasDom.closePath()
      // 胜利判断
      let curretPoint = this.status ? this.blackPoint : this.whitePoint
      curretPoint.push([pointX, pointY])
      if (this.legal(curretPoint, pointX, pointY)) {
        setTimeout(() => {
          alert(`${this.status ? '黑' : '白'}子胜！`)
          this.clearBoard()
        }, 0)
        return
      }
      // 更改棋子角色
      this.status = !this.status
    },
    legal(pointArray, x, y) {
      if (pointArray.length < 5) return
      // 横向判断
      function row() {
        const rowPoint = pointArray
          .filter((item) => item[1] === y)
          .map((item) => item[0])
          .sort((a, b) => a - b)
        if (rowPoint.length < 5) return
        for (let i = 0; i <= rowPoint.length - 4; i++) {
          let count = 1
          for (let j = 1; j < 5; j++) {
            if (rowPoint[i + j] === rowPoint[i] + j) count = count + 1
            else break
          }
          if (count === 5) return true
        }
      }
      if (row()) return true
      // 纵向判断
      function col() {
        const colPoint = pointArray
          .filter((item) => item[0] === x)
          .map((item) => item[1])
          .sort((a, b) => a - b)
        if (colPoint.length < 5) return
        for (let i = 0; i <= colPoint.length - 4; i++) {
          let count = 1
          for (let j = 1; j < 5; j++) {
            if (colPoint[i + j] === colPoint[i] + j) count = count + 1
            else break
          }
          if (count === 5) return true
        }
      }
      if (col()) return true
      // 斜下判断
      function slantDown() {
        const slantDownPoint = pointArray
          .filter((item) => x - item[0] === y - item[1])
          .map((item) => item[0])
          .sort((a, b) => a - b)
        if (slantDownPoint.length < 5) return
        for (let i = 0; i <= slantDownPoint.length - 4; i++) {
          let count = 1
          for (let j = 1; j < 5; j++) {
            if (slantDownPoint[i + j] === slantDownPoint[i] + j)
              count = count + 1
            else break
          }
          if (count === 5) return true
        }
      }
      if (slantDown()) return true
      // 斜上判断
      function slantUp() {
        const slantUpPoint = pointArray
          .filter((item) => x - item[0] === -(y - item[1]))
          .map((item) => item[0])
          .sort((a, b) => a - b)
        if (slantUpPoint.length < 5) return
        for (let i = 0; i <= slantUpPoint.length - 4; i++) {
          let count = 1
          for (let j = 1; j < 5; j++) {
            if (slantUpPoint[i + j] === slantUpPoint[i] + j) count = count + 1
            else break
          }
          if (count === 5) return true
        }
      }
      if (slantUp()) return true
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  border: 1px solid black;
  box-sizing: border-box;
  #checkerboard {
    width: 100%;
    height: 70%;
    background: #ff8c00;
  }
}
</style>
