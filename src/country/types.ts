export type Country = {
  code: string;
  id: string;
  name: {
    language?: string;
    value: string;
  }[];
};
