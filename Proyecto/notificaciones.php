<?php 
    $datosJSON = $_POST['usuario'];
    if(isset($datosJSON)&& $datosJSON!=null){

    
    

    include("./html/notificaciones.html");
    include("./html/scripts.html");
    
?>

    <script type="text/javascript" src="./js/notificaciones.js"></script>
    <script type="text/javascript" >
        
        oUsuarioActivo=<?php echo $datosJSON;?>;        
        cargarNotificacionesInicio(oUsuarioActivo.sDni);
    </script>
    
    </head>
</html>
<?php

    }
    else{
        header('Location: ./index.html');
    }
?>

