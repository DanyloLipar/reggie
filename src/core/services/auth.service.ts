import { AxiosResponse } from "axios";
import { APIRoutes } from "../http";
import { App } from "../models";

import RequestsService from "./requests.service";

export default class AuthService {
  static async loginGoogle(
    model: App.GoogleLogin
  ): Promise<AxiosResponse<any>> {
    const formData = new FormData();
    formData.append("aud", model.aud);
    formData.append("azp", model.azp);
    formData.append("email", model.email);
    formData.append("email_verified", model.email_verified.toString());
    formData.append("exp", model.exp.toString());
    formData.append("iss", model.iss);
    formData.append("jti", model.jti);
    formData.append("name", model.name);
    formData.append("picture", model.picture);
    formData.append("sub", model.sub);
    return RequestsService.postMethod<any>(APIRoutes.AUTH_GOOGLE, formData);
  }
}
