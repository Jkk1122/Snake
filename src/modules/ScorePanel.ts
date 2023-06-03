
// 定义记分牌的类
class ScorePanel{
    score:number = 0;
    level:number = 0;
    // 分数和等级元素  在构造函数上进行初始化
    scoreEle:HTMLElement;
    levelEle:HTMLElement;

    // 设置等级限制
    maxLevel:number;
    // 设置升级门槛
    upScore:number;
    constructor(maxLevel:number = 10,upScore:number = 10){
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel
        this.upScore = upScore
    }

    // 设置一个加分的方法
    addScore(){
        if(this.score % this.upScore === 0){
            this.levelUp()
        }
        this.score++;
        this.scoreEle.innerHTML = this.score+''
    }
    // 等级提升
    levelUp(){
        // 等级上限
        if(this.level < this.maxLevel){
            this.level++;
            this.levelEle.innerHTML = this.level+''
        }
        
    }

}
export default ScorePanel