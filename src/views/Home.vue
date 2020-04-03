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
      canvasDom: ''
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
      // let num =
      //   width - height > 0 ? Math.floor(height / 30) : Math.floor(width / 30)
      let wNum = Math.floor(width / 30)
      let hNum = Math.floor(height / 30)
      // let ctx = board.getContext('2d')
      this.canvasDom = board.getContext('2d')
      board.width = width
      board.height = height
      // for (var i = 0; i < num + 1; i++) {
      //   ctx.moveTo(i * 30, 0)
      //   ctx.lineTo(i * 30, 30 * num)
      //   ctx.stroke()
      //   ctx.moveTo(0, i * 30)
      //   ctx.lineTo(30 * num, i * 30)
      //   ctx.stroke()
      // }
      this.canvasDom.strokeStyle = '#A9A9A9'
      for (let i = 0; i < wNum + 1; i++) {
        this.canvasDom.moveTo(i * 30, 0)
        this.canvasDom.lineTo(i * 30, 30 * hNum)
        this.canvasDom.stroke()
      }
      for (let i = 0; i < hNum + 1; i++) {
        this.canvasDom.moveTo(0, i * 30)
        this.canvasDom.lineTo(30 * wNum, i * 30)
        this.canvasDom.stroke()
      }
    },
    drop(e) {
      let pointX = Math.floor((e.offsetX + 15) / 30)
      let pointY = Math.floor((e.offsetY + 15) / 30)
      this.canvasDom.beginPath()
      this.status
        ? (this.canvasDom.fillStyle = '#000')
        : (this.canvasDom.fillStyle = '#DCDCDC')
      this.canvasDom.arc(pointX * 30, pointY * 30, 10, 0, 2 * Math.PI, true)
      this.canvasDom.fill()
      this.canvasDom.closePath()
      this.status = !this.status
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 20px;
  #checkerboard {
    width: 100%;
    height: 100%;
  }
}
</style>
