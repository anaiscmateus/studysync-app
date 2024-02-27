// BackgroundVideo.jsx
import "./BackgroundVideo.css";

const BackgroundVideo = () => {
  return (
    <div id="background-video" className="background-video-container">
      <video
        src="/assets/videos/notes.mp4"
        alt="background-video"
        loop
        autoPlay
        muted
      ></video>
    </div>
  );
};

export default BackgroundVideo;
