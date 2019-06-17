$.ajax({
    async: false,
    url: "./js/controlador.js",
    dataType: "script"
});
function cargarNotificacionesInicio(dni){
    $.ajax({
        method: "POST",
        url: "./php/select/getNotificaciones.php",
        data:{"sDni":dni},
        success: function(data){
            console.log(data);
            for(var i=0;i<data.length;i++){
                if(data[i].leida==0){
                    $("#introducirNotificaciones").append("<tr><td><input type='checkbox' id='"+data[i].id+"' onclick='updateLeido($(this))'></td><td>"+data[i].id+"</td><td>"+data[i].usuario1+"</td><td>"+data[i].usuario2+"</td><td>"+data[i].descripcion+"</td><td>"+data[i].fecha.slice(0,10)+"</td></tr>");

                }
                else{
                    $("#introducirNotificaciones").append("<tr><td><input type='checkbox' id='"+data[i].id+"' onclick='updateLeido($(this))' checked></td><td>"+data[i].id+"</td><td>"+data[i].usuario1+"</td><td>"+data[i].usuario2+"</td><td>"+data[i].descripcion+"</td><td>"+data[i].fecha.slice(0,10)+"</td></tr>");
                    

                }
            }
                    
        },
        async: false,
        dataType: 'json'
    });
    $('#dateTable').DataTable( {            
        responsive: true,        
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

}

function updateLeido($this){
    var leido=$this[0].checked;
    var id=$this.attr("id");
    if(leido){
        leido=1;
    }
    else{
        leido=0;
    }
    $.post("./php/update/notificacionLeida.php",{"leido":leido,"id":id});
}

function vaciarNotificaciones(){
    $.ajax({
        method: "POST",
        url: "./html/confirmModal8.html",
        success: function(html){
            $("#contenido").append(html);
        },
        async: false,
        dataType: 'html'
    });
    
    $( "#dialog-confirm8" ).dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
          "Borrar": function() {
            
            $("#introducirNotificaciones").empty();
            $.post("./php/delete/eliminarTodo2.php",{"sDni":oUsuarioActivo.sDni});
            $( this ).dialog( "close");
          },
          "Cancelar": function() {
            $( this ).dialog( "close" );
          }
        }
      });
}