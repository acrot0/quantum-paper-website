export interface Section {
  id: string;
  title: string;
  order: number;
}

export const paperSections: Section[] = [
  { id: 'abstract', title: 'Abstract', order: 1 },
  { id: 'introduction', title: '1. Introduction', order: 2 },
  { id: 'methodology', title: '2. Methodology', order: 3 },
  { id: 'experiments', title: '3. Experiments & Results', order: 4 },
  { id: 'discussion', title: '4. Discussion', order: 5 },
  { id: 'conclusion', title: '5. Conclusion', order: 6 },
  { id: 'references', title: 'References', order: 7 },
];
