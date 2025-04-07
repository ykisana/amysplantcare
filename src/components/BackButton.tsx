import Link from "next/link";

export default function BackButton() {
  return (
    <Link href="/" className="absolute top-5 left-5">
      <button className="bg-white text-[#3b522f] border border-[#3b522f] px-4 py-2 rounded-md shadow hover:bg-gray-100 transition">
        Back
      </button>
    </Link>
  );
}
