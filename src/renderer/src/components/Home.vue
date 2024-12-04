<template>
  <el-container class="full-container">
    <!-- 上部分 -->
    <el-header height="60px" class="header">
      <el-row>
        <el-col :span="12">当前分数: {{ currentScore }}</el-col>
        <el-col :span="12"> 历史高分: {{ highestRecord }} </el-col>
      </el-row>
    </el-header>

    <!-- 中间部分 -->
    <el-container>
      <!-- 中间内容 -->
      <el-main class="main">
        <canvas ref="gameCanvas" class="game-canvas"></canvas>
      </el-main>

      <!-- 右部分 -->
      <el-aside width="200px" class="aside">
        <div>Coming:</div>
        <canvas ref="nextTetrominoCanvas" width="100" height="100" class="next-tetromino-canvas">
        </canvas>

        <el-row justify="center" style="margin-top: 40px">
          <el-button @click="handleSpaceClick"> Turn </el-button>
        </el-row>
        <el-row justify="center" style="margin-top: 10px">
          <el-button @click="handleDirectionClick('up')">上</el-button>
        </el-row>
        <el-row justify="center">
          <el-button-group>
            <el-button @click="handleDirectionClick('left')">左</el-button>
            <el-button @click="handleDirectionClick('down')">下</el-button>
            <el-button @click="handleDirectionClick('right')">右</el-button>
          </el-button-group>
        </el-row>
      </el-aside>
    </el-container>

    <!-- 下部分 -->
    <el-footer height="60px" class="footer">
      <el-button type="primary" size="large" @click="startGame">开始</el-button>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const currentScore = ref<number>(1000)
const highestRecord = ref<string>('')

let intervalId: number | null = null

const handleKeyDown = (event: KeyboardEvent) => {
  if (intervalId !== null) return // 防止重复触发

  const clickButton = () => {
    switch (event.code) {
      case 'Space':
        handleSpaceClick()
        break
      case 'ArrowUp':
        handleDirectionClick('up')
        break
      case 'ArrowDown':
        handleDirectionClick('down')
        break
      case 'ArrowLeft':
        handleDirectionClick('left')
        break
      case 'ArrowRight':
        handleDirectionClick('right')
        break
    }
  }

  clickButton()
  intervalId = window.setInterval(clickButton, 200) // 每100毫秒触发一次
}

const handleKeyUp = () => {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

// 在 mounted 时更新分数
onMounted(async () => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  //currentScore.value = 100 // 示例值，可以根据实际情况更新
  highestRecord.value = await window.api.getHighestScore() // 示例值，可以根据实际情况更新
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})

// 监听main进程发送的分数变化事件
window.api.onHighScoreChanged((value) => {
  highestRecord.value = value
})

const startGame = async () => {
  // 启动游戏逻辑
  //测试：
  highestRecord.value = await window.api.addHighScore('John Doe', Math.floor(Math.random() * 10000))
}

const handleSpaceClick = () => {
  // 触发 space 按钮的点击事件
  console.log('Space button clicked!')
}
const handleDirectionClick = (direction: string) => {
  // 触发方向键的点击事件
  console.log(`Direction button ${direction} clicked!`)
}
</script>

<style scoped>
.full-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #409eff;
  color: #fff;
  line-height: 60px;
}

.header-content {
  width: 100%;
  padding: 0 20px;
}

.aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}

.main {
  padding: 0px;
}

.game-canvas {
  width: 100%;
  height: 100%;
  background-color: white;
  border: 1px solid #000;
}

.next-tetromino-canvas {
  background-color: white;
  border: 1px solid #000;
}

.space-button {
  margin-top: 20px;
}

.arrow-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px;
  justify-items: center;
}

.horizontal-buttons {
  grid-column: 1 / 4;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.footer {
  background-color: #409eff;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
</style>
