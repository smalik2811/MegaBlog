import config from "../config/config";
import { Client } from "appwrite";

const getAppWriteClient = (() => {
    let client;

    return () => {
        if (client) {
            return client;
        } else {
            client = new Client();
            client
                .setEndpoint(config.appwriteUrl)
                .setProject(config.appwriteProjectId);
            return client;
        }
    };
})();

export default getAppWriteClient;
