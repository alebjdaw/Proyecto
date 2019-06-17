<?php 
    $datosJSON = $_POST['usuario'];
    if(isset($datosJSON) && $datosJSON!=null){

    
    

    include("./html/adminUsuarios.html");
    include("./html/scripts.html");
    
?>

    <script type="text/javascript" src="./js/adminUsuarios.js"></script>
    <script type="text/javascript" >
        
        oUsuarioActivo=<?php echo $datosJSON;?>;
        
        cargarUsuarios();
    </script>
    
    </head>
</html>
<?php

    }
    else{
        header('Location: ./index.html');
    }
?>