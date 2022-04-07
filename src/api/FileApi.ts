import VaporInstance from "laravel-vapor";
import BaseApi from "./BaseApi";

export default class FileApi extends BaseApi {
  upload = async (files: File[]) => {
    const storeFiles = Promise.all(
      files.map(async (file) => {
        const uploaded = await VaporInstance.store(file, {
          baseURL: this.options.baseURL,
          options: {
            headers: this.headers,
          },
        });

        return { ...uploaded, name: file.name };
      })
    );

    return storeFiles;
  };
}
