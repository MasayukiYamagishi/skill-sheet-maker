import { FC } from "react";

type CirclePhotoCardProps = {
  src?: string;
  altText?: string;
  size?: number;
};

const CirclePhotoCardProps: FC<CirclePhotoCardProps> = ({
  src,
  altText,
  size = 96,
}) => {
  const avatarImage = src ? (
    <img className="object-cover w-full h-full" src={src} alt={altText} />
  ) : (
    <img
      className="object-cover w-full h-full"
      src="./public/img/avatar_img.png"
      alt={altText}
    />
  );

  // TODO: オンライン状態を表示する機能がdaisyUIにあるので、それを活用できるように修正したい
  // TODO: 将来的に、アプリ側で画像をトリミングする機能を提供したい
  return (
    <div className="avatar">
      <div
        className="aspect-square overflow-hidden rounded-full bg-white"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {avatarImage}
      </div>
    </div>
  );
};

export default CirclePhotoCardProps;
