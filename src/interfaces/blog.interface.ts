import { Document } from 'mongoose';

export interface IBlog {
  title: string;
  description: string;
  text: string;
  category: string[];
  slug: string;
  draft: boolean;
  createdAt: Date;
  modifiedAt: Date;
}

export interface IBlogModel extends IBlog, Document {}
