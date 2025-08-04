export type Character = {
  id: number;
  name: string;
  status: string;
  image: string;
  episode: string[]; 
  location?: {name: string; url: string};
};
