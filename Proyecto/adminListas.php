<?php 
    $datosJSON = $_POST['usuario'];
    if(isset($datosJSON) && $datosJSON!=null){

    
    

    include("./html/adminListas.html");
    include("./html/scripts.html");
    
?>

    <script type="text/javascript" src="./js/adminListas.js"></script>
    <script type="text/javascript" >
        
        oUsuarioActivo=<?php echo $datosJSON;?>;
        
        cargarListas();
    </script>
    
    </head>
</html>
<?php

    }
    else{
        header('Location: ./index.html');
    }
?>