	// 构造函数
	function Move(obj){  
	        this.content = null;   
			this.mouseX = 0;   //鼠标x坐标
			this.mouseY = 0;	//鼠标的y坐标
			this.popX = 0;    //对话框的位置
			this.popY =0;
			this.isDrag = false; //不可以拖动
			// this.callback=obj.callback;
			// 自定义的参数
	        this.obj = {
	            width:obj._w,       //默认宽
	            height:obj._h,			//默认高
	            title:obj._title,     //顶部文字
				color:obj._color,
				cont:obj._cont,
				bg:obj.bg,
				callback:obj.callback
	        };
			this.create();
			this.closeWrap();
			this.drag(); //调用拖动函数
	    }
		
	
	   // 创建DOM节点  
	Move.prototype.create = function(){
	        this.content = document.createElement("div");
	        this.content.className = "login";
			this.content.style.background = this.obj.bg;
	        this.content.innerHTML =" <div class='title' style=color:"+this.obj.color+">"+this.obj.title+"<a id='close'>x</a></div>"+"<div class='content' style=color:"+this.obj.color+">"+this.obj.cont+"<button class='left' id='left1'>确定</button><button class='right' id='right'>取消</button></div>";
	        document.body.appendChild(this.content);
	        this.setData();
			this.obj.callback.call(window);
			// console.log(111111);
	};		
	
	// 返回整个网页的宽
	 Move.prototype.clientWidth = function(){
		return document.documentElement.clientWidth;	 
	};
	// 返回整个网页的高
	Move.prototype.clientHeight = function(){
	      return document.documentElement.clientHeight;
	};
	// div在网页中的位置：居中
	Move.prototype.setData = function(){
			// login的宽  是 300
			this.content.style.width = this.obj.width + "px";
			// login的高  300
	        this.content.style.height = this.obj.height + "px";
			// div距离左边的位置：(整个网页的宽 - div的宽) / 2
	            this.content.style.left = (this.clientWidth() -this.content.offsetWidth)/2 + "px";
			// div距离上边的距离：(整个网页的高 - div的高) /2
	        this.content.style.top = (this.clientHeight() -this.content.offsetHeight)/2 + "px";
	   
	};  
	 // 按下 并拖动 弹窗的代码
	 Move.prototype.drag = function(){
		  var that = this;
		  // 当鼠标按下时
		 this.content.onmousedown= function(event){
		 	 // var event = event || window.event;
		 	 that.mouseX = event.pageX;  //点击鼠标时的x坐标
		 	  that.mouseY = event.pageY; //点击鼠标时的Y坐标
		 	  that.popX = that.content.offsetLeft;
		 	  that.popY = that.content.offsetTop;
		 	 that.isDrag = true; // 表示可以拖动对话框
		 	 console.log("按下了");
		 };
		 
		 // 当鼠标按下并移动时
		 this.content.onmousemove = function(event){
			 console.log("开始移动");
			 // var event = event || window.event;
			 var x = event.pageX;  //移动时x坐标
			 var y = event.pageY;  //移动时y坐标
			 // 判断对话框能否拖动
			 if(that.isDrag){
				 //鼠标移动的坐标偏移量：用对话框的位置（对话框top，left值）加上这个偏移量就是对话框新的位置；
				 var x1 = that.popX + x - that.mouseX;  //移动后对话框新的的left;
				 var y1 = that.popY + y - that.mouseY;  //移动后对话框新的的top;
				 
				 that.content.style.left = x1 + "px";   //重新设置对话框的left
				 that.content.style.top = y1 + "px";    //重新设置对话框的top
			 }
		 };
		 
		 // 当鼠标离开时
		 this.content.onmouseup = function(){
			 that.isDrag = false;   //不能拖动对话框了
		 };
	 };
	
	 
	
		
	// 移除div
	 Move.prototype.closeWrap = function(){
	      var close = document.getElementById("close");
	      var that  = this;
	      close.onclick = function(){
	         document.body.removeChild(that.content);
	      };
		  right.onclick = function(){
			  document.body.removeChild(that.content);
		  };
		  left1.onclick = function(){
		  	document.body.removeChild(that.content);
			alert("我太难了");
		  };
	}; 
	
	