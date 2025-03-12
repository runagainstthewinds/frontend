import axios from "axios";

const fetchQRCode = async (): Promise<string> => {
  try {
    const response = await axios.get("http://localhost:8080/qr/generate", {
      responseType: "blob",
    });
    return URL.createObjectURL(new Blob([response.data])); // Create a URL for the image
  } catch (error) {
    console.error("Error fetching QR code:", error);
    throw error;
  }
};

export { fetchQRCode };
