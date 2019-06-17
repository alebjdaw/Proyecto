<?php

include("../bbdd.php");

$sDni=$_POST["sDni"];
$iId=$_POST["iId"];
$usuariosCompartidos=[];
$usuariosNoCompartidos=[];
$usuariosNotIn="'".$sDni."',";
// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");


$sql = "SELECT DISTINCT usuarioNoPropietario,usuario,email FROM `usuario-lista`,usuario WHERE usuarioNoPropietario=usuario.dni AND listaCompartida=".$iId;
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));


while($fila = mysqli_fetch_array($resultados)){
    $usuariosCompartidos[]=$fila;
    $usuariosNotIn.="'".$fila['usuarioNoPropietario']."',";
}
$usuariosNotIn = rtrim($usuariosNotIn,',');

$sql = "SELECT DISTINCT usuario,email FROM usuario WHERE dni NOT IN(".$usuariosNotIn.")";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
while($fila = mysqli_fetch_array($resultados)){
    $usuariosNoCompartidos[]=$fila;
}

echo json_encode(array('usuariosCompartidos'=>$usuariosCompartidos,'usuariosNoCompartidos'=>$usuariosNoCompartidos)); 

mysqli_close($conexion);
?>