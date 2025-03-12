import { getAppWriteClient } from "./Client";
import { appBucketId } from "../config/config";
import { ID } from "appwrite";

export class StorageService {
  client;
  storage;

  constructor() {
    this.client = getAppWriteClient();
    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(appBucketId, ID.unique(), file);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(appBucketId, fileId);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    try {
      return await this.storage.getFilePreview(appBucketId, fileId);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const storageService = new StorageService();
export default storageService;
