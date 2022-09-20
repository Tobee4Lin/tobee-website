export enum titleTypeEnum {
  h3 = "h3",
  h4 = "h4",
}

export interface IHeading {
  level: titleTypeEnum;
  text: string;
  id: string;
}
