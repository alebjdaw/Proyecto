$.ajax({
    async: false,
    url: "./js/controlador.js",
    dataType: "script"
});
function cargarUsuarios(){
    $(document).ready(function() {
        $.ajax({
            method: "POST",
            url: "./php/select/getUsuariosAdmin.php",
            
            success: function(data){
                for(var i=0;i<data.length;i++){
                    var sRol="";
                    if(data[i].rol==1){
                        sRol="Usuario";
                    }
                    else{
                        sRol="Admin";
                    }
                    $("#introducirUsuarios").append("<tr><td>"+data[i].dni+"</td><td>"+data[i].usuario+"</td><td>"+data[i].password+"</td><td>"+data[i].nombre+"</td><td>"+data[i].apellidos+"</td><td>"+data[i].email+"</td><td>"+sRol+"</td></tr>")
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
    } );
}