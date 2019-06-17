<?php

// Recojo los datos de entrada
$leido = $_POST["leido"];
$id = $_POST["id"];

include("../bbdd.php");

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "UPDATE `notificacion` SET `leida` = '".$leido."' WHERE `notificacion`.`id` =".$id;
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));



mysqli_close($conexion);
?>