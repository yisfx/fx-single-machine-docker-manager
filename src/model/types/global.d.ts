import { GlobalSetting } from "../systemConfig";

declare global {
    namespace NodeJS {
        interface Global {
            globalSetting: GlobalSetting
        }
    }
}