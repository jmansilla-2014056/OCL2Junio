export default class atr_xml{
    public id: string
    public valor: any
    public linea: number
    public columna: number
    constructor(id,valor,linea,columna){
        this.id = id
        this.valor = valor
        this.linea = linea
        this.columna = columna
    }
}