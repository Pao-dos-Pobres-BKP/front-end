import { cva, type VariantProps } from "class-variance-authority";

const avatarVariants = cva("", {
  variants: {
    size: {
      small: "h-6 w-6 rounded-[100%]",
      medium: "h-10 w-10 rounded-[100%]",
      large: "h-[100px] w-[100px] rounded-[100%]",
    },
  },
});

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  imgUrl: string;
}

export function Avatar({ imgUrl, size = "medium" }: AvatarProps) {
  return <img src={imgUrl} className={avatarVariants({ size })} />;
}
