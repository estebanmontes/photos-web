import Image from "next/image";

interface PictureProps {
  url: string;
  title: string;
  handlePressImg: () => void;
}

export const Picture = ({ url, title, handlePressImg }: PictureProps) => {
  return (
    <div className="w-full p-3 text-center ">
      <Image
        onClick={handlePressImg}
        alt={title}
        className="rounded-s cursor-pointer hover:scale-110"
        width={330}
        height={240}
        src={url}
      />
    </div>
  );
};
