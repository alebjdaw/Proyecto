<?php 
    $datosJSON = $_POST['usuario'];
    if(isset($datosJSON)){

    
    

    include("./html/plantilla.html");
    include("./html/scripts.html");
    
?>

    <script type="text/javascript" src="./js/listasCompartidas.js"></script>
    <script type="text/javascript" >
        
        oUsuarioActivo=<?php echo $datosJSON;?>;        
        cargarListas(oUsuarioActivo.sDni);
    </script>
    
    </head>
</html>
<?php

    }
    else{
        header('Location: ./index.html');
    }
?>