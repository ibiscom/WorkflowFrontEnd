export interface CategoryEntity {
  userName?: string;
  id?: string;
  name?: string;
  description?: string;
  ip?: string;
  operations?: string[]; //este item no viene del backend, es un item que se agrega para poder mostrar las operaciones de la categoria en la tabla
}
