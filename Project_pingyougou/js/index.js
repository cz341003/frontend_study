window.addEventListener('load', function() {
    //鼠标经过显示箭头按钮，鼠标离开消失
    var focuss = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    var focussWidth = focuss.offsetWidth;
    focuss.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focuss.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click();
        }, 2000);
    });

    //动态生成小圆圈
    var ul = focuss.querySelector('ul');
    var ol = focuss.querySelector('ol');
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个小li 
        var li = document.createElement('li');
        li.setAttribute('index', i);
        // 把小li插入到ol 里面
        ol.appendChild(li);
        ol.children[0].className = 'focus_dotted';
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'focus_dotted';
            var index = this.getAttribute('index');
            animate(ul, -index * focussWidth);
        });
    }
    //点击变化图片
    ul.appendChild(ul.children[0].cloneNode(true));
    var num = 0;
    var circle = 0;
    var flag = true;

    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focussWidth, function() {
                flag = true;
            });

            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });


    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focussWidth + 'px';

            }
            num--;
            animate(ul, -num * focussWidth, function() {
                flag = true;
            });

            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    });



    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'focus_dotted';
    }
    var timer = setInterval(function() {
        //手动调用点击事件
        arrow_r.click();
    }, 2000);
});