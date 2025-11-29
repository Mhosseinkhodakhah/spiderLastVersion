const convertBlobToFile = async (file: any) => {
  return await fetch(file)
    .then((response) => response.blob())
    .then((blob) => {
      const retrievedFile: File = new File([blob], "my-retrieved-file.png", {
        type: blob.type,
        lastModified: new Date().getTime(),
      });

      return retrievedFile;
    })
    .catch((error) => console.error("Error retrieving file:", error))
    .finally(() => {
      URL.revokeObjectURL(file); // Release the object URL to free memory
    });
};

export default convertBlobToFile;
