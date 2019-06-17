$.ajax({
    async: false,
    url: "./js/controlador.js",
    dataType: "script"
});
$("#formularioPerfil")[0].addEventListener("submit",cambiarDatos);
$("#repiteContraseñaUsuario").change(function(){$("#repiteContraseñaUsuario")[0].setCustomValidity("");});
$("#correoUsuario").change(function(){$("#correoUsuario")[0].setCustomValidity("");});


function cargarPerfilInicio(){
    $("#dniUsuario").val(oUsuarioActivo.sDni);
    $("#usuarioUsuario").val(oUsuarioActivo.sUsuario);
    $("#nombreUsuario").val(oUsuarioActivo.sNombre);
    $("#apellidosUsuario").val(oUsuarioActivo.sApellidos);
    $("#correoUsuario").val(oUsuarioActivo.sEmail);
    $("#contraseñaUsuario").val(oUsuarioActivo.sPassword);
    $("#repiteContraseñaUsuario").val("");
}

function modificarDatos(){
    $("#nombreUsuario")[0].disabled=false;
    $("#apellidosUsuario")[0].disabled=false;
    $("#correoUsuario")[0].disabled=false;
    $("#contraseñaUsuario")[0].disabled=false;
    $("#ocultoRepiteContraseña").show();
    $("#botones").empty();
    $("#botones").append('<td><input type="submit" value="Confirmar" class="btn btn-light" id="cambiarDatos"></button></td>');
    $("#botones").append('<td><button type="button" class="btn btn-light" id="cancelarDatos" onclick="cancelarCambiarDatos()">Cancelar</button></td>');
}

function cambiarDatos(){
    var nombreUsuario=$("#nombreUsuario").val().trim();
    var apellidosUsuario=$("#apellidosUsuario").val().trim();
    var correoUsuario=$("#correoUsuario").val().trim();
    var contraseñaUsuario=$("#contraseñaUsuario").val().trim();
    var repiteContraseñaUSuario=$("#repiteContraseñaUsuario").val().trim();
    var mismoCorreo=false;
    oUsuario=new Usuario();
    event.preventDefault();
    if(contraseñaUsuario!=repiteContraseñaUSuario){        
        $("#repiteContraseñaUsuario")[0].setCustomValidity("Las contraseñas deben ser iguales.");
        $("#repiteContraseñaUsuario").focus();  
        return;  
    }
    if(correoUsuario==oUsuarioActivo.sEmail){
        oUsuario.mismoCorreo=true;
    }
    else{
        oUsuario.mismoCorreo=false

    }
    
    oUsuario.sNombre=nombreUsuario;
    oUsuario.sApellidos=apellidosUsuario;
    oUsuario.sEmail=correoUsuario;
    oUsuario.sPassword=contraseñaUsuario;
    oUsuario.sDni=oUsuarioActivo.sDni;
    
    var sParametros="datos="+JSON.stringify(oUsuario);

    
    $.post("./php/update/modificarUsuario.php", sParametros, procesoModificarUsuario, 'json');
}

function procesoModificarUsuario(data){
    
    var sErrorEmail=data.errorEmail;
    var bError=false;
        

    
    if(sErrorEmail!=undefined){
        $("#correoUsuario")[0].setCustomValidity(sErrorEmail);
        if(!bError){
            $("#correoUsuario").focus();
            bError=true;
        }
    }
    
    
    if(!bError){
        oUsuarioActivo.sNombre=oUsuario.sNombre;
        oUsuarioActivo.sApellidos=oUsuario.sApellidos;
        oUsuarioActivo.sEmail=oUsuario.sEmail;
        oUsuarioActivo.sPassword=oUsuario.sPassword;
        alert('Datos modificados');
        cancelarCambiarDatos();
    }
    
}

function cancelarCambiarDatos(){
    cargarPerfilInicio();
    $("#dniUsuario")[0].disabled=true;
    $("#usuarioUsuario")[0].disabled=true;
    $("#nombreUsuario")[0].disabled=true;
    $("#apellidosUsuario")[0].disabled=true;
    $("#correoUsuario")[0].disabled=true;
    $("#contraseñaUsuario")[0].disabled=true;
    $("#ocultoRepiteContraseña").hide();
    $("#botones").empty();
    $("#botones").append('<td colspan="2"><button type="button" class="btn btn-light" id="btnModificarDatos" onclick="modificarDatos()">Modificar datos</button></td>');
}

function mostrarContraseña() {
    var x = document.getElementById("contraseñaUsuario");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }