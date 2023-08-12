import { useContext } from "react";
import PictureSelectedContext from "~/context/PictureSelectedContext";

export default function Picture() {
  const { image } = useContext(PictureSelectedContext);
  return (
    <div className="justify-center ">
      <div className="rounded-md absolute bg-current top-12 left-12 p-5 overflow-hidden shadow-lg">
        {image.user.username && (
          <div className="text-black">{`username: ${image.user.username}`}</div>
        )}
        <div className="text-black">{`ALT desc: ${image.alt_description}`}</div>
        <div className="text-black">{`Likes: ${image.likes}`}</div>
      </div>
      <img
        className="w-full h-full"
        src={image?.urls.regular}
        alt={image?.title}
      />
    </div>
  );
}
