$.ajax({
    async: false,
    url: "./js/controlador.js",
    dataType: "script"
});
function cargarListas(){
    $(document).ready(function() {
        $.ajax({
            method: "POST",
            url: "./php/select/getListasAdmin.php",
            
            success: function(data){
                for(var i=0;i<data.length;i++){
                    var estado="";
                    if(data[i].eliminada==1){
                        estado="Eliminada";
                    }
                    else{
                        estado="En uso";
                    }
                    $("#introducirListas").append("<tr><td>"+data[i].id+"</td><td>"+data[i].nombre+"</td><td>"+data[i].usuarioPropietario+"</td><td>"+estado+"</td></tr>");
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