<?php

// Recojo los datos de entrada
$datosJSON = $_POST["datos"];
$oItem=json_decode($datosJSON);

include("../bbdd.php");

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");



    $sql = "UPDATE `item` SET `nombre` ='".$oItem->sNombre."', `descripcion` = '".$oItem->sDescripcion."', `fechaAviso` = '".$oItem->dFechaAviso."' WHERE `item`.`id` =".$oItem->iId;
    $resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));




mysqli_close($conexion);
?>