import { Document } from 'mongoose';

export interface IProject {
  title: String;
  description: String;
  text: String;
  category: String[];
  draft: boolean;
  slug: String;
  link: String;
  createdAt: Date;
  modifiedAt: Date;
}

export interface IProjectModel extends IProject, Document {}
