export type ServiceErrorRes = {
  status: 'error';
  reason: string;
  code: number;
  details?: { [key: string]: unknown };
};

export type ServiceSuccessRes<T> = {
  status: 'ok';
  data: T;
  count?: number;
};

export type ResWithCount<T> = {
  data: T;
  count: number;
};

export type ServiceRes<T> = Promise<ServiceSuccessRes<T> | ServiceErrorRes>;
