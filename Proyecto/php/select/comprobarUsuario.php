<?php

// Recojo los datos de entrada
$datosJSON = $_POST["datos"];
//Decodifico el objeto evento
$usuario = json_decode($datosJSON);
//Recoger parametro
$sUsuario=$usuario->sUsuario;
$sPassword=$usuario->sPassword;
include("../bbdd.php");


// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "SELECT * FROM usuario WHERE usuario='".$sUsuario."' AND password='".$sPassword."'";
$resultado = mysqli_query($conexion,$sql)->num_rows;
if($resultado>0){
    $salida["respuesta"]=true;
}else{
    $salida["respuesta"]=false;
}
$salida["usuario"]=$sUsuario;
echo json_encode($salida);

mysqli_close($conexion);
?>