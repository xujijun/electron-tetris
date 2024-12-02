import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      addHighScore(username: string, score: number): string
      getHighestScore(): string
      onHighScoreChanged(callback: (value) => void): unknown
    }
  }
}
