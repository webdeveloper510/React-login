import React, { useState } from "react";
import "../css/addmedia.css";

const AddMedia = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    fileUrl: "",
  });

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target.result;
      setPreview({
        type: selectedFile.type,
        src: result,
      });
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! (Integrate with backend)");
    // Backend integration logic (e.g. using fetch or axios)
  };

  return (
    <div className="container">
        <div className="w-10/12 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Upload Media</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter a catchy title..."
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your media..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (Optional)</label>
          <input
            id="price"
            name="price"
            type="text"
            placeholder="e.g., $19.99"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fileUrl">External URL (Optional)</label>
          <input
            id="fileUrl"
            name="fileUrl"
            type="url"
            placeholder="https://example.com/media"
            value={formData.fileUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Upload Media</label>
          <div className="file-upload">
            <label className="file-upload-btn">
              Choose File (Image/Video)
              <input
                type="file"
                accept="image/*, video/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {preview && (
            <div className="file-preview">
              {preview.type.startsWith("image/") ? (
                <img src={preview.src} alt="Preview" />
              ) : (
                <video controls>
                  <source src={preview.src} type={preview.type} />
                  Your browser does not support video.
                </video>
              )}
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Upload Now
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddMedia;
