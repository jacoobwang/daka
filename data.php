<?php
	error_reporting(0);
	$data = array(
		'day' => isset($_GET['day']) ? $_GET['day'] : false,
		'user'=> isset($_GET['user'])? $_GET['user']: false
	);
	$sql = "insert into daka (".implode(',',array_keys($data)).") values (".implode(',',array_values($data)).")";
	
	$conn = mysql_connect('localhost:3306','user','user');
	$rs = mysql_query($sql,$conn);
	if($rs != false) echo 1;
?>