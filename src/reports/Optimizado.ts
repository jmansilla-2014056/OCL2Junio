class Optimizado{
  regla: string;
  desc: string;

  constructor(regla: string, desc: string) {
    this.regla = regla;
    this.desc = desc;
  }
  toString():string{
    return "Regla: " + this.regla + ", descripcion: " + this.desc;
  }
}
export {Optimizado};
