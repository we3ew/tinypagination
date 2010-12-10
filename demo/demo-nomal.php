<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>JQuery Pagination Plugins -- Nomal Demo</title>
</head>
<script src="./jquery-1.4.2.min.js" type="text/javascript"></script>
<script src="./jquery.tinypagination.js" type="text/javascript"></script>

<?php 
$page = (int)$_GET['page'];
$page = empty($page)?3:$page;
?>
<script type="text/javascript">
$(function(){
	var page = <?php echo $page;?>;
	page = page==0?1:page;

	$(".paginations").tinypagination({
		changeHandler:function change(page){
//			alert(page);
		},
		total:100,
		currentPage:page,
		mode:"nomal",
		pageUrl:"?page="
	});
	
});
</script>
<body style="margin: auto;0px;">
---------------------DEMO页面-------------------

<div style="width:960px;">
	<h1>Nomal</h1>
	<div class="paginations">第一个</div>
	<div class="paginations"></div>
	<div class="paginations"></div>
	<div class="paginations"></div>
	<hr>
</div>
</body>
</html>