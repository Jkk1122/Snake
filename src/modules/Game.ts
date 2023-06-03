import Snake from "./snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";
// 游戏控制器
class GameControl{
    // 蛇
    snake:Snake;
    // 食物
    food:Food;
    // 记分牌
    scorePanel:ScorePanel;

    // 创建一个属性来存储蛇的移动方向
    direction:string = ''

    mask:HTMLElement;

    // 蛇是否存活
    isLive:boolean = true

    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel()
        this.mask = document.getElementById('main')!
        this.init()
    }

    // 游戏初始化方法，调用后游戏开始
    init(){
        // 绑定键盘按键按下的事件
        document.addEventListener('keydown',this.keydownHandler.bind(this))

        // 调用run方法，让蛇移动
        this.run()
        
    }

    // 创建一个按键按下的响应函数
    keydownHandler(event:KeyboardEvent){
        // 对数据进行判断，非方向按键不能存

        // 修改direction属性
        this.direction = event.key
        
        
    }

    // 控制蛇移动
    run(){
        //根据方向移动
        /*
            上：top减少
            下：top变大
            左：left减小
            右:right变大
        */ 
        //获取蛇的坐标
        
        let X = this.snake.X
        let Y = this.snake.Y
        
        // 检查是否吃到
        this.checkEat(X,Y)

        // 根据按键方向计算XY值
        switch (this.direction) {
            //向左
            case 'ArrowLeft':
                X -=10
                break;
            // 向右
            case 'ArrowRight':
                X +=10
                break;
            // 向上
            case 'ArrowUp':
                Y -=10
                break;
            // 向下
            case 'ArrowDown':
                Y +=10
                break;
        }

        // 修改XY值
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (error:any) {
            alert(error.message +'你有点捞！')
            this.isLive = false
            this.snake.X = 0;
            this.snake.Y =0;
        }

        // 开启一个定时器
        this.isLive && setTimeout(this.run.bind(this),300-(this.scorePanel.level - 1)*30)
    }

    // 检测蛇是否吃到食物
    checkEat(X:number,Y:number){
        if(X == this.food.X && Y == this.food.Y){
            // 加分
            this.scorePanel.addScore();
            console.log('吃到食物了');
            
            // 增加蛇的长度
            this.snake.addBody()
            // 更新食物的位置
            this.food.change()
        }
    }

}
export default GameControl