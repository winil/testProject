// no UI
class OthelloPattern {
    constructor() {
        this.board = [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 2, 1, 0, 0, 0,
            0, 0, 0, 1, 2, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
        ]
    }
    move(ox, oy, color, checkOnly = false) {
        let direction = [
            [-1, -1], //左上
            [0, -1], //左
            [1, -1], //左下
            [-1, 0], //上
            [1, 0], //下
            [-1, 1], //右上
            [0, 1], //右
            [1, 1], //右下
        ]
        if (this.board[oy * 8 + ox] !== 0) {
            return;
        }
        let canMove = false;//是否可翻转
        for (let item of direction) {

            let isNext = false;//是否可下子
            let directionCanMove = false;
            let x = ox, y = oy;

            while (true) {
                if (x < 0 || x > 7 || y < 0 || y > 7) {
                    break;
                }
                x += item[1]
                y += item[0]

                if (this.board[y * 8 + x] === 3 - color) {
                    isNext = true;
                }
                if (this.board[y * 8 + x] === color) {
                    if (isNext) {
                        directionCanMove = true;
                    }

                    break;
                }
                if (this.board[y * 8 + x] === 0) {//在空白处检查周围无子时退出循环
                    break;
                }
            }

            while (true) {
                if (x === ox && y === oy) {
                    break;
                }
                x -= item[1]
                y -= item[0]
                if (directionCanMove && !checkOnly) {
                    this.board[y * 8 + x] = color;
                }
            }
            canMove = canMove || directionCanMove;


        }
        return canMove;
    }
}

// no UI 
class OthelloGame {
    constructor() {
        this.color = 1;//1黑色 2白色
        this.pattern = new OthelloPattern()
    }
    move(x, y) {
        const bool = this.pattern.move(x, y, this.color)
        if (bool) {
            this.color = 3 - this.color //变色
        }
        if (!this.checkPass()) {
            this.color = 3 - this.color
            if (!this.checkPass()) {
                alert(`Game Over!`)
            }
        }
    }
    // 检测是否通过
    checkPass() {
        let bool = false;
        for (let i = 0; i < 64; i++) {
            let x = i % 8, y = Math.floor(i / 8);
            if (this.pattern.move(x, y, this.color, true)) {
                bool = true;
                break;
            }
        }
        return bool;
    }
}