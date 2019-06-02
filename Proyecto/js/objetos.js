class Usuario{
    constructor(sDni,sPassword,bRol,sNombre,sApellidos,sUsuario){
        this.sDni=sDni;
        this.sPassword=sPassword;
        this.bRol=bRol;
        this.sNombre=sNombre;
        this.sApellidos=sApellidos;
        this.aUsuario=aUsuario;
    }

}

class Lista{
    constructor(iId,sNombre,sUsuarioPropietario,bEliminada){
        this.iId=iId;
        this.sNombre=sNombre;
        this.sUsuarioPropietario=sUsuarioPropietario;
        this.bEliminada=bEliminada;
    }
}

class Item{
    constructor(iId,sNombre,sDescripcion,dFechaAlta,dFechaBaja,dFechaAviso,sFicheroImagen,iLista){
        this.iId=iId;
        this.sNombre=sNombre;
        this.sDescripcion=sDescripcion;
        this.dFechaAlta=dFechaAlta;
        this.dFechaBaja=dFechaBaja;
        this.dFechaAviso=dFechaAviso;
        this.sFicheroImagen=sFicheroImagen;
        this.iLista=iLista;
    }
}