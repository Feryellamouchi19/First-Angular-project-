export interface Conference {
  id: number;
  title: string;
  date: string;
  adrees: string;           // Requis par la spécification (adrees)
  address?: string;         // Alias
  'available-Places': number; // Requis par la spécification (available-Places)
  availablePlaces: number;    // Alias camelCase
  picture: string;
  category?: string;
  description?: string;
  price?: number;
  speaker?: string;
}
