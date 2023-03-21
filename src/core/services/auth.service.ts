import { AxiosResponse } from "axios";

import { APIRoutes } from "../http";
import { App } from "../models";

import RequestsService from "./requests.service";

export default class AuthService {
  static async loginGoogle(
    model: App.GoogleLogin
  ): Promise<AxiosResponse<any>> {
    const newModel = JSON.stringify(model);
    return RequestsService.postMethod<any>(APIRoutes.AUTH_GOOGLE, newModel, {
      headers: {
        "Content-Type": "application/json;",
      },
    });
  }
}
