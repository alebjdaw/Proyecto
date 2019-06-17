<?php

include("../bbdd.php");

$sDni="11111111A";//$_POST["sDni"];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$fecha=date("Y")."-".date("m")."-".date("d");

$sql='SELECT * FROM `item` WHERE CAST(fechaAviso AS date)=CAST("'.$fecha.'" AS date)';
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

while ($fila = mysqli_fetch_array($resultados)) {
    $id=$fila['id'];
    $nombre=$fila['nombre'];
    $sql='SELECT * FROM `notificacion-item` WHERE CAST(fechaAviso AS date)=CAST("'.$fecha.'" AS date) AND item="'.$id.'"';
    
    $resultado = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
    if($resultado->num_rows<=0){
        $sql="INSERT INTO `notificacion` (`id`, `descripcion`, `usuarioEnvia`, `usuarioRecibe`, `leida`, `fecha`) VALUES (NULL, 'Aviso de la tarea:".$nombre."', '49129628H', '".$sDni."', '0', CURRENT_TIMESTAMP);";
        $resultado = mysqli_query($conexion,$sql);
        $sql="SELECT MAX(id) as id FROM `notificacion`";
        $resultado = mysqli_fetch_array(mysqli_query($conexion,$sql));
        $idInsert=$resultado['id'];
        $sql="INSERT INTO `notificacion-item` (`item`, `notificacion`, `fechaAviso`) VALUES ('".$id."', '".$idInsert."', '".$fecha."');";
        $resultado = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
    }
}


$sql = "SELECT COUNT(*) AS cantidad FROM `notificacion` WHERE usuarioRecibe='".$sDni."' AND leida=0 ";
$resultado = mysqli_fetch_array(mysqli_query($conexion,$sql));


echo json_encode($resultado['cantidad']); 

mysqli_close($conexion);
?>