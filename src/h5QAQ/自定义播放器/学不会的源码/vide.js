(function () {
    // 获取元素
    var videoEle = document.querySelector('#video');  // 获取video元素
    var controlBar = document.querySelector('#controlBar'); // 获取控制条元素
    var startBtn = controlBar.querySelector('.start');  // 获取开始按钮
    var stopBtn = controlBar.querySelector('.stop');  //获取结束按钮
    var progress = document.querySelector('#progress');  // 获取主进度条
    var progressSlide = progress.querySelector('.progress-slider');  // 获取主进度条的滑块
    var progressPlayed = progress.querySelector('.progress-played');  // 进度元素
    var nowTime = controlBar.querySelector('.time .now');  // 当前时间的元素
    var allTime = controlBar.querySelector('.time .all');  // 总时间的元素
    var fullScreenBtn = controlBar.querySelector('.fullscreen span');
    var isFullScreen = false;  // 是否全屏
    var volumeBtn = controlBar.querySelector('.volume-btn span');  // 声音按钮
    var volumeProgress = document.querySelector('#volumeProgress');  // 声音进度条
    var volumeProgressSlide = volumeProgress.querySelector('.progress-slider');  // 声音进度条滑块
    var volumeProgressPlayed = volumeProgress.querySelector('.progress-played'); // 声音进度条进度


    // 设置video的大小
    videoEle.width = window.innerWidth;   // video元素宽 = 视口宽度
    videoEle.height = window.innerHeight - controlBar.offsetHeight;   // video元素高 = 视口高度 - 控制条高度

    // 监听视口大小发生变化
    window.addEventListener('resize', function(){
        // 设置video的大小
        videoEle.width = window.innerWidth;   // video元素宽 = 视口宽度
        videoEle.height = window.innerHeight - controlBar.offsetHeight;
    });

    // 监听视频资源 加载完毕
    videoEle.addEventListener('loadedmetadata', function () {
        // 设置视频总时间
        allTime.innerHTML = changeTime(this.duration);
    });

    // 单击开始播放按钮
    startBtn.addEventListener('click', function () {
        if (videoEle.paused) {
            // 播放
            videoEle.play();
            // 设置按钮
            this.classList.add('active');

        } else {
            // 暂停
            videoEle.pause();
            // 设置按钮图标
            this.classList.remove('active');
        }
    });

    // 单击 停止按钮
    stopBtn.addEventListener('click', function () {
        videoEle.currentTime = 0;  // 视频从头开始
        videoEle.pause();
        startBtn.classList.remove('active');
    });


    // 监听 视频的 timeupdate事件
    videoEle.addEventListener('timeupdate', function () {
        // 获取播放进度
        var scale = videoEle.currentTime / videoEle.duration;

        // 设置滑块位置 和 进度元素的元素
        progressSlide.style.left = progressPlayed.style.width = (progress.clientWidth - progressSlide.offsetWidth) * scale + 'px';

        // 实时的显示当前时间
        nowTime.innerHTML = changeTime(this.currentTime);
    });

    // 监听 视频播放完毕
    videoEle.addEventListener('ended', function () {
        startBtn.classList.remove('active');
    });

    // 监听主进度条 拖拽
    dragProgress(progress, progressSlide, progressPlayed, function(scale){
        // 调整视频进度
        videoEle.currentTime = videoEle.duration * scale;
    });


    // 全屏按钮 单击事件
    fullScreenBtn.addEventListener('click', function () {
        if (isFullScreen) {
            // 取消全屏
            fullScreenBtn.classList.remove('active');
            isFullScreen = false;
            // w3c
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            // firfox
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            // chrome safari
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            // ie
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }

        } else {
            // 设置全屏
            fullScreenBtn.classList.add('active');
            isFullScreen = true;
            // var docElm = document.documentElement;
            var docElm = document.querySelector('#player');
            //W3C
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            //FireFox
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            //Chrome、safari等
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
            //IE11
            else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
        }
    });

    document.addEventListener('fullscreenchange', fullScreenChangeFn);
    document.addEventListener('webkitfullscreenchange', fullScreenChangeFn);  // Edje 会触发
    document.addEventListener('mozfullscreenchange', fullScreenChangeFn);
    document.addEventListener('msfullscreenchange', fullScreenChangeFn);  // IE下无效果然

    /**
     * 监听屏幕变化的函数
     */
    function fullScreenChangeFn(){
        // 判断是否是全屏
        var  isFull = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.webkitIsFullScreen || document.mozFullScreen;

        if (isFull) {
            // 全屏状态
            fullScreenBtn.classList.add('active');
            isFullScreen = true;
        } else {
            // 非全屏状态
            fullScreenBtn.classList.remove('active');
            isFullScreen = false;
        }

    }


    // 设置声音进度条和声音进度条滑块
    volumeProgressSlide.style.left = volumeProgressPlayed.style.width = volumeProgress.clientWidth - volumeProgressSlide.offsetWidth + 'px';

    // 声音按钮 单击
    volumeBtn.addEventListener('click', function () {
        if (videoEle.muted) {
            // 设置为不静音
            videoEle.muted = false; // 不静音
            this.classList.remove('active');
        } else {
            // 设置为静音
            videoEle.muted = true;  // 设置静音
            this.classList.add('active');
        }
    });

    // 声音进度条 可以拖动 点击
    dragProgress(volumeProgress, volumeProgressSlide, volumeProgressPlayed, function(scale){
        // 调整音量
        videoEle.volume = scale;

        if (scale === 0) {
            volumeBtn.classList.add('active');
            volumeBtn.muted = true;
        } else {
            volumeBtn.classList.remove('active');
            volumeBtn.muted = false;
        }
    });


    /***
     *  封装 拖动和点击 滚动条函数
     *  @param: progress 进度条包裹元素
     *  @param：progressSlide 进度条滑块
     *  @param：progressPlayed  进度条
     *  @param: callback 回调函数
     */
    function dragProgress(progress, progressSlide, progressPlayed, callback) {
        // 进度条容器 单击事件
        progress.addEventListener('click', function (event) {
            // 计算鼠标在进度条容器上的位置
            var left = event.clientX - progress.offsetLeft;

            // 调用函数 设置滑块位置 进度条宽度 播放进度
            setVideoProgress(left);
        });

        // 进度条滑块 mousedown
        progressSlide.addEventListener('mousedown', function (event) {
            // 阻止默认行为
            event.preventDefault();

            // 计算鼠标在滑块上的位置  （水平位置） (作为滑块对象的属性)
            this.eleLeft = event.offsetX;

            // 监听鼠标移动 document
            document.addEventListener('mousemove', scrollProgress);

        });

        // document 监听mouseup
        document.addEventListener('mouseup', function () {
            this.removeEventListener('mousemove', scrollProgress)
        });

        /**
         * 鼠标移动监听的函数
         */
        function scrollProgress(event){
            // 计算滑块位置
            var dstLeft = event.clientX - progress.offsetLeft - progressSlide.eleLeft;

            // 调用函数 设置滑块位置 进度条宽度 视频播放进度
            setVideoProgress(dstLeft);
        }

        /**
         * 设置滑块位置，进度条宽度，视频播放进度
         * 参数： 计算好的滑块位置
         */
        function setVideoProgress(dstLeft) {
            // 计算滑块最大的滑动距离
            var maxValue = progress.clientWidth - progressSlide.offsetWidth;

            // 范围限定
            if (dstLeft < 0) {
                dstLeft = 0;
            } else if (dstLeft > maxValue) {
                dstLeft = maxValue;
            }

            // 设置滑块位置
            progressSlide.style.left = dstLeft + 'px';

            // 设置进度条宽度
            progressPlayed.style.width = dstLeft + 'px';

            // 滑块滑动的距离 比上 最大可滑动距离
            var scale = dstLeft / maxValue;

            //调用回调函数
            callback(scale);
        }
    }



    /**
     * 时间格式换算函数
     * 参数： 描述
     * 返回结果： 01:34:08
     */
    function changeTime(seconds) {

        var h = Math.floor(seconds / 3600);  // 获取小时数
        seconds -= h * 3600;  // 计算剩下的秒数（不够一小时）
        var m = Math.floor(seconds / 60); // 获取分钟数
        var s = Math.floor(seconds -= m * 60);   // 剩下秒数

        // 不够两位数前面补0
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;

        // 返回结果
        return h + ':' + m + ':' + s;
    }
})();