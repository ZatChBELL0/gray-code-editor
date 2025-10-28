import UserButton from "@/modules/auth/components/user-button";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <button title="get" type="button">
        get started
      </button>
      <UserButton />
    </div>
  );
}
