import { ipcMain } from 'electron'
import HighScoreManager from './high-score-manager'

// 创建一个高分管理实例
const highScoreManager = new HighScoreManager()

const createIPCHandlers = () => {
  ipcMain.handle('add-high-score', async (_, username: string, score: number) => {
    await highScoreManager.addHighScore(username, score)
  })

  ipcMain.handle('get-highest-score', async () => {
    const highestScore = await highScoreManager.getHighestScore()
    if (highestScore) {
      return highestScore.username + ' - ' + highestScore.score
    } else {
      return '无'
    }
  })
}

export { highScoreManager, createIPCHandlers }
