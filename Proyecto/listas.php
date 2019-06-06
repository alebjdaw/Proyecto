<?php 
    $datosJSON = $_POST['usuario'];
    if(isset($datosJSON)){

    
    //Decodifico el objeto evento
    $usuario = json_decode($datosJSON);

    include("./html/bienvenida.html");
    include("./html/scripts.html");
    
?>

    <script type="text/javascript" src="./js/listas.js"></script>
    <script type="text/javascript" >
        
    </script>
    </head>
</html>
<?php

    }
    else{
        header('Location: ./index.html');
    }
?>