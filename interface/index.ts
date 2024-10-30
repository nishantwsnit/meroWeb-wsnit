export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}
export interface CreateRequest<T> {
  newEntity: T;
  onSuccess: (response: ApiResponse<T>) => void;
  onError: (error: any) => void;
}

export interface UpdateRequest<T> {
  id: string;
  updatedEntity: Partial<T>;
  onSuccess: (response: ApiResponse<T>) => void;
  onError: (error: any) => void;
}

export interface FetchRequest<T> {
  id?: string;
  onSuccess: (response: ApiResponse<T | T[]>) => void;
  onError: (error: any) => void;
}

export interface DeleteRequest {
  id: string;
  onSuccess: (response: ApiResponse<null>) => void;
  onError: (error: any) => void;
}
