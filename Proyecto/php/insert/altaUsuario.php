<?php


$sDni=$_POST["sDni"];
$sPassword=$_POST["sPassword"]; 
$sRol=$_POST["sRol"];
$sNombre=$_POST["sNombre"];
$sApellidos=$_POST["sApellidos"];
$sUsuario=$_POST["sUsuario"];
$sEmail=$_POST["sEmail"];
$bInserta=true;
include("C:/xampp/htdocs/Proyecto/php/bbdd.php");

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$sql="SELECT * FROM usuario WHERE usuario='".$sUsuario."'";
$resultado = mysqli_query($conexion,$sql)->num_rows;
if($resultado>0){
    $respuesta["errorUsuario"]="El usuario ya está en uso. Use uno distinto.";
    $bInserta=false;
}

$sql="SELECT * FROM usuario WHERE dni='".$sDni."'";
$resultado = mysqli_query($conexion,$sql)->num_rows;
if($resultado>0){
    $respuesta["errorDni"]="El DNI ya está en uso. Use uno distinto.";
    $bInserta=false;
}

$sql="SELECT * FROM usuario WHERE email='".$sEmail."'";
$resultado = mysqli_query($conexion,$sql)->num_rows;
if($resultado>0){
    $respuesta["errorEmail"]="El E-mail ya está en uso. Use uno distinto.";
    $bInserta=false;
}

if($bInserta){

    $sql = "INSERT INTO usuario (dni,password,nombre,apellidos,usuario, rol,email) VALUES ('".$sDni."','".$sPassword."','".$sNombre."','".$sApellidos."','".$sUsuario."','".$sRol."','".$sEmail."')";
    $resultado = mysqli_query($conexion,$sql);

    if ($resultado){
        $respuesta["mensaje"] = "Alta realizada"; 
    } else {
        $respuesta["mensajeError"] = "Error en el proceso de alta: ".mysqli_error($conexion);
    }

}


echo json_encode($respuesta);

mysqli_close($conexion);
?>