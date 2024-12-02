import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      addHighScore(username: string, score: number): unknown
      getHighestScore(): string
      onHighScoreCleared(callback: () => void): unknown
    }
  }
}
