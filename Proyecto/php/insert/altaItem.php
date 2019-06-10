<?php

// Recojo los datos de entrada
$iId = $_POST["iId"];
$respuesta=[];
include("C:/xampp/htdocs/Proyecto/php/bbdd.php");

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql="INSERT INTO `item` (`id`, `nombre`, `descripcion`, `fechaAlta`, `fechaBaja`, `fechaAviso`, `imagen`, `lista`,orden) VALUES (NULL, 'Cámbiame el nombre', '', CURRENT_TIMESTAMP, NULL, NULL, '', '$iId','0');";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
$sql = "SELECT id,nombre FROM `item` order by(id) desc ";
$resultado = mysqli_query($conexion,$sql);
$fila=mysqli_fetch_assoc($resultado);
$respuesta["iId"]=$fila["id"];
$respuesta["sNombre"]=$fila["nombre"];

echo json_encode($respuesta); 

mysqli_close($conexion);
?>