export interface IElement {
  createdAt: string;
  updatedAt: string;
  _id: string;
  title: string;
  description: string;
  draft: boolean;
  link?: string | undefined;
  text: string;
}

export interface IElementPost {
  elementId: string;
  title: string;
  description: string;
  text: string;
  link: string;
  draft: boolean;
}
