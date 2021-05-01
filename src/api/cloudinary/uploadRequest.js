const endpoint = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;


export const uploadRequest =  ( file ) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
    return window.fetch(endpoint, {
      method: "post",
      body: formData
    })
    .then(res => res.json())
  };