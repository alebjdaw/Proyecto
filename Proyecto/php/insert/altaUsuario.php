<?php

//Recoger parametro
$sDni=$_POST["sDni"];
$sPassword=$_POST["sPassword"); 
$sRol=$_POST["sRol"];
$sNombre=$_POST["sNombre"];
$sApellidos=$_POST["sApellidos"];
$sUsuario=$_POST["sUsuario"];
$sEmail=$_POST["sEmail"];

include("php/bbdd.php");

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");


$sql = "INSERT INTO usuario (dni,password,nombre,apellidos,usuario, rol) VALUES ('".$sDni."','".$sPassword."','".$sNombre."','".$sApellidos."','".$sUsuario."','".$sRol."')";
$resultado = mysqli_query($conexion,$sql);

if ($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Alta realizada"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de alta: ".mysqli_error($conexion);
}


echo json_encode($respuesta);

mysqli_close($conexion);
?>