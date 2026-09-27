/**
 * Cloudinary Direct Upload Service for Flatzy Kolkata
 * 
 * Enables free, direct client-side photo uploads without needing a backend server.
 * Uses Cloudinary Unsigned Upload Presets (Free tier: 25GB storage + bandwidth / month).
 */

export interface UploadResult {
  url: string;
  isCloudinary: boolean;
  error?: string;
}

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim() || '';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET?.trim() || 'flatzy_uploads';

/**
 * Check if Cloudinary credentials are configured in .env
 */
export const isCloudinaryConfigured = (): boolean => {
  return Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_CLOUD_NAME !== 'your_cloud_name');
};

/**
 * Upload an image file to Cloudinary.
 * If credentials are not configured or upload fails, falls back gracefully to a high-quality base64 Data URL.
 */
export const uploadImageToCloud = async (file: File): Promise<UploadResult> => {
  if (!isCloudinaryConfigured()) {
    // Graceful fallback to Data URL if Cloudinary is not yet configured in .env
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          url: reader.result as string,
          isCloudinary: false
        });
      };
      reader.onerror = () => {
        resolve({
          url: URL.createObjectURL(file),
          isCloudinary: false,
          error: 'Failed to read file locally'
        });
      };
      reader.readAsDataURL(file);
    });
  }

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'flatzy-kolkata');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Upload failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      url: data.secure_url || data.url,
      isCloudinary: true
    };
  } catch (err: any) {
    console.warn('Cloudinary upload failed, falling back to local data URL:', err);
    // Fallback to local Data URL so the user's workflow is never interrupted
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          url: reader.result as string,
          isCloudinary: false,
          error: err?.message || 'Cloudinary upload failed'
        });
      };
      reader.readAsDataURL(file);
    });
  }
};
