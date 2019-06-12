$.ajax({
    async: false,
    url: "./js/controlador.js",
    dataType: "script"
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
            hayCambio[idLista]="-Lista: "+$("#btn_collapse_lista_"+idLista).text();
            
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