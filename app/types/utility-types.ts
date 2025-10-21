export interface BaseJsonResponse<T> {
  message: string;
  data: T;
}

export type Errors422 = Record<string, string[]>;

export interface IFile {
  id: number;
  extension: string;
  mimetype: string;
  original_name: string;
  thumbnail_url: string;
  url: string;
  size: number;
}

export interface ICheckboxItem {
  label: string;
  value: boolean;
  id?: string;
  disabled?: boolean;
}

export interface IRadioItem {
  name: string;
  value: string | number | boolean;
  disabled?: boolean;
}

export interface ITab {
  value: string;
  label: string;
}

export interface ISelectItem {
  value?: string | number;
  id?: string | number;
  name: string;
}

export interface MultiselectItem {
  name: string;
  value?: string;
  id?: string;
}

export interface IMessageResponse {
  message: string;
}

export interface IBreadcrumbItem {
  name: string;
  link: string;
}
