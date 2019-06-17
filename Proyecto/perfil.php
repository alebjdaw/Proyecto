<?php 
    $datosJSON = $_POST['usuario'];
    if(isset($datosJSON)&& $datosJSON!=null){

    
    

    include("./html/perfil.html");
    include("./html/scripts.html");
    
?>

    <script type="text/javascript" src="./js/perfil.js"></script>
    <script type="text/javascript" >
        
        oUsuarioActivo=<?php echo $datosJSON;?>;        
        cargarPerfilInicio();
    </script>
    
    </head>
</html>
<?php

    }
    else{
        header('Location: ./index.html');
    }
?>