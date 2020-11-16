import {
  ContainerColor,
  ContainerMaterial,
  ContainerType,
  ContainerUnit,
} from 'beverage/utils/enums';

export type Container = {
  color: ContainerColor;
  material: ContainerMaterial;
  unit: ContainerUnit;
  type: ContainerType;
  value: number;
  hasCork?: boolean;
  hasCapWireFlip?: boolean;
};
