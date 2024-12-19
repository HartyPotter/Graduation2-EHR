import expressLoader from "./express-loader.js";
import mongooseLoader from "./mongoose-loader.js";

export default async (app) => {
    await mongooseLoader();
    expressLoader(app);
}