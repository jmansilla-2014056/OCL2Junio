export default class err{
    public n: number
    public descripcion: string
    public linea: number
    public columna: number
    constructor(descripcion,linea,columna){
        this.descripcion = descripcion
        this.linea = linea
        this.columna = columna
    }
}