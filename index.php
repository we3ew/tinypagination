<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>JQuery Pagination Plugins -- DEMO</title>
</head>
<script src="jquery-1.4.2.min.js" type="text/javascript"></script>
<script src="jquery.tinypagination.js" type="text/javascript"></script>
<?php 
$page = (int)$_GET['page'];
$page = empty($page)?1:$page;
?>
<script type="text/javascript">
$(function(){
	var page = <?php echo (int)$_GET['page'];?>;
	page = page==0?1:page;
	
	$(".paginations").tinypagination({
		changeHandler:function change(page){
//			alert(page);
		},
		total:80,
		currentPage:page,
		mode:"ajax"
	});
	
	$(".paginations2").tinypagination({
		changeHandler:function change(page){
//			alert(page);
		},
		total:80,
		currentPage:page,
		mode:"nomal",
		pageUrl:"?page="
	});
	
	
});

</script>
<body style="margin: auto;0px;">
---------------------DEMO页面-------------------<hr>

<div style="width:960px;">
	<h1>Ajax</h1>
	<div class="paginations">第一个</div>
	<div class="paginations"></div>
	<div class="paginations"></div>
	<div class="paginations"></div>
	<hr>
	<h1>Nomal</h1>
	<div class="paginations2"></div>
	<div class="paginations2"></div>
	<div id="result">
	
	
	</div>

</div>
</body>
</html>