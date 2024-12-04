import { app, BrowserWindow, dialog, Menu } from 'electron'
import { highScoreManager } from './service'

const createMenu = (mainWindow: BrowserWindow) => {
  const menuTemplate = [
    {
      label: 'Game',
      submenu: [
        {
          label: 'Top Scores',
          click: showRecentHighScores
        },
        {
          label: 'Clear Scores',
          click: () => clearAllScores(mainWindow)
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: about
        },
        {
          label: 'Exit',
          click: () => quit(mainWindow)
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
}

export { createMenu }

const showRecentHighScores = () => {
  // 获取最近10条高分记录并显示在对话框中
  highScoreManager.getRecentHighScores(10).then((recentHighScores) => {
    const highScoresText = recentHighScores
      .map((score, index) => `${index + 1}. ${score.username} - ${score.score} (${score.date})`)
      .join('\n')

    dialog.showMessageBox({
      type: 'info',
      title: '历史高分',
      message: '最近10条高分记录:',
      detail: highScoresText,
      buttons: ['确定']
    })
  })
}

const clearAllScores = (mainWindow: BrowserWindow) => {
  const response = dialog.showMessageBoxSync(mainWindow, {
    type: 'question',
    buttons: ['确定', '取消'],
    defaultId: 1,
    title: '确认清空',
    message: '真的要清空所有历史高分吗？'
  })
  if (response === 0) {
    highScoreManager.clearAll().then(() => {
      mainWindow.webContents.send('high-score-changed', '无')
      dialog.showMessageBox({
        type: 'info',
        title: '历史高分',
        message: '已清空历史高分',
        buttons: ['确定']
      })
    })
  }
}

const about = () => {
  const versions = process.versions

  dialog.showMessageBox({
    type: 'info',
    title: '关于',
    message: '俄罗斯方块',
    detail: `版本号: ${app.getVersion()}\nElectron: v${versions.electron}\nChromium: v${versions.chrome}\nNode: v${versions.node}\n简介: 我是很厉害的游戏。`,
    buttons: ['确定']
  })
}
const quit = (mainWindow: BrowserWindow) => {
  const response = dialog.showMessageBoxSync(mainWindow, {
    type: 'question',
    buttons: ['取消', '退出'],
    defaultId: 1,
    title: '确认退出',
    message: '你真的要退出吗？要不要先保存一下现有结果？'
  })
  if (response === 1) {
    app.quit()
  }
}
