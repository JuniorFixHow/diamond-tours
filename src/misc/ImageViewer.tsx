import { ComponentProps } from "react";

type ImageViewerProps = {
    image:string;
    title?:string;
    desc?:string;
} & ComponentProps<'div'>
const ImageViewer = ({image, title, desc, className, ...props}:ImageViewerProps) => {
  return (
    <div {...props}  className={`p-4 w-fit shadow-md hover:shadow-lg bg-white cursor-default flex flex-col items-center gap-2 ${className}`}  >
        <img src={image} alt={title??''} className="w-[18rem] h-[12rem] object-cover " />
        <span className="text-[#CB4900] font-bold" >{`${title} ${desc ? `(${desc})`:''}`}</span>
    </div>
  )
}

export default ImageViewer