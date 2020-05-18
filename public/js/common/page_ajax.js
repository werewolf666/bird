/**
 * Created by zqf on 2018/10/9.
 */
function pagination(opt){
	var pager={
		paginationBox:'pagination-box',
		mainBox:'main-box-nick',//内容盒子
		numBtnBox:'num-box-nick',//数字按钮盒子
		btnBox:'btn-box-nick',//按钮盒子
		ipt:'page-ipt-nick',//input class
		goBtn:'go-btn-nick',//go btn class
		currentBtn:'active-nick',//选中状态class
		totalNum:'',//总条数 --必填
		pageCount:'',//每页显示几条数据 -- 必填
		numBtnCount:3,//显示的数字按钮个数
		currentPage:1,//当前页码data-page，首屏默认值
		maxCount:0,//ajax请求数据分成的最大页码,
		isshowTatalNum:false,//是否显示 总记录数
		data:[],//ajax请求的数据
		callback:'',//回调函数
		selectBack:'',// 下拉回调
		previous: "＜",//上一页
		next: "＞",//下一页
	};
	pager = $.extend(pager,opt);

	//创建按钮
	function createBtn(){
		//最大页
		pager.maxCount=pager.totalNum % pager.pageCount ? parseInt(pager.totalNum / pager.pageCount) +1 :
		pager.totalNum / pager.pageCount;
		if(pager.maxCount<=10){
			$('.'+pager.paginationBox).html(
				'<div class="'+pager.mainBox+'"></div>' +
				'<div class="'+pager.btnBox+'">' +
				'<span class="totalNum" style="display:none;text-align:center"></span>' +
				'<button data-page="prev" class="btn prev-btn">'+pager.previous+'</button>' +
				'<span class="'+pager.numBtnBox+'"></span>' +
				'<button data-page="next" class="btn next-btn">'+pager.next+'</button>' +
				// '<select class="page_select"><option value="10" selected="">10</option><option value="30">30</option><option value="50">50</option><option value="100">100</option></select>'+
				// '<span class="page_num" style="margin-right:10px">条每页</span>'+
				'</div>');

		}else{
			$('.'+pager.paginationBox).html(
				'<div class="'+pager.mainBox+'"></div>' +
				// '<div class="totalNum" style="display:none;text-align:center"></div>' +
				'<div class="'+pager.btnBox+'">' +
				'<span class="totalNum" style="display:none;text-align:center"></span>' +
				'<button data-page="prev" class="btn prev-btn">'+pager.previous+'</button>' +
				'<span class="'+pager.numBtnBox+'"></span>' +
				'<button data-page="next" class="btn next-btn">'+pager.next+'</button>' +
				// '<select class="page_select"><option value="10" selected="">10</option><option value="30">30</option><option value="50">50</option><option value="100">100</option></select>'+
				// '<span class="page_num" style="margin-right:10px">条每页</span>'+
				'跳转到:<input type="text" placeholder="" class="'+pager.ipt+'">' +
				'<button class="btn '+pager.goBtn+'">GO</button>' +
				'</div>');
		}



		//ipt value变化并赋值给go btn data-page
		$('.'+pager.btnBox+' .'+pager.ipt).change(function(){
			if(!isNaN($(this).val())){//是数字
				if($(this).val() > pager.maxCount){//限制value最大值，跳转尾页
					$(this).val(pager.maxCount);
				}
				if($(this).val()<1){//限制value最小值，跳转首页
					$(this).val(1);
				}
			}else{//非数字清空value
				$(this).val('');
			}
			$('.'+pager.btnBox+' .'+pager.goBtn).attr('data-page',$(this).val() ? $(this).val(): '');
		});

		//每个btn绑定请求数据页面跳转方法
		$('.'+pager.btnBox+' button').not('.noUse').each(function(i,v){
			$(this).click(function(){
				console.log(v.getAttribute('data-page'));
				//有值且不是上一次的页码时才调用
				if(v.getAttribute('data-page') && v.getAttribute('data-page') != pager.currentPage){
					goPage(v.getAttribute('data-page'));
				}
			});
		});

		if(pager.isshowTatalNum){
			$('.totalNum').html("共"+'<span style="color:#ff4343">'+pager.totalNum+'</span>'+"条数据").show();

		}


		// selectChange();
	}


	function createNumBtn(e){
		var str ='';
		if(pager.maxCount<=10){
			//左边
			if(e!=1){
				for(var i=1;i<e;i++){
					str +='<button class="btn" data-page="'+i+'">'+i+'</button>';
				}
			}
			str+='<button  data-page="'+e+'" class="btn '+pager.currentBtn+'" disabled="disabled">'+e+'</button>';//此页
			//右边
			for(var j=e+1;j<=pager.maxCount;j++){
				str +='<button class="btn" data-page="'+j+'">'+j+'</button>';
			}

		}else{
			var left = '',right='';
			if(e<=5){
				left = 2;
				right =8;
			}else{
				if(e>=pager.maxCount-3){
					left = pager.maxCount-7;
					right = pager.maxCount-1
				}else{
					if(e-3>2){
						left = e-3;
					}else{
						left = 2;
					}
					if(left+6<=pager.maxCount-1){
						right = left +6;
					}else{
						right=pager.maxCount-1;
					}

				}
			}

			// modify numBtn
			//todo 判断left-1 >1 左边...
			if(left-1>1){
				//此页左边有...
				str+='<button class="btn" data-page="1">1</button><button disabled="disabled" class="btn noUse">...</button>';
				for(var i=left;i<e;i++){
					str+='<button class="btn" data-page="'+i+'">'+i+'</button>';
				}
				str+='<button data-page="'+e+'" class="btn '+pager.currentBtn+'" disabled="disabled">'+e+'</button>';//此页
				//此页右边
				for(var i=e+1;i<=right;i++){
					str+='<button class="btn" data-page="'+i+'">'+i+'</button>';
				}
				//右边有...
				if(pager.maxCount-right>1){
					str +='<button disabled="disabled" class="btn noUse">...</button><button class="btn"  data-page="'+pager.maxCount+'">'+pager.maxCount+'</button>';

				}else{
					if(e != pager.maxCount){
						str +='<button class="btn"  data-page="'+pager.maxCount+'">'+pager.maxCount+'</button>'
					}
				}


			}else{ //左边没有
				if(pager.maxCount-right>1){
					//此项左边
					for(var n=left-1;n<e;n++){
						str+='<button class="btn"  data-page="'+n+'">'+n+'</button>';
					}
					str+='<button data-page="'+e+'" class="btn '+pager.currentBtn+'" disabled="disabled">'+e+'</button>';//此页
					//此页右边
					for(var i=e+1;i<=right;i++){
						str+='<button class="btn" data-page="'+i+'">'+i+'</button>';
					}
					str+='<button disabled="disabled" class="btn noUse">...</button><button class="btn" data-page="'+pager.maxCount+'">'+pager.maxCount+'</button>';
				}else{

				}

			}



		}

		$('.'+pager.numBtnBox).html(str);

		//每个btn绑定请求数据页面跳转方法
		$('.'+pager.numBtnBox+' button').not('.noUse').each(function(i,v){
			$(this).click(function(){
				goPage(v.getAttribute('data-page'));
			});
		});

		//按钮禁用
		$('.'+pager.btnBox+' button').not('.noUse').not('.'+pager.currentBtn).attr('disabled',false);
		if(!(e-1)){//首页时 e 是从1开始的，所以这要减1
			$('.'+pager.btnBox+' .first-btn').attr('disabled',true);
			$('.'+pager.btnBox+' .prev-btn').attr('disabled','disabled').css( 'cursor','not-allowed');
		}else{
			$('.'+pager.btnBox+' .prev-btn').css( 'cursor','pointer');
		}
		if(e==pager.maxCount){//尾页时
			$('.'+pager.btnBox+' .last-btn').attr('disabled',true);
			$('.'+pager.btnBox+' .next-btn').attr('disabled',true).css( 'cursor','not-allowed');
		}else{
			$('.'+pager.btnBox+' .next-btn').css( 'cursor','pointer');
		}

	}

	createBtn();
	goPage();
	// selectChange();

	function selectChange(){
		$('.page_select').unbind('change').change(function(){
			var val = $(this).children('option:selected').val();
			// alert(val);
			pager.pageCount = val
			createBtn();
			createNumBtn(1);
			$(".page_select option[value= '"+val+"']").attr("selected", true);  //删除Select中Value='3'的Option
			if(pager.selectBack){
				pager.selectBack(val)
			}


		})
	}

	function goPage(btn){

		if(!isNaN(btn)){ //是数字
			pager.currentPage = parseInt(btn)
		}else{ // 不是数字
			switch (btn){
				case 'first':
					pager.currentPage = 1;
					break;
				case 'last':
					pager.currentPage  = pager.maxCount;
					break;
				case 'prev':
					if(pager.currentPage>1){
						--pager.currentPage;
					}
					break;
				case 'next':
					if(pager.currentPage <pager.maxCount){
						++pager.currentPage;
					}
					break;
			}

		}


		createNumBtn(pager.currentPage);
		//给input框 赋值
		//赋值给页码跳转输入框的value，表示当前页码
//            $('.'+pager.btnBox+' .'+pager.ipt).val(pager.currentPage);
		$('.'+pager.btnBox+' .'+pager.goBtn).attr('data-page',pager.currentPage);
		$('.current').html(pager.currentPage);


		//              内容区填充数据
		if(pager.callback){
			// alert(pager.pageCount);
			pager.callback(pager.currentPage,pager.pageCount);
		}

		// alert($('.t-header .active').attr('index'))


	}
}