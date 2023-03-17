import { AxiosResponse } from "axios";

import { APIRoutes } from "../http";
import { App } from "../models";

import RequestsService from "./requests.service";

export default class AppService {
  static async joinWaitingList(userId: number): Promise<AxiosResponse<any>> {
    const formData = new FormData();
    formData.append("userId", String(userId));
    return RequestsService.postMethod<any>(
      `${APIRoutes.JOIN_WAITINGLIST}/${userId}`,
      formData
    );
  }

  static async searchPerform(
    model: App.PerformSearch
  ): Promise<AxiosResponse<any>> {
    const formData = new FormData();
    formData.append("userId", String(model.userId));
    formData.append("query", model.query);
    return RequestsService.postMethod<any>(APIRoutes.SEARCH, formData);
  }

  static async createArticle(model: any): Promise<AxiosResponse<any>> {
    const formData = new FormData();

    for (var property in model) {
      if (model.hasOwnProperty(property))
        formData.append(property, (<any>model)[property]);
    }

    return RequestsService.postMethod<any>(APIRoutes.ARTICLES, formData, {
      params: { _method: "PUT" },
    });
  }
}
