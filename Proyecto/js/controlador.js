$.getScript( "./js/objetos.js");


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