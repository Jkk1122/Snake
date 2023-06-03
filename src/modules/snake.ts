// 蛇的类
class Snake{
    // 表示蛇的元素
    head:HTMLElement;
    // 蛇头
    bodies:HTMLCollection
    // 蛇的容器
    element:HTMLElement;
    constructor(){
        this.head = document.querySelector('#snakes>div') as HTMLElement
        this.bodies = document.getElementById('snakes')!.getElementsByTagName('div')!
        this.element = document.getElementById('snakes')!
         
    }
    // 获取蛇的坐标
    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop
    }
    //设置蛇头坐标 
    set X(value){
        // 如果值不改变则不修改
        if(this.X === value){
            return;
        }
        // X的合法值为0-290之间
        if(value < 0 || value > 290){
            // 蛇撞墙了
            throw new Error('蛇撞墙了啊！')
        }
        // 修改X的时候，是在修改水平坐标，蛇在左右移动  向左不能向右  
        // 当存在第二节身体并且第二节身体和头的位置一致的时候，那么说明存在掉头情况
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            if(value >this.X){
                // 新值大于旧值  说明蛇要掉头向右走，此时应该继续向左走
                value = this.X -10
            }else{
                // 否则，是要向左掉头，应该继续向右走
                value = this.X +10
            }
        }

        // 移动身体
        this.MoveBody()

        this.head.style.left =`${value}px`
        // 检查有没有撞到自己
        this.checkHeadBody()

    }
    set Y(value){
        // 如果值不改变则不修改
        if(this.Y === value){
            return;
        }
        if(value < 0 || value > 290){
            // 蛇撞墙了
            throw new Error('蛇撞墙了啊！')
        }

        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            if(value > this.Y){
                // 此时 说明蛇想想向下掉头，应该向上走
                value = this.Y -10
            }else{
                // 否则，想向上掉头，要继续向下走
                value = this.Y + 10
            }
        }
        
        // 移动身体
        this.MoveBody()
        this.head.style.top = `${value}px`
        // 检查有没有撞到自己
        this.checkHeadBody()
    }
    // 蛇增加身体
    addBody(){
        // 向element中添加身体
        this.element.insertAdjacentHTML('beforeend',"<div></div>")
        console.log(this.bodies);
        
    }

    // 添加蛇移动身体的方法
    MoveBody(){
        console.log(this.bodies.length);
        
        /*
            将后边的身体设置为前面身体的位置
        */ 
    //    遍历获取所有身体
        for(let i =this.bodies.length-1; i>0; i--){
            // 获取前面身体位置
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
            console.log(X,Y);
            
            // 将值设置到当前身体
            (this.bodies[i] as HTMLElement).style.left = X +'px';
            (this.bodies[i] as HTMLElement).style.top = Y +'px';
        }
    }

    // 检查身体头部是否相撞
    checkHeadBody(){
        // 获取所有身体
        for(let i=1 ; i<this.bodies.length ; i++){
            let bd = this.bodies[i] as HTMLElement
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                throw new Error('不是吧，撞到自己了')
            }
                
        }
    }
}
export default Snake