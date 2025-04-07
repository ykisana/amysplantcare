import Link from "next/link";
import Image from "next/image";

interface PlantTileProps {
  image: string;
  name: string;
}

export default function PlantTile({ image, name }: PlantTileProps) {
  return (
    <Link href={`/edit/${name}`} className="m-[10px]">
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        className="border-[4px] border-[#3b522f] rounded-[15px]"
      />
    </Link>
  );
}
