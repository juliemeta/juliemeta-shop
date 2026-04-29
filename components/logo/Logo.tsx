import Image from "next/image";

type LogoProps = {
  width?: number;
  className?: string;
  priority?: boolean;
};

export default function Logo({
  width = 200,
  className,
  priority = false,
}: LogoProps) {
  const ratio = 800 / 432;
  const height = Math.round(width / ratio);

  return (
    <Image
      src="/assets/images/eudaimeta-logo.png"
      alt="Eudaimeta logo"
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={{ height: "auto" }}
    />
  );
}
