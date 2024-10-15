type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

export default function PriceFilter({ selectedPrice, onChange }: Props) {
  return (
    <div>
      <h4 className="text-md mb-2 font-semibold ">Max Price</h4>
      <select
        name=""
        className="w-full rounded-md border p-2"
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
        id=""
      >
        <option value="">Select max price</option>
        {[50, 100, 200, 300, 400, 500].map((price) => (
          <option value={price}>{price}</option>
        ))}
      </select>
    </div>
  );
}
