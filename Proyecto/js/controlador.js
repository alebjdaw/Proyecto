$.getScript( "js/objetos.js", function( data, textStatus, jqxhr ) {
  console.log( textStatus ); // Success
  console.log( jqxhr.status ); // 200
  console.log( "Load was performed." );
});



function iniciarSesion(sUsuario,sPassword){
    var bComprobarUsuario=comprobarUsuario(sUsuario,sPassword);
    if(bComprobarUsuario){
        oUsuarioActivo=getUsuario(sUsuario);
        if(oUsuarioActivo.bRol==1){
            cargarUsuario();
        }
        else{
            cargarAdmin();
        }
    }
    else{
        alert("El usuario o la contraseña son incorrectos.");
    }
}

function registrarse(){
    var sDni=$("#registroDni").val().trim();
    var sPassword=$("#registroPassword").val().trim();
    var sRepitePassword=$("#registroRepitePassword").val().trim();
    var sRol=1;
    var sNombre=$("#registroNombre").val().trim();
    var sApellidos=$("#registroApellidos").val().trim();
    var sUsuario=$("#registroUsuario").val().trim();
    var sEmail=$("#registroEmail").val().trim();

    if(sRepitePassword!=sPassword){
        alert("Las contraseñas deben ser iguales");
        $("#registroRepiteContraseña")[0].setCustomValidity("Las contraseñas deben ser iguales.");
        $("#registroRepiteContraseña").focus();
        return;
    }

    bBoolean=false;
    $.post( "php/insert/altaUsuario.php", 
    { "sUsuario" : sUsuario,
    "sPassword":sPassword,
    "sDni":sDni,
    "sRol":sRol,
    "sNombre":sNombre,
    "sApellidos":sApellidos,
    "sEmail":sEmail}, null, "json" )
    .done(function( data, textStatus, jqXHR ) {
        iError=data.error;
        sMensaje=data.mensaje;
        if ( console && console.log ) {
            console.log( "La solicitud se ha completado correctamente." );
        }
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        if ( console && console.log ) {
            console.log( "La solicitud a fallado: " +  textStatus);
        }
    });
    if(iError==0){
        alert(sMensaje);
        iniciarSesion(sUsuario,sPassword);
    }
    else{
        alert(sMensaje);
    }
    
}

function comprobarUsuario(sUsuario,sPassword){
    bBoolean=false;
    $.post( "php/select/comprobarUsuario.php", { "sUsuario" : sUsuario,"sPassword":sPassword}, null, "json" )
    .done(function( data, textStatus, jqXHR ) {
        bBoolean=data.bBoolean;
        if ( console && console.log ) {
            console.log( "La solicitud se ha completado correctamente." );
        }
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        if ( console && console.log ) {
            console.log( "La solicitud a fallado: " +  textStatus);
        }
    });

    return bBoolean;
}

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