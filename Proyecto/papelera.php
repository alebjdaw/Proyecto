<?php 
    $datosJSON = $_POST['usuario'];
    if(isset($datosJSON)&& $datosJSON!=null){

    
    

    include("./html/papelera.html");
    include("./html/scripts.html");
    
?>

    <script type="text/javascript" src="./js/papelera.js"></script>
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