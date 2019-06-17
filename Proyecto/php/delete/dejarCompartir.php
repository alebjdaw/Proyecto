<?php

// Recojo los datos de entrada
$idLista = $_POST["listaId"];
$dni=$_POST["dni"];

include("../bbdd.php");

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "DELETE FROM `usuario-lista` WHERE `usuario-lista`.`usuarioNoPropietario` = '".$dni."' AND `usuario-lista`.`listaCompartida` =".$idLista;
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));



mysqli_close($conexion);
?>