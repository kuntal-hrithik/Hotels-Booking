import { useFormContext } from "react-hook-form";

import type { HotelFormData } from "./ManageHotelForm";

function ImagesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Images</h2>
      <div className="flex rounded border p-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full font-normal text-gray-600 "
          {...register("imageFiles", {
            validate: (value) => {
              const totalLength = value.length;
              if (totalLength < 1) {
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
