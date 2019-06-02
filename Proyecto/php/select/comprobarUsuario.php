<?php

//Recoger parametro
$sUsuario =$_POST["sUsuario"];
$sPassword =$_POST["sPassword"];
include("php/bbdd.php");


// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "select count(*) from usuario where usuario='".$sUsuario."' and password='".$sPassword."'";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));


$fila = mysqli_fetch_array($resultados);
    
if ($fila[0] == 0){
    $salida =false;
} else if($fila[0] > 0) {
    $salida =true;
}

echo json_encode($salida);

mysqli_close($conexion);
?>