$.ajax({
    async: false,
    url: "./js/objetos.js",
    dataType: "script"
});
hayCambio=[];
oUsuarioActivo=new Usuario();
$(document).ready(notificacion);

function notificacion(){
    if(oUsuarioActivo.sDni!=null){
        
        $.ajax({
            method: "POST",
            url: "./php/select/getNumNotificaciones.php",
            data: { "sDni" : oUsuarioActivo.sDni},
            success: function(data){
                
                $(".numeroNotificaciones").text(JSON.parse(data));},
            async: false,
            dataType: 'json'
            
        }); 
    }
}
function setUsuarioActivo(sUsuario){
    
    
    $.ajax({
        method: "POST",
        url: "./php/select/getUsuario.php",
        data: { "sUsuario" : sUsuario},
        success: function(data){oUsuarioActivo=new Usuario();
            oUsuarioActivo.sNombre=data.nombre;
            oUsuarioActivo.sApellidos=data.apellidos;
            oUsuarioActivo.sPassword=data.password;
            oUsuarioActivo.sDni=data.dni;
            oUsuarioActivo.sUsuario=data.usuario;
            oUsuarioActivo.bRol=data.rol;
            oUsuarioActivo.sEmail=data.email;},
        async: false,
        dataType: 'json'
        
    }); 

    return oUsuarioActivo;
}

function getLista(sNombre){
    oLista=new Lista();
    $.post( "php/select/getLista.php", { "sNombre" : sNombre}, null, "json" )
    .done(function( data, textStatus, jqXHR ) {
        oLista.sNombre=data.nombre;
        oLista.sUsuarioPropietario=data.usuarioPropietario;
        oLista.bEliminada=data.eliminada;
        oLista.iId=data.id;
        if ( console && console.log ) {
            console.log( "La solicitud se ha completado correctamente." );
        }
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        if ( console && console.log ) {
            console.log( "La solicitud a fallado: " +  textStatus);
        }
    });
    return oLista;
}

function getItem(iId){
    oItem=new Item();
    $.post( "php/select/getItem.php", { "iId" : iId}, null, "json" )
        .done(function( data, textStatus, jqXHR ) {
            oItem.iId=data.id;
            oItem.sNombre=data.nombre;
            oItem.sDescripcion=data.descripcion;
            oItem.dFechaAlta=data.fechaAlta;
            oItem.dFechaBaja=data.fechaBaja;
            oItem.dFechaAviso=data.fechaAviso;
            oItem.sImagen=data.imagen;            
        
            if ( console && console.log ) {
                console.log( "La solicitud se ha completado correctamente." );
            }
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
            if ( console && console.log ) {
                console.log( "La solicitud a fallado: " +  textStatus);
            }
        });

    return oItem;
}

function cargarUsuario(){
    if(Object.keys(hayCambio).length>0){
        $.ajax({
            method: "POST",
            url: "./html/confirmModal3.html",
            success: function(html){
                $("#contenido").append(html);
                for(var i=0; i<Object.keys(hayCambio).length;i++){
                    $("#dialog-confirm3").append("<p>"+hayCambio[Object.keys(hayCambio)[i]]+"</p>");
                }
            },
            async: false,
            dataType: 'html'
        });
        
        $( "#dialog-confirm3" ).dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
              "Estoy seguro": function() {
                hayCambio=[];
                cargarUsuario();
                $( this ).dialog( "close");
              },
              "Cancelar": function() {
                $( this ).dialog( "close" );
              }
            }
          });
    }
    else{
        var jsonUsuario=JSON.stringify(oUsuarioActivo);
        var sHtml="<form method='post' action='./listas.php' id='formulario'><input type='hidden' id='usuario' name='usuario' value='"+jsonUsuario+"'/></form>";
        $('body').append(sHtml);
        $('#formulario').submit();
    } 
    

}

function cargarAdmin(){
    
        var jsonUsuario=JSON.stringify(oUsuarioActivo);
        var sHtml="<form method='post' action='./adminUsuarios.php' id='formulario'><input type='hidden' id='usuario' name='usuario' value='"+jsonUsuario+"'/></form>";
        $('body').append(sHtml);
        $('#formulario').submit();
    
    

}

function cargarAdminListas(){

        var jsonUsuario=JSON.stringify(oUsuarioActivo);
        var sHtml="<form method='post' action='./adminListas.php' id='formulario'><input type='hidden' id='usuario' name='usuario' value='"+jsonUsuario+"'/></form>";
        $('body').append(sHtml);
        $('#formulario').submit();
}

function cargarAdminItems(){
    
        var jsonUsuario=JSON.stringify(oUsuarioActivo);
        var sHtml="<form method='post' action='./adminItems.php' id='formulario'><input type='hidden' id='usuario' name='usuario' value='"+jsonUsuario+"'/></form>";
        $('body').append(sHtml);
        $('#formulario').submit();
}

function cargarListasCompartidas(){

    if(Object.keys(hayCambio).length>0){
        $.ajax({
            method: "POST",
            url: "./html/confirmModal3.html",
            success: function(html){
                $("#contenido").append(html);
                for(var i=0; i<Object.keys(hayCambio).length;i++){
                    $("#dialog-confirm3").append("<p>"+hayCambio[Object.keys(hayCambio)[i]]+"</p>");
                }
            },
            async: false,
            dataType: 'html'
        });
        
        $( "#dialog-confirm3" ).dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
              "Estoy seguro": function() {
                hayCambio=[];
                cargarListasCompartidas();
                $( this ).dialog( "close");
              },
              "Cancelar": function() {
                $( this ).dialog( "close" );
              }
            }
          });
    }
    else{
        var jsonUsuario=JSON.stringify(oUsuarioActivo);
        var sHtml="<form method='post' action='./listasCompartidas.php' id='formulario'><input type='hidden' id='usuario' name='usuario' value='"+jsonUsuario+"'/></form>";
        $('body').append(sHtml);
        $('#formulario').submit();
    }   
}

function cargarPapelera(){
    if(Object.keys(hayCambio).length>0){
        $.ajax({
            method: "POST",
            url: "./html/confirmModal3.html",
            success: function(html){
                $("#contenido").append(html);
                for(var i=0; i<Object.keys(hayCambio).length;i++){
                    $("#dialog-confirm3").append("<p>"+hayCambio[Object.keys(hayCambio)[i]]+"</p>");
                }
            },
            async: false,
            dataType: 'html'
        });
        
        $( "#dialog-confirm3" ).dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
              "Estoy seguro": function() {
                hayCambio=[];
                cargarUsuario();
                $( this ).dialog( "close");
              },
              "Cancelar": function() {
                $( this ).dialog( "close" );
              }
            }
          });
    }
    else{
        var jsonUsuario=JSON.stringify(oUsuarioActivo);
        var sHtml="<form method='post' action='./papelera.php' id='formulario'><input type='hidden' id='usuario' name='usuario' value='"+jsonUsuario+"'/></form>";
        $('body').append(sHtml);
        $('#formulario').submit();
    } 
    

}
function cargarNotificaciones(){
    if(Object.keys(hayCambio).length>0){
        $.ajax({
            method: "POST",
            url: "./html/confirmModal3.html",
            success: function(html){
                $("#contenido").append(html);
                for(var i=0; i<Object.keys(hayCambio).length;i++){
                    $("#dialog-confirm3").append("<p>"+hayCambio[Object.keys(hayCambio)[i]]+"</p>");
                }
            },
            async: false,
            dataType: 'html'
        });
        
        $( "#dialog-confirm3" ).dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
              "Estoy seguro": function() {
                hayCambio=[];
                cargarNotificaciones();
                $( this ).dialog( "close");
              },
              "Cancelar": function() {
                $( this ).dialog( "close" );
              }
            }
          });
    }
    else{
        var jsonUsuario=JSON.stringify(oUsuarioActivo);
        var sHtml="<form method='post' action='./notificaciones.php' id='formulario'><input type='hidden' id='usuario' name='usuario' value='"+jsonUsuario+"'/></form>";
        $('body').append(sHtml);
        $('#formulario').submit();
    } 
    

}

function salir(){
    if(Object.keys(hayCambio).length>0){
        $.ajax({
            method: "POST",
            url: "./html/confirmModal3.html",
            success: function(html){
                $("#contenido").append(html);
                for(var i=0; i<Object.keys(hayCambio).length;i++){
                    $("#dialog-confirm3").append("<p>"+hayCambio[Object.keys(hayCambio)[i]]+"</p>");
                }
            },
            async: false,
            dataType: 'html'
        });
        
        $( "#dialog-confirm3" ).dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
              "Estoy seguro": function() {
                hayCambio=[];
                cargarUsuario();
                $( this ).dialog( "close");
              },
              "Cancelar": function() {
                $( this ).dialog( "close" );
              }
            }
          });
    }
    else{
        oUsuarioActivo=null;
        var sHtml="<form method='post' action='./listas.php' id='formulario'><input type='hidden' id='usuario' name='usuario' value=''/></form>";
        $('body').append(sHtml);
        $('#formulario').submit();
    } 
    

}

function cargarPerfil(){
    if(Object.keys(hayCambio).length>0){
        $.ajax({
            method: "POST",
            url: "./html/confirmModal3.html",
            success: function(html){
                $("#contenido").append(html);
                for(var i=0; i<Object.keys(hayCambio).length;i++){
                    $("#dialog-confirm3").append("<p>"+hayCambio[Object.keys(hayCambio)[i]]+"</p>");
                }
            },
            async: false,
            dataType: 'html'
        });
        
        $( "#dialog-confirm3" ).dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
              "Estoy seguro": function() {
                hayCambio=[];
                cargarUsuario();
                $( this ).dialog( "close");
              },
              "Cancelar": function() {
                $( this ).dialog( "close" );
              }
            }
          });
    }
    else{
        var jsonUsuario=JSON.stringify(oUsuarioActivo);
        var sHtml="<form method='post' action='./perfil.php' id='formulario'><input type='hidden' id='usuario' name='usuario' value='"+jsonUsuario+"'/></form>";
        $('body').append(sHtml);
        $('#formulario').submit();
    } 
    

}

