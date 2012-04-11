/**
 * www.we3ew.com
 * 
 *$(".paginationsClass").tinypagination({
 *		changeHandler:function change(page){
 *			alert(page);
 *		},
 *		total: 100,//比设置选项，其他参数可选
 *		currentPage: 5,
 *		perPage: 5, 
 *      prevText: '前一页', //默认为“上一页”可不设置
 *      nextText: '后一页',
 *		mode:"ajax", //or "nomal"
 *		pageUrl:"index.php?page="
 *	});
 * 
 *	<div class="paginationsClass">第一个</div>
 *	<div class="paginationsClass">第二个</div>
 *	<div class="paginationsClass">第三个</div>
 */

(function($) {
			
	function makeUrl(options,currentPage){
		return 'href="'+ (options.mode=='ajax'?'#page_': options.pageUrl)+currentPage+'" ';
	}
	
	function calculatePagesLinks(options){
		var pageNum = calculatePagesNum(options.total, options.currentPage, options.perPage);
		var front =new Array();
		if(options.frontRange>1){
			if(options.currentPage > options.frontRange){
				for(var i=0;i<options.frontRange;i++){
					front[i]=options.currentPage-options.frontRange+i;
				}
			}else if(options.currentPage <= options.frontRange && options.currentPage > 1){
				for(var i=0;i<(options.currentPage-1);i++){
					front[i]=i+1;
				}
			}
		}

		var back =new Array();
		if(options.backRange>1){
			if((pageNum['lastPage']-options.currentPage) >= options.backRange){
				var backRangeNum = options.backRange;
				if(options.currentPage<=options.frontRange && (pageNum['lastPage']-options.frontRange-options.backRange)>=0){
					if(pageNum['lastPage']-options.frontRange-options.backRange>0)
						backRangeNum +=  options.frontRange - options.currentPage + 1;
					else
						backRangeNum +=  options.frontRange - options.currentPage;
				}
					
				for(var i=0;i<backRangeNum;i++){
					back[i]=options.currentPage+i+1;
				}					
			}else if((pageNum['lastPage']-options.currentPage) < options.backRange && pageNum['lastPage']>options.currentPage){
				for(var i=0;i<(pageNum['lastPage']-options.currentPage);i++){
					back[i]=options.currentPage+i+1;
				}
			}
		}
		return [front,back];
	}

	function calculatePagesNum(total, currentPage, perPage) {
		total = parseInt(total);
		currentPage = parseInt(currentPage);
		perPage = parseInt(perPage);
		var tempNum = total % perPage;
		var tempPageNum = parseInt(total / perPage);
		var allPage = tempNum == 0 ? tempPageNum: (tempPageNum + 1);
		var prev = currentPage == 1 ? 1 : (currentPage - 1);
		var next = allPage == 1 ? 1 : (allPage > currentPage ? (currentPage + 1) : allPage);
		var startItem = (currentPage - 1) * perPage;
		var endItem = (currentPage * perPage) > total ? total : (currentPage * perPage);
		var result = new Array();
		result['total'] = total;
		result['homePage'] = total == allPage>0 ? 1 : 0;
		result['lastPage'] = allPage;
		result['perPage'] = perPage;
		result['currentPage'] = currentPage;
		result['prev'] = prev;
		result['next'] = next;
		return result;
	}
	
	function creatHrefHtml(className,urlHref,hrefText){
		return '<a class="'+className+'" '+ urlHref +' >'+hrefText+'</a> ';
	}
	
	function initPaginationHtml(options){
			var pageNum = calculatePagesNum(options.total, options.currentPage, options.perPage);
			var pageLinks = calculatePagesLinks(options);
			var html = '<div class="'+options['containerClass']+'"> ';
			// 前一页
			if(pageNum['prev']==1 && pageNum['currentPage']==1){
				html+= '<span  class="'+options.prevClass+'" >'+options.prevText+'</span> ';
			}else{
				html+= creatHrefHtml(options.prevClass, makeUrl(options,pageNum['prev']) ,options.prevText);
			}
			
			for(var i=0;i<pageLinks[0].length;i++){
				html+= creatHrefHtml(options.linksClass, makeUrl(options,pageLinks[0][i]) ,pageLinks[0][i]);
			}
			// 当前页
				html+= '<span class="'+options.currentClass+'"  >'+pageNum['currentPage']+'</span> ';
				
			for(var i=0;i<pageLinks[1].length;i++){
				html+= creatHrefHtml(options.linksClass, makeUrl(options,pageLinks[1][i]) ,pageLinks[1][i]);
			}
			// 后一页
			if(pageNum['next']==pageNum['lastPage'] && pageNum['next']==pageNum['currentPage']){
				html+= '<span class="'+options.nextClass+'" >'+options.nextText+'</span> ';
			}else{
				html+= creatHrefHtml(options.nextClass, makeUrl(options,pageNum['next']) ,options.nextText);
			}
				html+= '</div>';
			return html;
	}
	
	$.fn.tinypagination = function(options){
	        var options = $.extend({
            	containerClass: 'pagination',
            	prevClass: 'prev',
            	nextClass: 'next',
            	disabledClass: 'disabled',
            	currentClass: 'current',
            	linksClass: 'links',
            	prevText: '上一页',
            	nextText: '下一页',
            	total: 0,
            	perPage: 10,
            	currentPage: 1,
            	frontRange: 3,
            	backRange: 3,
            	changeHandler: function(page){},
            	mode: "ajax", // normal
            	pageUrl: ""
            },options); 
		    
	        var thisList = this;

	        return this.each(function() {
	    		var $this =$(this); 
	    		initPagination(options.currentPage);

	    		$(this).find('.'+ options.containerClass).live('click',function(e){
	    			if(checkClick($(e.target)) && options.mode=='ajax'){
    					initPagination(getCurrentPage($(e.target)));
	    			}
	    			return true;
	    		});

	    		function checkClick($target){
	    			if($target.attr('tagName')!='A'){
	    				return false;
	    			}
	    			if($target.hasClass(options.prevClass) || $target.hasClass(options.nextClass) || $target.hasClass(options.linksClass)){
	    				return true;
	    			}
	    			return false;
	    		}
	    		
	    		function getCurrentPage($target) {
	    			var currentPage;
	    			if ($target.hasClass(options.prevClass)) {
	    				currentPage = countCurrentPage(options.prevClass);
	    			} else if ($target.hasClass(options.nextClass)) {
	    				currentPage = countCurrentPage(options.nextClass);
	    			} else {
	    				currentPage = parseInt($target.text());
	    			}
	    			return currentPage;
	    		}
	    		
	    		function initPagination(currentPage){
	    			options.changeHandler.call($(this),currentPage)
	    			if(options.total <= options.perPage){
	    				return false;
	    			}
	    			options.currentPage=currentPage;
	    			var html = initPaginationHtml(options);
    				thisList.each(function() {
    					$(this).empty().html(html);
    				});
	    			return true;
	    		}
	    		
	    		function countCurrentPage(type){
    				options.currentPage = parseInt($this.find('.'+options.currentClass).text());
	    			var pageNum = calculatePagesNum(options.total,options.currentPage,options.perPage);
	    			return pageNum[type];
	    		}
	        });
	};
	
})(jQuery);