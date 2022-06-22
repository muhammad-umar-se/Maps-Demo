import { Loader, LoaderOptions } from "@googlemaps/js-api-loader";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";

export enum Status {
  LOADING = "LOADING",
  FAILURE = "FAILURE",
  SUCCESS = "SUCCESS",
}

export interface WrapperProps extends LoaderOptions {
  children?: ReactNode;

  render?: (status: Status) => ReactElement;

  callback?: (status: Status, loader: Loader) => void;
}

export const Wrapper = ({
  children,
  render,
  callback,
  ...options
}: WrapperProps): ReactElement => {
  const [status, setStatus] = useState(Status.LOADING);

  useEffect(() => {
    const loader = new Loader(options);

    const setStatusAndExecuteCallback = (status: Status) => {
      if (callback) callback(status, loader);
      setStatus(status);
    };

    setStatusAndExecuteCallback(Status.LOADING);

    loader.load().then(
      () => setStatusAndExecuteCallback(Status.SUCCESS),
      () => setStatusAndExecuteCallback(Status.FAILURE)
    );
  }, []);

  if (status === Status.SUCCESS && children) {
    console.log("here", children);
    return <div id="map-canvas">{children} </div>;
  }

  if (render) return render(status);

  return <></>;
};
