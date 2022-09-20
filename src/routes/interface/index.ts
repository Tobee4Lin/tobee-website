export interface RouteObject {
  label?: string;
  subLabel?: string;
  path: string;
  children?: RouteObject[];
  element?: React.ReactNode;
}
