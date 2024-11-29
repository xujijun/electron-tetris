const CELL_SIZE = 20 // 每个方块的长度
const MOVE_DISTANCE = CELL_SIZE // 移动距离设为一个方块的长度

const tetrominoes = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1]
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1]
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1]
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1]
  ]
}

const colors = {
  I: '#00f0f0',
  O: '#f0f000',
  T: '#a000f0',
  S: '#00f000',
  Z: '#f00000',
  J: '#0000f0',
  L: '#f0a000'
}

const getRandomTetrominoType = (): keyof typeof tetrominoes => {
  const keys = Object.keys(tetrominoes) as Array<keyof typeof tetrominoes>
  return keys[Math.floor(Math.random() * keys.length)]
}

export class Tetromino {
  type: keyof typeof tetrominoes
  shape: number[][]
  color: string
  position: { x: number; y: number }

  constructor(type: keyof typeof tetrominoes = getRandomTetrominoType()) {
    this.type = type
    this.shape = tetrominoes[type]
    this.color = colors[type]
    this.position = { x: 3 * CELL_SIZE, y: 0 } // 初始位置，单位为像素
  }

  move(direction: 'left' | 'right' | 'down') {
    switch (direction) {
      case 'left':
        this.position.x -= MOVE_DISTANCE
        break
      case 'right':
        this.position.x += MOVE_DISTANCE
        break
      case 'down':
        this.position.y += MOVE_DISTANCE
        break
    }
  }

  getCells() {
    const cells: { x: number; y: number }[] = []
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x]) {
          cells.push({
            x: this.position.x + x * CELL_SIZE,
            y: this.position.y + y * CELL_SIZE
          })
        }
      }
    }
    return cells
  }
}
