import { Document } from 'mongoose';

export interface IProject {
  title: string;
  description: string;
  text: string;
  category: string[];
  draft: boolean;
  slug: string;
  link: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface IProjectModel extends IProject, Document {}
