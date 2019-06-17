<?php

include("../bbdd.php");

$sDni=$_POST["sDni"];
$usuarios=[];
// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");


$sql = "SELECT id,descripcion,fecha,leida,a.usuario AS usuario1, b.usuario AS usuario2 
FROM `notificacion`
INNER JOIN usuario a ON usuarioEnvia=a.dni
INNER JOIN usuario b ON usuarioRecibe=b.dni
WHERE usuarioRecibe='".$sDni."'";

$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));


while($fila = mysqli_fetch_array($resultados)){
    $usuarios[]=$fila;

}



echo json_encode($usuarios); 

mysqli_close($conexion);
?>