import React, { useState } from "react";
import axios from "axios";
import { Button, LinearProgress, Box, Typography } from "@mui/material";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    setUploading(true);
    try {
      await axios.post(
        "https://sauravproject-gs41.onrender.com/api/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentage);
          },
        }
      );
      alert("File uploaded successfully!");
    } catch (error) {
      alert("File upload failed!");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Box sx={{ width: "50%", margin: "auto", textAlign: "center" }}>
      <Typography variant="h5">File Upload</Typography>
      <input type="file" onChange={handleFileChange} />
      <br />
      <br />
      <Button
        variant="contained"
        onClick={handleFileUpload}
        disabled={uploading}
      >
        Upload File
      </Button>
      <br />
      <br />
      {uploading && (
        <LinearProgress variant="determinate" value={uploadProgress} />
      )}
    </Box>
  );
};

export default FileUpload;
