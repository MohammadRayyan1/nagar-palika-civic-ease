import React, { useRef, useState } from "react";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  // Start camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Camera not accessible. Please allow permission in browser.");
    }
  };

  // Capture image
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const imageData = canvasRef.current.toDataURL("image/png");
      setCapturedImage(imageData);
      stopCamera();
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
  };

  return (
    <div className="p-4">
      {!capturedImage ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            style={{ width: "300px", height: "200px", background: "#000" }}
          ></video>
          <canvas
            ref={canvasRef}
            width="300"
            height="200"
            style={{ display: "none" }}
          ></canvas>
          <div className="mt-2 space-x-2">
            {!stream ? (
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Open Camera 1
              </button>
            ) : (
              <>
                <button
                  onClick={captureImage}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Capture
                </button>
                <button
                  onClick={stopCamera}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <div>
          <img
            src={capturedImage}
            alt="Captured"
            style={{ width: "300px", height: "200px" }}
          />
          <div className="mt-2">
            <button
              onClick={() => setCapturedImage(null)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Retake
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
