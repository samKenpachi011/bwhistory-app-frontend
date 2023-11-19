export interface IEthinicGroup {
  name?: string;
  description?: string;
  language: string;
  population?: number;
  geography?: string;
  history?: string;
  tags?: Tag[];

}

// export interface Tag {
//   name?: string;
// }

export interface Tag {
  item_id?: number;
  item_text?: string;
}
