<?php

// Recojo los datos de entrada
$datosJSON = $_POST["datos"];
//Decodifico el objeto evento
$usuario = json_decode($datosJSON);

$sDni=$usuario->sDni;
$sPassword=$usuario->sPassword; 
$sNombre=$usuario->sNombre;
$sApellidos=$usuario->sApellidos;
$sEmail=$usuario->sEmail;
$mismoCorreo=$usuario->mismoCorreo;
$respuesta=[];
$bUpdate=true;

include("../bbdd.php");

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");



$sql="SELECT * FROM usuario WHERE email='".$sEmail."'";
$resultado = mysqli_query($conexion,$sql)->num_rows;
if($resultado>0 && !$mismoCorreo){
    $respuesta["errorEmail"]="El E-mail ya está en uso. Use uno distinto.";
    $bUpdate=false;
}

if($bUpdate){

    $sql = "UPDATE `usuario` SET `password` = '".$sPassword."', `nombre` = '".$sNombre."', `apellidos` = '".$sApellidos."', `email` = '".$sEmail."' WHERE `usuario`.`dni` = '".$sDni."';";
    $resultado = mysqli_query($conexion,$sql);

}


echo json_encode($respuesta);

mysqli_close($conexion);
?>