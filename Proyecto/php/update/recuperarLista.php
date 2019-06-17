<?php

// Recojo los datos de entrada
$listaId = $_POST["listaId"];

include("../bbdd.php");

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "UPDATE `lista` SET `eliminada` = '0' WHERE `lista`.`id` =".$listaId;
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));



mysqli_close($conexion);
?>