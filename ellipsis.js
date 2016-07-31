function ellipsis(opts){
    var defaults = {
        width: 200,             //控制每行宽度        
        row: 1,                 //控制行数
        isFullWords: true,      //英文单词是否保持完整
        char: '...',            //文本以'...'结尾
        textAlign: 'justify',   //每行文本两端对齐
        target: 'e-wrap'        //文本的包裹容器
    }


    if( Object.prototype.toString(opts) === '[object Object]') { //判断传递的参数是否为对象
        for(name in opts) {
            defaults[name] = opts[name];
        }
        
        var trgt = document.querySelectorAll('.' + defaults.target);

        for(var i = 0,len = trgt.length; i < len; i++) {

            var self = trgt[i];
            var orgText = self.textContent;
            self.style.width = defaults.width + 'px';
            self.style.textAlign = defaults.textAlign;
            var orgHeight = self.clientHeight;
            

            self.textContent = 'a';
            var rowHeight = self.clientHeight;
            var lineHeight = self.currentStyle ? 
                self.currentStyle['lineHeight'] : parseFloat(getComputedStyle(self)['lineHeight'],10);
            var gapHeight = lineHeight > rowHeight ? lineHeight - rowHeight : 0;
            var trgtHeight = gapHeight * [defaults.row -1] + rowHeight * defaults.row;

            if(orgHeight <= trgtHeight) {
                self.textContent = orgText;
                return;
            }


            var start = 0,
                end = orgText.length,
                length = 0,
                selfHeight = 0;

            while(start < end) {
                length = Math.ceil((start + end)/2);

                self.textContent = orgText.slice(0, length) + defaults.char;

                selfHeight = self.clientHeight;
                if(selfHeight <= trgtHeight) {  //important: 必须小于等于，不然会出现设置2行只显示一行
                    start = length;
                } else {
                    end = length - 1;   //important: 必须减一，否则会出现死循环
                }
            }
            self.textContent = orgText.slice(0,start) + defaults.char;  //important: 必须是start而不是length,这个是临界点分析
        
            if(defaults.isFullWords) {
                self.textContent = orgText.slice(0,start).replace(/[\w]+$/,'') + defaults.char;
            }
        }
    }
}