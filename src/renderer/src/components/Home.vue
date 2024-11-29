<template>
  <el-container class="full-container">
    <!-- 上部分 -->
    <el-header height="160px" class="header">
      <el-row justify="space-between" class="header-content">
        <el-col> 当前分数: {{ currentScore }} </el-col>
        <el-col> 历史高分: {{ highestScore }} </el-col>
        <el-col>
          <el-button type="warning">重置</el-button>
        </el-col>
      </el-row>
    </el-header>

    <!-- 中间部分 -->
    <el-container>
      <!-- 左部分 -->
      <el-aside width="200px" class="aside"> Left Sidebar </el-aside>

      <!-- 中间内容 -->
      <el-main class="main"> Main Content </el-main>

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
// import { ElContainer, ElHeader, ElAside, ElMain, ElFooter } from 'element-plus'

// const components = { ElContainer, ElHeader, ElAside, ElMain, ElFooter }
import { ref, onMounted } from 'vue'
const currentScore = ref(0)
const highestScore = ref(0)
const startGame = () => {
  console.log('start')
}

// 示例：在 mounted 时更新分数
onMounted(() => {
  currentScore.value = 100 // 示例值，可以根据实际情况更新
  highestScore.value = 200 // 示例值，可以根据实际情况更新
})
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
  text-align: center;
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
}

.footer {
  background-color: #409eff;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
</style>
