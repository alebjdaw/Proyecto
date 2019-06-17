
<?php
if(isset($_FILES['fichero_usuario']['name'])){
   
    $iId=$_POST['iId'];
    //Include database configuration file
    include("C:/xampp/htdocs/Proyecto/php/bbdd.php");
    // Creamos la conexión al servidor.
    $conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
    mysqli_set_charset($conexion,"utf8");

    //File uplaod configuration
    $result = 0;
    $uploadDir = 'C:/xampp/htdocs/Proyecto/imagenes/item/';
    $fileName = time().'_'.basename($_FILES['fichero_usuario']['name']);
    $targetPath = $uploadDir. $fileName;
    
    //Upload file to server
    if(move_uploaded_file($_FILES['fichero_usuario']['tmp_name'], $targetPath)){
        //Update picture name in the database
        
        $update = $conexion->query("UPDATE item SET imagen = '".$fileName."' WHERE id = $iId");
        
        //Update status
        if($update){
            $result = 1;
        }
    }
    $data=[];
    $data["resultado"]=$result;
    $data["nombre"]=$fileName;
?>
<script type="text/javascript" >
        window.top.window.completeUpload(<?php echo json_encode($data);?>);
</script>

<?php

}
?>
