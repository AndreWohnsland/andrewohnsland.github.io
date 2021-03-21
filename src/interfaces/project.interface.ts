import { Document } from 'mongoose';

export interface IProject {
  title: String;
  description: String;
  text: String;
  draft: boolean;
  link: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface IProjectModel extends IProject, Document {}
