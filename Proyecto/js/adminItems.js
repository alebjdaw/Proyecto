$.ajax({
    async: false,
    url: "./js/controlador.js",
    dataType: "script"
});
function cargarItems(){
    $(document).ready(function() {
        $.ajax({
            method: "POST",
            url: "./php/select/getItemsAdmin.php",
            
            success: function(data){
                for(var i=0;i<data.length;i++){
        
                    $("#introducirUsuarios").append("<tr><td>"+data[i].id+"</td><td>"+data[i].nombre+"</td><td>"+data[i].descripcion+"</td><td>"+data[i].fechaAlta+"</td><td>"+data[i].fechaAviso+"</td><td><img src='./imagenes/item/"+data[i].imagen+"' alt='No tiene imagen' height='50' width='50'></td><td>"+data[i].lista+"</td><td>"+data[i].orden+"</td></tr>");
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