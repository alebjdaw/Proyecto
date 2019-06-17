<?php

include("C:/xampp/htdocs/Proyecto/php/bbdd.php");

$iId=$_POST["iId"];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "select * from item where id='".$iId."'";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));


$fila = mysqli_fetch_array($resultados);
    
echo json_encode($fila); 

mysqli_close($conexion);
?>