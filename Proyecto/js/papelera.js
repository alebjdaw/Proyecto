$.ajax({
    async: false,
    url: "./js/controlador.js",
    dataType: "script"
});


function cargarListas(sDni){

    $.ajax({
        method: "POST",
        url: "./php/select/getLista3.php",
        data: { "sDni" : sDni},
        success: function(data){
            for(var i=0;i<data.length;i++){
                var oLista=new Lista();
                oLista.sNombre=data[i].nombre;
                oLista.iId=data[i].id;
                oLista.sPropietario=data[i].usuarioPropietario;
                oLista.bEliminada=data[i].eliminada;
                introducirLista(oLista);    
            }},
        async: false,
        dataType: 'json'
    });
}

function introducirLista(oLista){
    $.ajax({
        method: "POST",
        url: "./html/lista3.html",
        success: function(html){
            $("#contenedorListas").append(html);
        },
        async: false,
        dataType: 'html'
    });
    $("#lista_cambiarListaId").attr("id","lista_"+oLista.iId);
    $("#btn_collapse_lista_cambiarListaId").text(oLista.sNombre);
    $("#btn_collapse_lista_cambiarListaId").attr("id","btn_collapse_lista_"+oLista.iId);
    $("#collapse_lista_cambiarListaId").attr("id","collapse_lista_"+oLista.iId);
    $("#btn_collapse_lista_"+oLista.iId).attr("data-target","#collapse_lista_"+oLista.iId);
    $.ajax({
        method: "POST",
        url: "./php/select/getItem.php",
        data: { "iId" : oLista.iId},
        success: function(data){
            for(var i=0;i<data.length;i++){
                var oItem=new Item();
                oItem.iId=data[i].id;
                oItem.sNombre=data[i].nombre;
                oItem.sDescripcion=data[i].descripcion;
                oItem.dFechaAlta=data[i].fechaAlta;
                oItem.dFechaBaja=data[i].fechaBaja;
                oItem.dFechaAviso=data[i].fechaAviso;
                oItem.sFicheroImagen=data[i].imagen;
                oItem.iLista=data[i].lista;
                introducirItem(oItem);    
            }},
        async: false,
        dataType: 'json'
    });

    $("#sortable_lista_cambiarListaId").attr("id","sortable_lista_"+oLista.iId);
    $( "#sortable_lista_"+oLista.iId ).sortable({
        placeholder: "ui-state-highlight",
        change: function(event,ui) {
            idLista=ui.helper[0].parentElement.id.replace("sortable_lista_","");
            
        }
      });
    $( "#sortable_lista_"+oLista.iId ).disableSelection();
    $("#btn_añadirTarea_lista_cambiarListaId").attr("id","btn_añadirTarea_lista_"+oLista.iId);
    $("#btn_recuperarLista_lista_cambiarListaId").attr("id","btn_recuperarLista_lista_"+oLista.iId);
    $("#btn_borrarLista_lista_cambiarListaId").attr("id","btn_borrarLista_lista_"+oLista.iId);

}

function introducirItem(oItem){
    $.ajax({
        method: "POST",
        url: "./html/item.html",
        success: function(html){
            $("#sortable_lista_cambiarListaId").append(html);
        },
        async: false,
        dataType: 'html'
    });
    $("#item_cambiarItemId").attr("id","item_"+oItem.iId);
    $("#nombre_item_cambiarItemId").text(oItem.sNombre);
    $("#nombre_item_cambiarItemId").attr("id","nombre_item_"+oItem.iId);
    $("#nombre_item_cambiarItemId").attr("id","nombre_item_"+oItem.iId);
    $("#eliminar_item_cambiarItemId").attr("id","eliminar_item_"+oItem.iId);
    $("#detalles_item_cambiarItemId").attr("id","detalles_item_"+oItem.iId);
}



function eliminarItem($this){
    var itemId=($this.attr("id").replace("eliminar_item_",""));
    
    $.ajax({
        method: "POST",
        url: "./html/confirmModal.html",
        success: function(html){
            $("#contenido").append(html);
        },
        async: false,
        dataType: 'html'
    });
    $( "#dialog-confirm" ).data("id",itemId);
    $( "#dialog-confirm" ).dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
          "Borrar": function() {
            
            $("#item_"+$(this).data("id")).remove();
            $.post("./php/delete/borrarItem.php", {"itemId":$(this).data("id")});
            $( this ).dialog( "close");
          },
          "Cancelar": function() {
            $( this ).dialog( "close" );
          }
        }
      });
}

function detallesItem($this){
    itemId=($this.attr("id").replace("detalles_item_",""));
    $.ajax({
        method: "POST",
        url: "./html/modalDetallesItem.html",
        success: function(html){
            $("#contenido").append(html);
            $("#cambiarFotoItem_idItem").attr("id","cambiarFotoItem_"+itemId);
            $.ajax({
                method: "POST",
                url: "./php/select/getDetallesItem.php",
                data: { "iId" : itemId},
                success: function(data){
                    oItem= new Item();
                    oItem.iId=data.id;
                    oItem.sNombre=data.nombre;
                    oItem.sDescripcion=data.descripcion;
                    
                    oItem.dFechaAlta=new Date(data.fechaAlta);
                    if(data.fechaBaja!=null){
                        oItem.dFechaBaja=new Date(data.fechaBaja);
                        
                    }
                    
                    if(data.fechaAviso!=null){
                        oItem.dFechaAviso=new Date(data.fechaAviso);
                        $("#avisoItem").val(oItem.dFechaAviso.toISOString().slice(0,10));
                    }
                    
                    
                    oItem.sFicheroImagen=data.imagen;
                    oItem.iLista=data.lista;
                    oItem.iOrden=data.orden
                    $("#descripcionItem").val(oItem.sDescripcion);
                    
                    
                    
                    $("#nombreItem").val(oItem.sNombre);
                    if(oItem.sFicheroImagen!=""){
                        $("#cambiarFoto").css("background-image","url(./imagenes/item/"+oItem.sFicheroImagen+")");
                    }
                    $("#modalDetallesItem").attr("title",oItem.sNombre);
                },
                async: false,
                dataType: 'json'
            });
        },
        async: false,
        dataType: 'html'
    });
    $( "#modalDetallesItem" ).dialog({
        resizable: false,
        width: 400,
        height:500,
        modal: true,

            close: function(){
                $( "#modalDetallesItem" ).remove();
            }
        });

}


function recuperarLista($this){
    listaId=($this.attr("id").replace("btn_recuperarLista_lista_",""));
    
    
    $.ajax({
        method: "POST",
        url: "./html/confirmModal5.html",
        success: function(html){
            $("#contenido").append(html);
        },
        async: false,
        dataType: 'html'
    });
    
    $( "#dialog-confirm5" ).dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
          "Recuperar": function() {
            
            $("#lista_"+listaId).remove();
            $.post("./php/update/recuperarLista.php", {"listaId":listaId});
            $( this ).dialog( "close");
          },
          "Cancelar": function() {
            $( this ).dialog( "close" );
          }
        }
      });
}



function borrarLista($this){
    listaId=($this.attr("id").replace("btn_borrarLista_lista_",""));
    
    
    $.ajax({
        method: "POST",
        url: "./html/confirmModal6.html",
        success: function(html){
            $("#contenido").append(html);
        },
        async: false,
        dataType: 'html'
    });
    
    $( "#dialog-confirm6" ).dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
          "Borrar": function() {
            
            $("#lista_"+listaId).remove();
            $.post("./php/delete/eliminarLista.php", {"listaId":listaId});
            $( this ).dialog( "close");
          },
          "Cancelar": function() {
            $( this ).dialog( "close" );
          }
        }
      });
}

function vaciarPapelera(){
    $.ajax({
        method: "POST",
        url: "./html/confirmModal7.html",
        success: function(html){
            $("#contenido").append(html);
        },
        async: false,
        dataType: 'html'
    });
    
    $( "#dialog-confirm7" ).dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
          "Borrar": function() {
            
            $("#contenedorListas").empty();
            $.post("./php/delete/eliminarTodo.php",{"sDni":oUsuarioActivo.sDni});
            $( this ).dialog( "close");
          },
          "Cancelar": function() {
            $( this ).dialog( "close" );
          }
        }
      });
}