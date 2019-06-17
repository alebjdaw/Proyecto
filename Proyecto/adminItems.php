<?php 
    $datosJSON = $_POST['usuario'];
    if(isset($datosJSON) && $datosJSON!=null){

    
    

    include("./html/adminItems.html");
    include("./html/scripts.html");
    
?>

    <script type="text/javascript" src="./js/adminItems.js"></script>
    <script type="text/javascript" >
        
        oUsuarioActivo=<?php echo $datosJSON;?>;
        
        cargarItems();
    </script>
    
    </head>
</html>
<?php

    }
    else{
        header('Location: ./index.html');
    }
?>