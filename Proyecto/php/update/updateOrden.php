<?php

// Recojo los datos de entrada
$datosJSON = $_POST["datos"];
$arrayItem=json_decode($datosJSON);
$respuesta=[];
include("../bbdd.php");

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
for($i=0;$i<count($arrayItem);$i++){
    $sql = "UPDATE `item` SET `orden` = ".$i." WHERE `item`.`id` = ".$arrayItem[$i].";";
    $resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
}



mysqli_close($conexion);
?>