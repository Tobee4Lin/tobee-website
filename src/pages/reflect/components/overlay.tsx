import React from "react";

interface IProps {
  ready: any;
  clicked: any;
  setClicked: any;
}
export default function Overlay(props: IProps) {
  const { ready, clicked, setClicked } = props;
  return (
    <>
      <div
        className={`fullscreen bg ${ready ? "ready" : "notready"} ${
          clicked && "clicked"
        }`}
      >
        <div onClick={() => ready && setClicked(true)}>
          {!ready ? "loading" : "click to continue"}
        </div>
      </div>
    </>
  );
}
