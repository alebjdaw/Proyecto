<?php

// Recojo los datos de entrada
$sDni = $_POST["sDni"];
$respuesta=[];
include("../bbdd.php");

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = 'SELECT eliminada,lista.id,lista.nombre,usuarioPropietario,usuario FROM `lista` INNER JOIN usuario ON usuario.dni=lista.usuarioPropietario WHERE id IN (SELECT listaCompartida FROM `usuario-lista` WHERE usuarioNoPropietario="'.$sDni.'")';
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

while ($fila = mysqli_fetch_array($resultados)) {
    $respuesta[] = $fila;
}


echo json_encode($respuesta); 

mysqli_close($conexion);
?>