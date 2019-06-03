$.getScript( "js/objetos.js", function( data, textStatus, jqxhr ) {
  console.log( textStatus ); // Success
  console.log( jqxhr.status ); // 200
  console.log( "Load was performed." );
});





function getUsuario(sUsuario){
    oUsuario=new Usuario();
    $.post( "php/select/getUsuario.php", { "sUsuario" : sUsuario}, null, "json" )
    .done(function( data, textStatus, jqXHR ) {
        oUsuario.sNombre=data.nombre;
        oUsuario.sApellidos=data.apellidos;
        oUsuario.sPassword=data.password;
        oUsuario.sDni=data.dni;
        oUsuario.sUsuario=data.usuario;
        oUsuario.bRol=data.rol;
        if ( console && console.log ) {
            console.log( "La solicitud se ha completado correctamente." );
        }
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        if ( console && console.log ) {
            console.log( "La solicitud a fallado: " +  textStatus);
        }
    });

    return oUsuario;
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