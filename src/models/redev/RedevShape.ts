export interface RedevShape {
  id: number;
  title: string;
  district: string;
  geometry_points: { x: number; y: number }[];
  geometry_shape: "polygon";
  center_x: string;
  center_y: string;
  is_newtown: 1 | 0;
}
