import { Databases, Query } from "appwrite";
import getAppWriteClient from "./Client";
import { appWriteDatabaseId, appWriteCollectionId } from "../config/config";

export class DatabasesService {
  client;
  databases;

  constructor() {
    this.client = getAppWriteClient();
    this.databases = new Databases(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        appWriteDatabaseId,
        appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        appWriteDatabaseId,
        appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        appWriteDatabaseId,
        appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        appWriteDatabaseId,
        appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        appWriteDatabaseId,
        appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const databaseService = new DatabasesService();
export default databaseService;
