<?php
	error_reporting(0);
	$data = array(
		'sDay' => isset($_GET['day']) ? $_GET['day'] : false,
		'sUser'=> isset($_GET['user'])? $_GET['user']: false
	);
	
	$ret = isset($_GET['ret'])? $_GET['ret']: false;
    $conn = mysql_connect('localhost','user','password');
    if(!$conn){
            die('Could not connect:'.mysql_error());
    }
    mysql_query("set names 'utf8'");
    mysql_select_db("daka",$conn);

    if($ret == 1){
            $sql = "select iId from daka where sUser = '".$data['sUser']."' limit 1";
            $rs  = mysql_query($sql);
            $rows= mysql_num_rows($rs);
            if($rows ==0) echo 1;
            else echo 2;
    }
    if($ret == 2){
            $sql = "insert into daka (".implode(',',array_keys($data)).") values ('".implode("','",array_values($data))."')";
            $rs = mysql_query($sql,$conn);
            if($rs != false) echo 1;
    }
    if($ret == 3){
        $sql = "delete from daka where sUser = '".$data['sUser']."' and sDay = '" .$data['sDay']."' limit 1";
        $rs = mysql_query($sql);
        echo 1;
    }

?>
