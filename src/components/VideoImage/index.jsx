import {Skeleton} from "components";
import { STORAGE_URL } from "constants";
import { useToggle } from "hooks";
import React from "react";
import ModalVideo from "react-modal-video";
import "./style.scss";

export default function VideoImage({ image, video, className }) {
  const [open, setOpen] = useToggle();
  let videoId = "";
  let videoArray = video?.split("");

  for (let i = videoArray.length - 1; i >= 0; i--) {
    if (videoArray[i] !== "=") {
      videoId = videoArray[i] + videoId;
    } else break;
  }

  return (
    <div className="video-image">
      {open && (
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={open}
          videoId={videoId}
          onClose={() => setOpen(false)}
        />
      )}

      {image && video  ? (
        <div className="position-relative w-100">
          <img
            src={STORAGE_URL + image}
            className={`w-100 h-100 ${className ? className : ""}`}
            alt=""
          />

          <div className="position-absolute top-0 h-100 w-100 d-flex align-items-center justify-content-center bg-overlay">
            <img
              src="/images/play-circle.svg"
              role="button"
              className="w-25"
              onClick={setOpen}
              alt=""
            />
          </div>
        </div>
      ) : (
        <Skeleton count={1} width="100%" height={120} />
      )}
    </div>
  );
}
