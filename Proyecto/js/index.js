
    $.ajax({
        async: false,
        url: "./js/controlador.js",
        dataType: "script"
    });
    $("#registroForm")[0].addEventListener("submit",registrarse);
    $("#loginForm")[0].addEventListener("submit",comprobarUsuario);
    $("#registroDni").change(function(){$("#registroDni")[0].setCustomValidity("");});
    $("#registroUsuario").change(function(){$("#registroUsuario")[0].setCustomValidity("");});
    $("#registroRepitePassword").change(function(){$("#registroRepitePassword")[0].setCustomValidity("");});
    $("#registroEmail").change(function(){$("#registroEmail")[0].setCustomValidity("");});
    $("#loginUsuario").change(function(){$("#loginUsuario")[0].setCustomValidity("");});
    $("#loginPassword").change(function(){$("#loginPassword")[0].setCustomValidity("");});



function iniciarSesion(usuario){
    
    oUsuarioActivo=setUsuarioActivo(usuario);
    
}

function registrarse(event){
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

    var oUsuario=new Usuario();
        oUsuario.sApellidos=sApellidos;
        oUsuario.sDni=sDni;
        oUsuario.sPassword=sPassword;
        oUsuario.sRol=sRol;
        oUsuario.sNombre=sNombre;
        oUsuario.sUsuario=sUsuario;
        oUsuario.sEmail=sEmail;
    
    var sParametros="datos="+JSON.stringify(oUsuario);

    event.preventDefault();
    $.post("./php/insert/altaUsuario.php", sParametros, procesoAltaUsuario, 'json');
    
    
}

function comprobarUsuario(event){
    event.preventDefault();
    var sUsuario=$("#loginUsuario").val().trim();
    var sPassword=$("#loginPassword").val().trim();
    
    var oParametros={"sUsuario" : sUsuario,"sPassword":sPassword};
    var sParametros="datos="+JSON.stringify(oParametros);
    $.post( "./php/select/comprobarUsuario.php", sParametros,procesoComprobarUsuario,"json");
    
}

function procesoComprobarUsuario(data){
    if(data.respuesta){
    
        iniciarSesion(data.usuario);
        if(oUsuarioActivo.bRol==1){
            cargarUsuario();
        }
        else{
            cargarAdmin();
        }
    }
    else{
        $("#loginUsuario")[0].setCustomValidity("El usuario o la contraseña son incorrectos.");
        $("#loginPassword")[0].setCustomValidity("El usuario o la contraseña son incorrectos.");
        $("#loginUsuario").val("");
        $("#loginPassword").val("");
    }
}



function procesoAltaUsuario(data){
    
    var sErrorUsuario=data.errorUsuario;
    var sErrorDni=data.errorDni;
    var sErrorEmail=data.errorEmail;
    var bError=false;
        

    if(sErrorUsuario!=undefined){
        $("#registroUsuario")[0].setCustomValidity(sErrorUsuario);
        $("#registroUsuario").focus();
        bError=true;
        
    }
    
    if(sErrorEmail!=undefined){
        $("#registroEmail")[0].setCustomValidity(sErrorEmail);
        if(!bError){
            $("#registroEmail").focus();
            bError=true;
        }
    }
    
    if(sErrorDni!=undefined){
        $("#registroDni")[0].setCustomValidity(sErrorDni);
        if(!bError){
            $("#registroDni").focus();
            bError=true;
        }
    }
    
    if(!bError){
        $("#registroModal").modal('toggle');
        $("#loginModal").modal('toggle');

        $("#registroDni").val("");
        $("#registroPassword").val("");
        $("#registroRepitePassword").val("");
        $("#registroNombre").val("");
        $("#registroApellidos").val("");
        $("#registroUsuario").val("");
        $("#registroEmail").val("");
    }
    
}