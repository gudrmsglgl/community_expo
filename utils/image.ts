import * as ImagePicker from "expo-image-picker";

export function getFormDataImages(
  key: string,
  images: ImagePicker.ImagePickerAsset[],
) {
  const formData = new FormData();
  images.forEach(({ uri, mimeType = "image/jpeg" }) => {
    const fileName = uri.split("/").pop() ?? "image.jpg";

    formData.append(key, {
      uri,
      type: mimeType,
      name: fileName,
    } as unknown as File);
  });

  return formData;
}
