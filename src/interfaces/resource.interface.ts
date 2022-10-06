import { Document } from 'mongoose';

export interface IResource {
  name: string;
  filename: string;
  blogId: string;
  link: string;
}

export interface IResourceModel extends IResource, Document {}
