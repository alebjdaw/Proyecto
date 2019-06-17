<?php 
    $datosJSON = $_POST['usuario'];
    if(isset($datosJSON) && $datosJSON!=null){

    
    

    include("./html/bienvenida.html");
    include("./html/scripts.html");
    
?>

    <script type="text/javascript" src="./js/listas.js"></script>
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