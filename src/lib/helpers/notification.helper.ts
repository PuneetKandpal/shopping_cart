import React from "react";
import { toast } from "sonner";
import { app } from "../constants/app.constants";

type ToastProps = stringProp | customProp;

type stringProp = {
  type: "ERROR" | "SUCCESS" | "WARNING";
  message: string;
};

type customProp = {
  type: "CUSTOM";
  element: React.ReactNode;
};

class NotificationHelper {
  private static instance: NotificationHelper | null = null;

  public static getInstance(): NotificationHelper {
    if (!NotificationHelper.instance) {
      NotificationHelper.instance = new NotificationHelper();
    }

    return NotificationHelper.instance;
  }

  Toast(props: ToastProps) {
    if (props.type == app.ToastType.success) {
      toast.success(props.message);
    }

    if (props.type == app.ToastType.error) {
      toast.error(props.message);
    }

    if (props.type == app.ToastType.warning) {
      toast.warning(props.message);
    }

    if (props.type == app.ToastType.custom) {
      toast(props.element);
    }
  }
}

const NotificationHelperInstance = NotificationHelper.getInstance();
export default NotificationHelperInstance;
