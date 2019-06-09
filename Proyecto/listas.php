<?php 
    $datosJSON = $_POST['usuario'];
    if(isset($datosJSON)){

    
    

    include("./html/bienvenida.html");
    include("./html/scripts.html");
    
?>

<script>
    var dialog = $("#modalAñadirLista").dialog({
    autoOpen: false,
    height: 350,
    width: 400,
    modal: true,
    buttons: {
      "Añadir tarea": function(){},
      "Crear": function(){},
      "Cancelar": function() {
        dialog.dialog( "close" );
      }
    },
    close: function() {

    }
  });

    $( "#botonModalLista" ).button().on( "click", function() {
        dialog.dialog( "open" );
        });
</script>
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