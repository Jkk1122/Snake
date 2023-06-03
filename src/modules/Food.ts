class Food{
    // 定义一个属性表示的食物所对应的元素
    element:HTMLElement;
    constructor(){
        // 加上！表示不为空
        // 获取food元素将其赋值为element
        this.element = document.getElementById('food')!;
    }

    // 定义一个获取x轴的方法
    get X(){
        return this.element.offsetLeft
    }
    // 定义一个获取y轴的方法
    get Y(){
        return this.element.offsetTop
    }
    // 定义修改食物位置的方法
    change(){
        // 生成随机的位置
        // 食物位置最小0 最大290
        // 蛇移动一次10px  食物坐标必须是10的倍数
        // 先0-29 再整体*10
        let left = Math.round(Math.random()*29)*10;
        let top = Math.round(Math.random()*29)*10;
        // 将生成的随机坐标给原来left和top的值
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
    }
}
export default Food