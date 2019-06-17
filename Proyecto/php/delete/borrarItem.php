<?php

// Recojo los datos de entrada
$idItem = $_POST["itemId"];

include("../bbdd.php");

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "UPDATE `item` SET `fechaBaja` = CURRENT_TIMESTAMP WHERE `item`.`id` ='".$idItem."'";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));



mysqli_close($conexion);
?>