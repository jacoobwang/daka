<?php
	error_reporting(0);
	$data = array(
		'sDay' => isset($_GET['day']) ? $_GET['day'] : false,
		'sUser'=> isset($_GET['user'])? $_GET['user']: false
	);
	$sql = "insert into daka (".implode(',',array_keys($data)).") values ('".implode("','",array_values($data))."')";
	$conn = mysql_connect('localhost:3306','root','123456');
	mysql_query("set names 'utf8'");
	mysql_select_db("daka");
	$rs = mysql_query($sql,$conn);
	if($rs != false) echo 1;
?>
