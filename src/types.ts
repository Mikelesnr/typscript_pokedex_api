export interface Pokemon {
  name: string;
  height: number;
  weight: number;
  abilities: Ability[];
  forms: Form[];
  sprites: Sprites;
  types: Type[];
  moves: Move[];
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

export interface Form {
  name: string;
  url: string;
}

export interface Sprites {
  front_default: string;
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
}

export interface Type {
  type: {
    name: string;
    url: string;
  };
}

export interface Move {
  move: {
    name: string;
    url: string;
  };
}
