<?php

// Recojo los datos de entrada
$iId = $_POST["iId"];
$respuesta=[];
include("../bbdd.php");

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "select * from item where lista='".$iId."' AND fechaBaja IS NULL order by(orden)";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

while ($fila = mysqli_fetch_array($resultados)) {
    $respuesta[] = $fila;
}


echo json_encode($respuesta); 

mysqli_close($conexion);
?>