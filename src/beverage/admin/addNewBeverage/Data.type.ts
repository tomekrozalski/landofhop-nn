export type DataType = {
  added?: Date;
  aged?: {
    label?: {
      type?: string;
      wood?: string;
      time?: {
        unit: string;
        value: number;
      };
      previousContent?: string[];
    }[];
    producer?: {
      type?: string;
      wood?: string;
      time?: {
        unit: string;
        value: number;
      };
      previousContent?: string[];
    }[];
    editorial?: {
      type?: string;
      wood?: string;
      time?: {
        unit: string;
        value: number;
      };
      previousContent?: string[];
    }[];
  };
  alcohol?: {
    label?: {
      relate: string;
      scope?: string;
      unit: string;
      value: number;
    };
    producer?: {
      relate: string;
      scope?: string;
      unit: string;
      value: number;
    };
    editorial?: {
      scope: string;
    };
  };
  badge: string;
  barcode?: string;
  bitterness?: {
    label?: number;
    producer?: number;
  };
  brand: string;
  clarity: {
    editorial?: string;
  };
  color: {
    editorial?: string;
  };
  container: {
    color: string;
    hasCapWireFlip: boolean;
    hasCork: boolean;
    material: string;
    type: string;
    unit: string;
    value: number;
  };
  contract?: {
    label?: string;
    producer?: string;
    editorial?: string;
  };
  cooperation?: {
    label?: string[];
    producer?: string[];
    editorial?: string[];
  };
  dryHopped?: {
    label?: string[];
    producer?: string[];
    editorial?: string[];
  };
  expirationDate?: {
    label?: {
      unit: string;
      value: number;
    };
    producer?: {
      unit: string;
      value: number;
    };
  };
  extract?: {
    label?: {
      relate: string;
      unit: string;
      value: number;
    };
    producer?: {
      relate: string;
      unit: string;
      value: number;
    };
  };
  fermentation?: {
    label?: string[];
    producer?: string[];
    editorial?: string[];
  };
  filtration?: {
    label?: boolean;
    producer?: boolean;
    editorial?: boolean;
  };
  fullness?: {
    label?: number;
    producer?: number;
  };
  hoppyness?: {
    label?: number;
    producer?: number;
  };
  hopRate?: {
    label?: {
      unit: string;
      value: number;
    };
    producer?: {
      unit: string;
      value: number;
    };
  };
  ingredientsDescription?: {
    label?: {
      language;
      value;
      complete;
    }[];
    producer?: {
      language;
      value;
      complete;
    }[];
  };
  ingredientsList?: {
    label?: string[];
    producer?: string[];
  };
  isContract?: {
    label?: boolean;
    producer?: boolean;
    editorial?: boolean;
  };
  isDryHopped?: {
    label?: boolean;
    producer?: boolean;
    editorial?: boolean;
  };
  name: {
    language?: string;
    value: string;
  }[];
  notes?: string;
  pasteurization?: {
    label?: boolean;
    producer?: boolean;
    editorial?: boolean;
  };
  place?: {
    label?: string;
    producer?: string;
    editorial?: string;
  };
  power?: {
    label?: number;
    producer?: number;
  };
  price?: {
    label?: {
      currency: string;
      date: Date;
      value: number;
    }[];
    producer?: {
      currency: string;
      date: Date;
      value: number;
    }[];
    editorial?: {
      currency: string;
      date: Date;
      value: number;
    }[];
  };
  remark?: {
    label?: { language?: string; value: string }[];
    producer?: { language?: string; value: string }[];
    editorial?: { language?: string; value: string }[];
  };
  series?: {
    label?: { language?: string; value: string }[];
    producer?: { language?: string; value: string }[];
  };
  smokedMalt?: {
    label?: boolean;
    producer?: boolean;
  };
  style?: {
    label?: { language?: string; value: string }[];
    producer?: { language?: string; value: string }[];
    editorial?: { language?: string; value: string }[];
  };
  sweetness?: {
    label?: number;
    producer?: number;
  };
  tale?: {
    label?: { language?: string; lead: string; article?: string }[];
    producer?: { language?: string; lead: string; article?: string }[];
  };
  temperature?: {
    label?: {
      from: number;
      to: number;
      unit: string;
    };
    producer?: {
      from: number;
      to: number;
      unit: string;
    };
  };
  updated?: Date;
  shortId: string;
};
