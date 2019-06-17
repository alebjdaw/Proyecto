$.ajax({
    async: false,
    url: "./js/controlador.js",
    dataType: "script"
});

var dialog = $("#modalAñadirLista").dialog({
    autoOpen: false,
    height: 350,
    width: 400,
    modal: true,
    buttons: {
      "Añadir tarea": function(){
          $("#añadirTarea").append('<tr><td><label for="nombreTarea">Tarea:</label></td><td><input type="text" name="nombreTarea"  class="text ui-widget-content ui-corner-all"></td><td><button type="button" class="btn btn-danger ml-3" onclick="eliminarTarea($(this).parent().parent())">x</button></td></tr>');
      },
      "Crear": function(){
          var nombreLista=$("input[name='nombreLista']")[0].value.trim();
          if(nombreLista===""){
            $("input[name='nombreLista']")[0].setCustomValidity("Debe introducir un nombre.");
            $("input[name='nombreLista']")[0].focus();
          }
          else{
            var $tareas=$("input[name='nombreTarea']");
            var arrayNombreTareas=[];
            var datos={};
            for(var i=0;i<$tareas.length;i++){
                if($tareas[i].value.trim()!=""){
                  arrayNombreTareas.push($tareas[i].value.trim());
                }
                
            }
            datos.nombreLista=nombreLista;
            datos.arrayNombreTareas=arrayNombreTareas;
            datos.dniUsuario=oUsuarioActivo.sDni;
            var sParametros="datos="+JSON.stringify(datos); 
            $.post("./php/insert/altaLista.php", sParametros, procesoAltaLista, 'json');
            dialog.dialog( "close" );
          }

      },
      "Cancelar": function() {
        $("#formModalAñadirLista").remove();
        $.ajax({
            method: "POST",
            url: "./html/formModalAñadirLista.html",
            success: function(html){
                $("#modalAñadirLista").append(html);
            },
            async: false,
            dataType: 'html'
        });
        dialog.dialog( "close" );
      }
    },
    close: function() {
        $("#formModalAñadirLista").remove();
        $.ajax({
            method: "POST",
            url: "./html/formModalAñadirLista.html",
            success: function(html){
                $("#modalAñadirLista").append(html);
            },
            async: false,
            dataType: 'html'
        });
        dialog.dialog( "close" );
    }
  });

    $( "#botonModalLista" ).button().on( "click", function() {
        dialog.dialog( "open" );
        });


function cargarListas(sDni){

    $.ajax({
        method: "POST",
        url: "./php/select/getLista.php",
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
        url: "./html/lista.html",
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
            hayCambio["lista_"+idLista]="-Lista: "+$("#btn_collapse_lista_"+idLista).text();
            
        }
      });
    $( "#sortable_lista_"+oLista.iId ).disableSelection();
    $("#btn_añadirTarea_lista_cambiarListaId").attr("id","btn_añadirTarea_lista_"+oLista.iId);
    $("#btn_guardarLista_lista_cambiarListaId").attr("id","btn_guardarLista_lista_"+oLista.iId);
    $("#btn_compartirLista_lista_cambiarListaId").attr("id","btn_compartirLista_lista_"+oLista.iId);
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
        buttons: {
          "Modificar": function(event){
              if( event.target.firstChild.nodeValue==="Guardar cambios"){
                    event.target.firstChild.nodeValue="Modificar";
                    $("#descripcionItem")[0].disabled=true;
                    $("#avisoItem")[0].disabled=true;
                    $("#nombreItem")[0].disabled=true;
                    $("#cambiarFotoItem_"+itemId).hide();
                    oItem.sNombre=$("#nombreItem").val();
                    oItem.dFechaAviso=$("#avisoItem").val();
                    oItem.sDescripcion=$("#descripcionItem").val();
                    var datosJSON=JSON.stringify(oItem);
                    var sParametros="datos="+datosJSON;
                    $.post("./php/update/updateItem.php", sParametros, function(){
                        $("#nombre_item_"+oItem.iId).text(oItem.sNombre);
                        
                        alert("Datos actualizados");
                });
              }
              else{
                  console.log(event);
                    event.target.firstChild.nodeValue="Guardar cambios";
                    $("#descripcionItem")[0].disabled=false;
                    $("#avisoItem")[0].disabled=false;
                    $("#nombreItem")[0].disabled=false;
                    $("#cambiarFotoItem_"+itemId).show();
                }
                
            }
            },
            close: function(){
                $( "#modalDetallesItem" ).remove();
            }
        });

}

function cambiarImagen(){
    $("#cambiarFoto").css("background-image","url(./imagenes/7.png)");
}
function completeUpload(data) {
    var success=data.resultado;
    var fileName=data.nombre;
    
    if(success == 1){
        $("#cambiarFoto").css("background-image","");
        $("#cambiarFoto").css("background-image","url(./imagenes/item/"+fileName+")");
        $('#fileInput').attr("value", fileName);
    }else{
    
        alert('Ha habido un error al subir la imagen');
    }
    return true;
}
function cambiarFoto(event,$this){
    event.preventDefault();
    idItem=$this.attr("id").replace("cambiarFotoItem_","");
    $('#idItemInputOculto').val(idItem);
    $("#fileInput:hidden").trigger('click');

    $("#fileInput").on('change', function(){
        var image = $('#fileInput').val();
        var img_ex = /(.jpg|.jpeg|.png|.gif)$/i;
            
        if(!img_ex.exec(image)){
            alert('Por favor suba solo archivos con extensión: .jpg/.jpeg/.png/.gif ');
            $('#fileInput').val('');
            return false;
        }else{
            $( "#picUploadForm" ).trigger('submit');
        }
    });
}

function añadirItem($this){
    listaId=($this.attr("id").replace("btn_añadirTarea_lista_",""));
    $.ajax({
        method: "POST",
        url: "./html/item.html",
        success: function(html){
            $("#sortable_lista_"+listaId).append(html);
        },
        async: false,
        dataType: 'html'
    });
    $.ajax({
        method: "POST",
        url: "./php/insert/altaItem.php",
        data: { "iId" : listaId},
        success: function(data){
            
            $("#item_cambiarItemId").attr("id","item_"+data.iId);
            $("#nombre_item_cambiarItemId").text(data.sNombre);
            $("#nombre_item_cambiarItemId").attr("id","nombre_item_"+data.iId);
            $("#nombre_item_cambiarItemId").attr("id","nombre_item_"+data.iId);
            $("#eliminar_item_cambiarItemId").attr("id","eliminar_item_"+data.iId);
            $("#detalles_item_cambiarItemId").attr("id","detalles_item_"+data.iId);
             
        },
        async: false,
        dataType: 'json'
    });

}

function guardarLista($this){
    listaId=($this.attr("id").replace("btn_guardarLista_lista_",""));
    var ul=$("#sortable_lista_"+listaId);
    var arrayIl=ul.children();
    var arrayItem=[];
    for (var i=0;i<arrayIl.length;i++){
        arrayItem.push(arrayIl[i].id.replace("item_",""));
    }
    var datosJSON=JSON.stringify(arrayItem);
    var sParametros="datos="+datosJSON;
    $.post("./php/update/updateOrden.php", sParametros, function(){
        
        if(hayCambio["lista_"+listaId]!=undefined){
            delete hayCambio["lista_"+listaId];
        }
        
        $("body").append('<div id="dialog-message" title="Cambio realizado"><p><span class="ui-icon ui-icon-circle-check" style="float:left; margin:10px 10px 50px 0;"></span>Se han realizado todos los cambios en la lista '+$("#btn_collapse_lista_"+listaId).text()+'</p></div>');
        $( "#dialog-message" ).dialog({
            modal: true,
            buttons: {
              Ok: function() {
                $( this ).dialog( "close" );
              }
            }
        });
    });
}

function borrarLista($this){
    listaId=($this.attr("id").replace("btn_borrarLista_lista_",""));
    
    
    $.ajax({
        method: "POST",
        url: "./html/confirmModal2.html",
        success: function(html){
            $("#contenido").append(html);
        },
        async: false,
        dataType: 'html'
    });
    
    $( "#dialog-confirm2" ).dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
          "Borrar": function() {
            
            $("#lista_"+listaId).remove();
            $.post("./php/update/papeleraLista.php", {"listaId":listaId});
            $( this ).dialog( "close");
          },
          "Cancelar": function() {
            $( this ).dialog( "close" );
          }
        }
      });
}

function compartirLista($this){
    listaId=($this.attr("id").replace("btn_compartirLista_lista_",""));
    $.ajax({
        method: "POST",
        url: "./html/modalSeleccionarUsuario.html",
        success: function(html){
            $("#contenido").append(html);
        },
        async: false,
        dataType: 'html'
    });
    $(document).ready(function() {
        $.ajax({
            method: "POST",
            url: "./php/select/getUsuarios.php",
            data:{"sDni":oUsuarioActivo.sDni, "iId":listaId},
            success: function(data){
                for(var i=0;i<data.usuariosCompartidos.length;i++){
                    $("#introducirUsuarios").append("<tr><td><input type='checkbox' id='"+data.usuariosCompartidos[i].usuario+"' checked></td><td>"+data.usuariosCompartidos[i].usuario+"</td><td>"+data.usuariosCompartidos[i].email+"</td></tr>")
                }
                for(var i=0;i<data.usuariosNoCompartidos.length;i++){
                    $("#introducirUsuarios").append("<tr><td><input type='checkbox' id='"+data.usuariosNoCompartidos[i].usuario+"'></td><td>"+data.usuariosNoCompartidos[i].usuario+"</td><td>"+data.usuariosNoCompartidos[i].email+"</td></tr>")
                }                
            },
            async: false,
            dataType: 'json'
        });
        $('#dateTable').DataTable( {            
            scrollY:        200,
            scrollCollapse: true,
            
            "language":{
                "emptyTable": "No hay información disponible",
                "info": "",
                "infoEmpty":"",
                "infoFiltered":"",
                "infoPostFix":"",
                "thousands":".",
                "lengthMenu":"Muestra _MENU_",
                "loadingRecords":"Cargando...",
                "processing":"Procesando...",
                "search":"Buscar",
                "zeroRecords": "No se ha encontrado resultado",
                "paginate":{
                    "next":">",
                    "previous":"<"
                },
                "aria":{
                    "sortAscending":"",
                    "sortDescending":""
                }
            }
        } );
    } );
    $("#modalSeleccionarUsuario").dialog({
        autoOpen: true,
        width: 'auto', 
        maxWidth: 600,
        height: 'auto',
        modal: true,
        fluid: true, 
        resizable: false,
        position: { my: "center bottom", at: "center center", of: window },
        buttons: {
            "Cancelar":function(){
                $("#modalSeleccionarUsuario").remove();
            },
            "Compartir":function(){
                var usuariosCompartidos = [];
                $('#introducirUsuarios input:checked').each(function() {
                    usuariosCompartidos.push($(this).attr('id'));
                });
                $.ajax({
                    method: "POST",
                    url: "./php/insert/insertListaCompartida.php",
                    data:{"sDni":oUsuarioActivo.sDni, "iId":listaId,"usuariosCompartidos":JSON.stringify(usuariosCompartidos)},
                    success: function(data){
                        alert("Se ha realizado con éxito.");
                        $("#modalSeleccionarUsuario").remove(); 
                    },
                    async: false
                });
            }
        },
        close: function(){
            $("#modalSeleccionarUsuario").remove();
        }
    });
    
     
}

function eliminarTarea($tarea){
    $tarea.remove();
}

function procesoAltaLista(data){
    
    var sErrorLista=data.errorNombreLista;
    if(sErrorLista!=undefined){
        $("input[name='nombreLista']")[0].setCustomValidity(sErrorLista);
        $("input[name='nombreLista']")[0].focus();
        bError=true;
        
    }
    else{
        $("#contenedorListas").empty();
        cargarListas(oUsuarioActivo.sDni);
    }
}