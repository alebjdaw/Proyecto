<?php

include("../bbdd.php");

$usuarios=[];
// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");


$sql = "SELECT DISTINCT * FROM lista";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));


while($fila = mysqli_fetch_array($resultados)){
    $usuarios[]=$fila;
}

echo json_encode($usuarios); 

mysqli_close($conexion);
?>