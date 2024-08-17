import { fail } from "assert";

export const app = {
    ToastType: {
        success: "SUCCESS",
        error: "ERROR",
        warning: "WARNING",
        custom: "CUSTOM"
    } as const,

    responseMessage:{
        success: "SUCCESS",
        failed: "FAILED",
    },

    product:{
        getAllSuccess: "SUCCESS",
        somethingWrong: "Something went wrong",
    },
    productFamily:{
        getAllSuccess: "SUCCESS",
        somethingWrong: "Something went wrong",
    }

}