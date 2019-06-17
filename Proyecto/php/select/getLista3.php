<?php

// Recojo los datos de entrada
$sDni = $_POST["sDni"];
$respuesta=[];
include("C:/xampp/htdocs/Proyecto/php/bbdd.php");

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "select * from lista where usuarioPropietario='".$sDni."' AND eliminada=1";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

while ($fila = mysqli_fetch_array($resultados)) {
    $respuesta[] = $fila;
}


echo json_encode($respuesta); 

mysqli_close($conexion);
?>