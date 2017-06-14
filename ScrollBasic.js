/**
 * Created by xmg on 2017/6/1.
 */
/*
 *  获取scrollTop和scrollLeft 
 */
function scroll() {
    if(window.pageYOffset !== null){ // ie9+  和 最新浏览器
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }else if(document.compatMode == 'CSS1Compat'){ // 非怪异浏览器
        return{
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return{
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}
//封装显示
function show(tagId) {
    return document.getElementById(tagId).style.display = 'block';
}

//封装隐藏
function hide(tagId) {
    return document.getElementById(tagId).style.display = 'none';
}

function $(tagId) {
    return document.getElementById(tagId);
}
function client() {
    //1.判断是否是最新浏览器
    if(window.innerWidth!=null)
    {
        return{
            width:window.innerWidth,
            height:window.innerHeight
        }
    }
    //标准浏览器支持  w3c标准
    else if(document.compatMode=='CSS1Compat')
    {
        return{
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }
    //非标准模式浏览器
    else
    {
        return{
            width:document.body.clientWidth,
            height:document.body.clientHeight
        }
    }
}

//封装匀速动画框架
function constant(obj,speed,target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var speed1 = target>obj.offsetLeft?speed:-speed;
        obj.style.left = obj.offsetLeft+ speed1+'px';
        if(Math.abs(target-obj.offsetLeft)<Math.abs(speed1))
        {
            clearInterval(obj.timer);
            obj.style.left = target+'px';
        }
    },20);
}

//缓动动画
//{'width':800,'height':900,'left':100,'top':200,'scrollTop':200,'zIndex':70}
function buffer(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //定义一个旗帜(统一旗号)
        var isStop = true;
        //遍历
        for (var key in json)
        {
            //判断是否传入了透明度
            if ('opacity' == key)
            {
                var begin = parseInt( parseFloat(getCSSAttr(obj, key)*100));
                var target = parseInt(json[key]*100);
            }
            //其他情况处理px取值
            else
            {
                var begin = parseInt(getCSSAttr(obj, key));
                var target = parseInt(json[key]);
            }
            var speed = (target - begin) / 20;
            speed = target > begin ? Math.ceil(speed) : Math.floor(speed);

            //赋值的时候判断是不是opacity
            if('opacity'==key)
            {
                //先赋值opacity  //0.4
                obj.style.opacity = (begin +speed)/100;
                obj.style.filter = 'alpha(opacity:'+(begin+speed)+')';
            }
            //scrollTop的赋值
            else if ('scrollTop' == key) {
                obj.scrollTop = begin + speed;
            }
            //zInde层级
            else if('zIndex'==key)
            {
                obj.style.zIndex = parseInt(json[key]);
            }
            else
            {
                obj.style[key] = begin + speed + 'px';
            }
            //判断
            if (begin != target) {
                isStop = false;
            }
        }
        if (isStop) {
            clearInterval(obj.timer);
            //保证外部是否传入了回调,如果没有传入,有可能报错
            if (fn) {
                //执行回调
                fn();
            }

        }
    }, 20);
}
//封装一个获取css样式的函数
function getCSSAttr(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    //火狐和谷歌以及ie高版本
    else {
        return getComputedStyle(obj, null)[attr];
    }
}