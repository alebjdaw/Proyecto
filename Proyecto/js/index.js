$.getScript( "js/controlador.js", function( data, textStatus, jqxhr ) {
    console.log( textStatus ); // Success
    console.log( jqxhr.status ); // 200
    console.log( "Load was performed." );
  });
$("#registroForm")[0].addEventListener("submit",registrarse);
$("#loginForm")[0].addEventListener("submit",iniciarSesion);

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
        
        $("#registroRepitePassword")[0].setCustomValidity("Las contraseñas deben ser iguales.");
        $("#registroRepitePassword").focus();
        
    }

    $.ajax({
        url:"prueba.php",
        async:false,
        data:{ "sUsuario" : sUsuario},
        dataType:"json",
        sucess: function(data){
            alert(data);
        }
    });
    
    
    
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

function procesoAltaUsuario(data){
    var sMensajeError=data.mensajeError;
        var sMensaje=data.mensaje;
        var sErrorUsuario=data.errorUsuario;
        var sErrorDni=data.errorDni;
        var sErrorEmail=data.errorEmail;
        var bError=true;
        var sErrores="";

    if(sErrorUsuario!=undefined){
        $("#registroUsuario")[0].setCustomValidity(sErrorUsuario);
        $("#registroUsuario").focus();
        bError=true;
        sErrores+=sErrorUsuario+"\n";
    }
    if(sErrorEmail!=undefined){
        $("#registroEmail")[0].setCustomValidity(sErrorEmail);
        if(!bError){
            $("#registroEmail").focus();
            bError=true;
        }
        sErrores+=sErrorEmail+"\n";
        
    }
    if(sErrorDni!=undefined){
        $("#registroDni")[0].setCustomValidity(sErrorDni);
        if(!bError){
            $("#registroDni").focus();
            bError=true;
        }
        sErrores+=sErrorDni+"\n";
        
    }
    if(sErrorMensaje!=undefined){
        alert(sMensaje);
        iniciarSesion(sUsuario,sPassword);
    }
    else{
        if(sErrores!=""){
            alert(sErrores);
        }
        else{
            alert(sMensajeError);
        }
    }
}