<?php
$conn = mysqli_connect("localhost","choffice","tikatika99!","choffice");

if(!$conn) die("연결 실패");

$val1 = $_POST['val1'];

$sql = "INSERT INTO testtbl (val1) values ('$val1')";
if(mysqli_query($conn, $sql)) echo "저장 성공";
else echo "저장 실패";

mysqli_close($conn);
	
}

?>