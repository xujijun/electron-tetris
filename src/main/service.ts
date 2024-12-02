import { ipcMain } from 'electron'
import HighScoreManager from './high-score-manager'

// 创建一个高分管理实例
const highScoreManager = new HighScoreManager()

const createIPCHandlers = () => {
  ipcMain.handle('add-high-score', async (_, username: string, score: number) => {
    await highScoreManager.addHighScore(username, score)
    return highScoreManager.getHighScoreStr()
  })

  ipcMain.handle('get-highest-score', async () => {
    return highScoreManager.getHighScoreStr()
  })
}

export { highScoreManager, createIPCHandlers }
