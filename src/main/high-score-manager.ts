import Store from 'electron-store'
import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

interface HighScore {
  username: string
  score: number
  date: string
}

class HighScoreManager {
  private store: Store<HighScore>
  private timeZone: string

  constructor() {
    this.store = new Store<HighScore>({ name: 'high-scores' })
    // 获取当地时区
    this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  // 清除所有历史数据
  async clearAll() {
    await this.store.clear()
  }

  // 添加一条高分记录
  async addHighScore(username: string, score: number) {
    if (!username || typeof username !== 'string' || username.trim() === '') {
      throw new Error('Invalid username')
    }
    if (typeof score !== 'number' || score <= 0) {
      throw new Error('Invalid score')
    }

    const highScores: HighScore[] = this.store.get('highScores', [])
    const zonedDate = toZonedTime(new Date(), this.timeZone)
    const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ss')
    const newScore: HighScore = { username, score, date: formattedDate }
    highScores.push(newScore)
    await this.store.set('highScores', highScores)
  }

  // 按时间倒序获取最近的高分记录
  async getRecentHighScores(limit: number): Promise<HighScore[]> {
    const highScores: HighScore[] = this.store.get('highScores', [])
    return highScores
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)
  }

  // 获取历史最高分记录
  async getHighestScore(): Promise<HighScore | null> {
    const highScores: HighScore[] = this.store.get('highScores', [])
    if (highScores.length === 0) {
      return null
    }
    return highScores.reduce((max, score) => (score.score > max.score ? score : max))
  }

  async getHighScoreStr(): Promise<string> {
    const highestScore = await this.getHighestScore()
    if (highestScore) {
      return highestScore.username + ' - ' + highestScore.score
    } else {
      return '无'
    }
  }
}

export default HighScoreManager
