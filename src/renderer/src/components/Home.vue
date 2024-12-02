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
      <el-main class="main"> Main Content </el-main>
      <!-- 右部分 -->
      <el-aside width="200px" class="aside">Right Sidebar</el-aside>

      <!-- 右部分（如果需要，可以添加右边栏） -->
      <!-- <el-aside width="200px" class="aside">
        Right Sidebar
      </el-aside> -->
    </el-container>

    <!-- 下部分 -->
    <el-footer height="60px" class="footer">
      <el-button type="primary" @click="startGame">开始</el-button>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentScore = ref(1000)
const highestRecord = ref('')

// 在 mounted 时更新分数
onMounted(async () => {
  //currentScore.value = 100 // 示例值，可以根据实际情况更新
  highestRecord.value = await window.api.getHighestScore() // 示例值，可以根据实际情况更新
})

// 监听分数变化
window.api.onHighScoreChanged((value) => {
  highestRecord.value = value
})

const startGame = async () => {
  // 启动游戏逻辑
  //测试：
  highestRecord.value = await window.api.addHighScore('John Doe', Math.floor(Math.random() * 10000))
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
  line-height: 200px;
}

.main {
  background-color: #e5e9f2;
  color: #333;
  text-align: center;
  line-height: 200px;
  flex: 1;
}

.footer {
  background-color: #409eff;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
</style>
