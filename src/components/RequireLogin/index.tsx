import Image from "next/image";
import Link from "next/link";

export default function RequireLogin() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white p-8">
      <div></div>
      <Image
        src="/study_desk.svg"
        alt="Login required illustration"
        height={360}
        width={360}
        className="mb-10 2xl:hidden"
      />
      <Image
        src="/study_desk.svg"
        alt="Login required illustration"
        height={540}
        width={540}
        className="mb-10 hidden 2xl:flex"
      />
      <h1 className="text-2xl xl:text-4xl font-bold text-gray-800 mb-2">
        Bạn chưa đăng nhập
      </h1>
      <p className="text-gray-600 mb-6 xl:text-xl">
        Hãy đăng nhập để sử dụng tất cả các tính năng.
      </p>
      <Link
        href="/login"
        className="px-6 py-3 bg-[#F66868] text-white rounded-xl shadow-md hover:bg-[#F66868]/70 transition-all duration-300"
      >
        Đăng nhập ngay
      </Link>
    </div>
  );
}
