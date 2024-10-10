import { Divide } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { HotelFormData } from "./ManageHotelForm";

function ImagesSection() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const existingImages = watch("imageUrls");
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImages.filter((url) => url !== imageUrl)
    );
  };
  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Images</h2>
      <div className="flex rounded border p-4">
        {existingImages && (
          <div className="grid grid-cols-6 gap-4">
            {existingImages.map((url) => (
              <div className="group relative">
                <img src={url} alt="" className="min-h-full object-cover" />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 "
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full font-normal text-gray-600 "
          {...register("imageFiles", {
            validate: (value) => {
              const totalLength = value.length + (existingImages?.length || 0);
              if (totalLength < 0) {
                return "Please upload at least 1 image";
              }
              if (totalLength > 6) {
                return "You can only upload 6 images";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && errors.imageFiles.message && (
        <p className="mt-2 text-red-500">{errors.imageFiles.message}</p>
      )}
    </div>
  );
}

export default ImagesSection;
