import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Performs a GET request to the specified endpoint using Axios.
 *
 * @template ResponseType - The expected type of the response data.
 * @template ErrorType - The expected type of the error response.
 * @param {string} endpoint - The URL endpoint for the GET request.
 * @param {AxiosRequestConfig<void>} [config] - Optional Axios configuration for the request.
 * @returns {Promise<ResponseType>} A promise that resolves to the response data of type ResponseType.
 * @throws {AxiosError<ErrorType>} Throws an AxiosError if the request fails.
 */
export function getRequest<ResponseType, ErrorType>(endpoint: string, config?: AxiosRequestConfig<void>) {
  return axios
    .get<ResponseType, AxiosResponse<ResponseType, void>, void>(endpoint, config)
    .then(({ data }) => data)
    .catch((error: AxiosError<ErrorType>) => Promise.reject(error));
}

/**
 * Performs a POST request to the specified endpoint using Axios.
 *
 * @template RequestBodyType - The type of the request body.
 * @template ResponseType - The expected type of the response data.
 * @template ErrorType - The expected type of the error response.
 * @param {string} endpoint - The URL endpoint for the POST request.
 * @param {RequestBodyType} requestBody - The data to be sent as the request body.
 * @param {AxiosRequestConfig<RequestBodyType>} [config] - Optional Axios configuration for the request.
 * @returns {Promise<ResponseType>} A promise that resolves to the Axios response, containing the response data of type ResponseType.
 * @throws {AxiosError<ErrorType, RequestBodyType>} Throws an AxiosError if the request fails.
 */
export function postRequest<RequestBodyType, ResponseType, ErrorType>(endpoint: string, requestBody: RequestBodyType, config?: AxiosRequestConfig<RequestBodyType>) {
  return axios
    .post<RequestBodyType, AxiosResponse<ResponseType, RequestBodyType>, RequestBodyType>(endpoint, requestBody, config)
    .then(({ data }) => data)
    .catch((error: AxiosError<ErrorType, RequestBodyType>) => Promise.reject(error));
}

/**
 * Performs a PUT request to the specified endpoint using Axios.
 *
 * @template RequestBodyType - The type of the request body.
 * @template ResponseType - The expected type of the response data.
 * @template ErrorType - The expected type of the error response.
 * @param {string} endpoint - The URL endpoint for the PUT request.
 * @param {RequestBodyType} requestBody - The data to be sent as the request body.
 * @param {AxiosRequestConfig<RequestBodyType>} [config] - Optional Axios configuration for the request.
 * @returns {Promise<ResponseType>} A promise that resolves to the Axios response, containing the response data of type ResponseType.
 * @throws {AxiosError<ErrorType, RequestBodyType>} Throws an AxiosError if the request fails.
 */
export function putRequest<RequestBodyType, ResponseType, ErrorType>(endpoint: string, requestBody: RequestBodyType, config?: AxiosRequestConfig<RequestBodyType>) {
  return axios
    .put<RequestBodyType, AxiosResponse<ResponseType, RequestBodyType>, RequestBodyType>(endpoint, requestBody, config)
    .then(({ data }) => data)
    .catch((error: AxiosError<ErrorType, RequestBodyType>) => Promise.reject(error));
}

export function patchRequest<RequestBodyType, ResponseType, ErrorType>(endpoint: string, requestBody: RequestBodyType, config?: AxiosRequestConfig<RequestBodyType>) {
  return axios
    .patch<RequestBodyType, AxiosResponse<ResponseType, RequestBodyType>, RequestBodyType>(endpoint, requestBody, config)
    .then(({ data }) => data)
    .catch((error: AxiosError<ErrorType, RequestBodyType>) => Promise.reject(error));
}

/**
 * Performs a DELETE request to the specified endpoint using Axios.
 *
 * @param {RequestBodyType} requestBody - The data to be sent as the request body.
 * @template ResponseType - The expected type of the response data.
 * @template ErrorType - The expected type of the error response.
 * @param {string} endpoint - The URL endpoint for the DELETE request.
 * @param {AxiosRequestConfig<void>} [config] - Optional Axios configuration for the request.
 * @returns {Promise<ResponseType>} A promise that resolves to the response data of type ResponseType.
 * @throws {AxiosError<ErrorType>} Throws an AxiosError if the request fails.
 */
export function deleteRequest<RequestBodyType, ResponseType, ErrorType>(endpoint: string, config?: AxiosRequestConfig<RequestBodyType>) {
  return axios
    .delete<ResponseType, AxiosResponse<ResponseType, RequestBodyType>, RequestBodyType>(endpoint, config)
    .then(({ data }) => data)
    .catch((error: AxiosError<ErrorType>) => Promise.reject(error));
}
