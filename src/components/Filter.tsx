interface FilterProps {
  handlePress: (e: string) => void;
  data: any[];
  filter: string;
}

export const Filter = ({ data, handlePress, filter }: FilterProps) => (
  <div className="flex">
    {data.map((item, index) => (
      <button
        key={index}
        onClick={() => handlePress(item)}
        className={`p-2.5 m-2 text-3xl rounded-lg text-black bg-white w-full h-16 ${
          filter === item.value ? "bg-blue-500" : ""
        }`}
      >
        {item.value}
      </button>
    ))}
  </div>
);
