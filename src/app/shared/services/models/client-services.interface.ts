/**
 * Formato de RESPONSE genéricos
 */
export interface IGlobalSuccessfulResponse<IData> {
  status: number;
  data?: IData; // depende del BODY de la respuesta
}

export interface IGlobalErrorResponse<IError> {
  status: number;
  error?: IError; // debe ser personalizado
}

/**
 * Formato de ErrorResponse
 */
export interface IErrorResponseModel {
  errorMessage: string;
}

/**
 * Formato de parametros genérico
 */
export interface IGenericParams {
  [ key: string ]: string | number;
}
