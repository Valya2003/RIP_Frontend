/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Calculation {
  /** ID */
  id?: number;
  /** Owner */
  owner?: string;
  /** Moderator */
  moderator?: string;
  /** Status */
  status?: string;
  /** Resistors */
  resistors?: string;
  /**
   * Дата создания
   * @format date-time
   */
  date_created?: string | null;
  /**
   * Дата формирования
   * @format date-time
   */
  date_formation?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  date_complete?: string | null;
  /**
   * Voltage
   * @min -2147483648
   * @max 2147483647
   */
  voltage?: number | null;
  /**
   * Current
   * @min -2147483648
   * @max 2147483647
   */
  current?: number | null;
}

export interface ResistorCalculation {
  /** ID */
  id?: number;
  /**
   * Count
   * @min -2147483648
   * @max 2147483647
   */
  count?: number;
  /** Resistor */
  resistor?: number | null;
  /** Calculation */
  calculation?: number | null;
}

export interface UserLogin {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface UserRegister {
  /** ID */
  id?: number;
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

export interface UserProfile {
  /**
   * Username
   * @minLength 1
   */
  username?: string;
  /**
   * Email
   * @minLength 1
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   */
  password?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  calculations = {
    /**
     * No description
     *
     * @tags calculations
     * @name CalculationsList
     * @request GET:/calculations/
     * @secure
     */
    calculationsList: (
      query?: {
        status?: string;
        date_formation_start?: string;
        date_formation_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/calculations/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags calculations
     * @name CalculationsRead
     * @request GET:/calculations/{calculation_id}/
     * @secure
     */
    calculationsRead: (calculationId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/calculations/${calculationId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags calculations
     * @name CalculationsDeleteDelete
     * @request DELETE:/calculations/{calculation_id}/delete/
     * @secure
     */
    calculationsDeleteDelete: (calculationId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/calculations/${calculationId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags calculations
     * @name CalculationsDeleteResistorDelete
     * @request DELETE:/calculations/{calculation_id}/delete_resistor/{resistor_id}/
     * @secure
     */
    calculationsDeleteResistorDelete: (calculationId: string, resistorId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/calculations/${calculationId}/delete_resistor/${resistorId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags calculations
     * @name CalculationsUpdateUpdate
     * @request PUT:/calculations/{calculation_id}/update/
     * @secure
     */
    calculationsUpdateUpdate: (calculationId: string, data: Calculation, params: RequestParams = {}) =>
      this.request<Calculation, any>({
        path: `/calculations/${calculationId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags calculations
     * @name CalculationsUpdateResistorUpdate
     * @request PUT:/calculations/{calculation_id}/update_resistor/{resistor_id}/
     * @secure
     */
    calculationsUpdateResistorUpdate: (
      calculationId: string,
      resistorId: string,
      data: ResistorCalculation,
      params: RequestParams = {},
    ) =>
      this.request<ResistorCalculation, any>({
        path: `/calculations/${calculationId}/update_resistor/${resistorId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags calculations
     * @name CalculationsUpdateStatusAdminUpdate
     * @request PUT:/calculations/{calculation_id}/update_status_admin/
     * @secure
     */
    calculationsUpdateStatusAdminUpdate: (calculationId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/calculations/${calculationId}/update_status_admin/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags calculations
     * @name CalculationsUpdateStatusUserUpdate
     * @request PUT:/calculations/{calculation_id}/update_status_user/
     * @secure
     */
    calculationsUpdateStatusUserUpdate: (calculationId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/calculations/${calculationId}/update_status_user/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  resistors = {
    /**
     * No description
     *
     * @tags resistors
     * @name ResistorsList
     * @request GET:/resistors/
     * @secure
     */
    resistorsList: (
      query?: {
        resistor_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/resistors/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags resistors
     * @name ResistorsCreateCreate
     * @request POST:/resistors/create/
     * @secure
     */
    resistorsCreateCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/resistors/create/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags resistors
     * @name ResistorsRead
     * @request GET:/resistors/{resistor_id}/
     * @secure
     */
    resistorsRead: (resistorId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/resistors/${resistorId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags resistors
     * @name ResistorsAddToCalculationCreate
     * @request POST:/resistors/{resistor_id}/add_to_calculation/
     * @secure
     */
    resistorsAddToCalculationCreate: (resistorId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/resistors/${resistorId}/add_to_calculation/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags resistors
     * @name ResistorsDeleteDelete
     * @request DELETE:/resistors/{resistor_id}/delete/
     * @secure
     */
    resistorsDeleteDelete: (resistorId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/resistors/${resistorId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags resistors
     * @name ResistorsImageList
     * @request GET:/resistors/{resistor_id}/image/
     * @secure
     */
    resistorsImageList: (resistorId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/resistors/${resistorId}/image/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags resistors
     * @name ResistorsUpdateUpdate
     * @request PUT:/resistors/{resistor_id}/update/
     * @secure
     */
    resistorsUpdateUpdate: (resistorId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/resistors/${resistorId}/update/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags resistors
     * @name ResistorsUpdateImageCreate
     * @request POST:/resistors/{resistor_id}/update_image/
     * @secure
     */
    resistorsUpdateImageCreate: (resistorId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/resistors/${resistorId}/update_image/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (data: UserLogin, params: RequestParams = {}) =>
      this.request<UserLogin, any>({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: UserRegister, params: RequestParams = {}) =>
      this.request<UserRegister, any>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/{user_id}/update/
     * @secure
     */
    usersUpdateUpdate: (userId: string, data: UserProfile, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/users/${userId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
