import React, { useState, useRef, useEffect } from "react";
import { createComplaint } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import MapPicker from "./MapPicker";

function ComplaintForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user; // logged-in citizen

    const [formData, setFormData] = useState({
        u_name: user?.u_name || "",
        u_email: user?.u_email || "",
        u_phone: user?.u_phone || "",
        u_category: "",
        u_photo: "",
        u_description: "",
        u_department: "",
        u_location: "",
    });


    const [photoPreview, setPhotoPreview] = useState(null);
    const [cameraOn, setCameraOn] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [error, setError] = useState("");

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    useEffect(() => {
        if (!cameraOn || !videoRef.current) return;

        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                streamRef.current = stream;
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
                setError("");
            } catch (err) {
                console.error("Camera error:", err);
                setError("Camera not accessible. Please allow permission.");
                setCameraOn(false);
            }
        };

        startCamera();

        return () => {
            // Stop camera when cameraOff or unmount
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };
    }, [cameraOn]);

    const handleOpenCamera = () => {
        setCameraOn(true);
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setCameraOn(false);
    };

    const capturePhoto = () => {
        const context = canvasRef.current.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, 300, 200);
        const imageData = canvasRef.current.toDataURL("image/png");
        setCapturedImage(imageData);
        setPhotoPreview(imageData);
        setFormData({ ...formData, u_photo: imageData });
        stopCamera();
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "u_photo") {
            setFormData({ ...formData, [name]: files[0]?.name });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Reverse geocode helper
    async function reverseGeocode(lat, lng) {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await res.json();
            return data.display_name || "Unknown address";
        } catch {
            return "Unknown address";
        }
    }

    const handleLocationSelect = async (latlng) => {
        const address = await reverseGeocode(latlng.lat, latlng.lng);
        setFormData({
            ...formData,
            u_location: `${latlng.lat}, ${latlng.lng} | ${address}`,
        });
    };

    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    await handleLocationSelect({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    });
                },
                () => alert("Unable to fetch location. Allow access.")
            );
        } else {
            alert("Geolocation not supported.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("User info missing. Please login again.");
            navigate("/login");
            return;
        }
        const payload = {
            ...formData,
            u_status: "Pending",
            u_date: new Date().toISOString(),
            u_name: user.u_name,
            u_email: user.u_email,
            u_phone: user.u_phone
        };
        await createComplaint(payload);
        alert("Complaint Submitted Successfully!");
        // Reset form except user info
        setFormData({
            u_name: user.u_name,
            u_email: user.u_email,
            u_phone: user.u_phone,
            u_category: "",
            u_photo: "",
            u_description: "",
            u_department: "",
            u_location: "",
        });
        navigate("/citizen-dashboard", { state: { user } }); // redirect back to citizen dashboard
    };

    return (
        <form className="complaint-form" onSubmit={handleSubmit}>
            <h3>Register Complaint</h3>

            <label>Name*</label>
            <input name="u_name" value={formData.u_name} readOnly />

            <label>Email*</label>
            <input type="email" name="u_email" value={formData.u_email} readOnly />

            <label>Phone</label>
            <input name="u_phone" value={formData.u_phone} onChange={handleChange} />

            <label>Category of Issue*</label>
            <select name="u_category" value={formData.u_category} required onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="Water">Water</option>
                <option value="Electricity">Electricity</option>
                <option value="Road">Road</option>
                <option value="Sanitation">Sanitation</option>
            </select>

            {/* <label>Upload Photo*</label>
            <input type="file" name="u_photo" required onChange={handleChange} /> */}

            <label>Click Live Photo*</label>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!cameraOn && !capturedImage && (
                <button type="button" onClick={handleOpenCamera}>
                    Open Camera
                </button>
            )}

            {cameraOn && (
                <div>
                    <video ref={videoRef} autoPlay playsInline width="300" height="200" />
                    <br />
                    <button type="button" onClick={capturePhoto}>Capture Photo</button>
                    <button type="button" onClick={stopCamera}>Cancel</button>
                </div>
            )}

            {capturedImage && (
                <div>
                    <h4>Captured Photo:</h4>
                    <img src={capturedImage} alt="Captured" width="300" />
                    <br />
                    <button
                        type="button"
                        onClick={() => {
                            setCapturedImage(null);
                            setFormData({ ...formData, u_photo: null });
                        }}
                    >
                        Retake Photo
                    </button>
                </div>
            )}

            <canvas ref={canvasRef} width="300" height="200" style={{ display: "none" }} />

            <br />

            <label>Description*</label>
            <textarea name="u_description" value={formData.u_description} required onChange={handleChange}></textarea>

            <label>Department*</label>
            <select name="u_department" value={formData.u_department} required onChange={handleChange}>
                <option value="">Select Department</option>
                <option value="Water Department">Water Department</option>
                <option value="Electricity Department">Electricity Department</option>
                <option value="Roads Department">Roads Department</option>
                <option value="Sanitation Department">Sanitation Department</option>
            </select>

            <label>📍 Exact Location</label>
            <button type="button" onClick={handleUseCurrentLocation} style={{ marginBottom: "10px" }}>
                Use My Current Location
            </button>

            <MapPicker onSelect={handleLocationSelect} />
            <p>
                <b>Selected Location:</b> {formData.u_location || "Not Selected"}
            </p>

            <button type="submit">Submit Complaint</button>
            <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/citizen-dashboard", { state: { user } })}
            >
                Cancel
            </button>

        </form>
    );
}

export default ComplaintForm;