<?php

// Recojo los datos de entrada
$datosJSON = $_POST["usuariosCompartidos"];
$usuariosCompartidos=json_decode($datosJSON);
$iId=$_POST["iId"];
$sDni=$_POST["sDni"];
$usuariosCompartidosAntiguos=[];
$usuariosDelete="'',";
$usuariosInsert="'',";
include("../bbdd.php");

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$sql = "SELECT DISTINCT usuarioNoPropietario,usuario FROM `usuario-lista`,usuario WHERE usuarioNoPropietario=usuario.dni AND listaCompartida=".$iId;
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

while($fila = mysqli_fetch_array($resultados)){
    $usuariosCompartidosAntiguos[]=$fila["usuario"];
}
for($i=0;$i<count($usuariosCompartidosAntiguos);$i++){
    if(!in_array($usuariosCompartidosAntiguos[$i],$usuariosCompartidos)){
        $usuariosDelete.="'".$usuariosCompartidosAntiguos[$i]."',";
    }
    else{
        if (($key = array_search($usuariosCompartidosAntiguos[$i], $usuariosCompartidos)) !== false) {
            array_splice($usuariosCompartidos,$key,1);
            
        }
    }
}
$usuariosDelete = rtrim($usuariosDelete,',');

for($i=0;$i<count($usuariosCompartidos);$i++){
    $usuariosInsert.="'".$usuariosCompartidos[$i]."',";
    
}
$usuariosInsert = rtrim($usuariosInsert,',');

$sql="INSERT INTO `usuario-lista` (`usuarioNoPropietario`, `listaCompartida`) SELECT dni,id FROM usuario, lista WHERE usuario IN(".$usuariosInsert.") AND id='".$iId."'";
mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$sql="DELETE FROM `usuario-lista` WHERE listaCompartida='".$iId."' AND usuarioNoPropietario IN (SELECT dni FROM usuario WHERE usuario IN(".$usuariosDelete."))";
mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

mysqli_close($conexion);
?>