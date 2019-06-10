<?php

// Recojo los datos de entrada
$datosJSON = $_POST["datos"];
//Decodifico el objeto evento
$datos = json_decode($datosJSON);

$nombreLista=$datos->nombreLista;
$arrayNombreTareas=$datos->arrayNombreTareas;
$dniUsuario=$datos->dniUsuario;
$respuesta=[];
$bInserta=true;

include("C:/xampp/htdocs/Proyecto/php/bbdd.php");

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$sql="SELECT * FROM lista WHERE nombre='".$nombreLista."'";
$resultado = mysqli_query($conexion,$sql)->num_rows;
if($resultado>0){
    $respuesta["errorNombreLista"]="El nombre de la lista ya está en uso. Use uno distinto.";
    $bInserta=false;
    
}


if($bInserta){

    $sql = "INSERT INTO lista (usuarioPropietario,eliminada,nombre) VALUES ('".$dniUsuario."','0','".$nombreLista."')";
    $resultado = mysqli_query($conexion,$sql);
    $sql = "SELECT id FROM lista WHERE nombre='".$nombreLista."'";
    $resultado = mysqli_query($conexion,$sql);
    $fila=mysqli_fetch_assoc($resultado);
    $idLista=$fila["id"];

    for($i=0;$i<count($arrayNombreTareas);$i++){
        $sql="INSERT INTO `item` (`id`, `nombre`, `descripcion`, `fechaAlta`, `fechaBaja`, `fechaAviso`, `imagen`, `lista`,orden) VALUES (NULL, '".$arrayNombreTareas[$i]."', '', CURRENT_TIMESTAMP, NULL, NULL, '', '$idLista','0');";
        $resultado = mysqli_query($conexion,$sql);
        
    }
    
}


echo json_encode($respuesta);

mysqli_close($conexion);
?>