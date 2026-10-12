import fs from "fs";


export class JsonUtils {
    public static getJSONValue(key?: string): any {
        const jsonObj = JSON.parse(fs.readFileSync("test-data/data.json", "utf-8"));

        if (typeof key === "undefined") {
            return jsonObj;
        }
        return jsonObj[key];
    }
}

