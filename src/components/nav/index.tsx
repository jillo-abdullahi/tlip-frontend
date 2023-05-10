import Image from "next/image";
import Link from "next/link";

export const Nav: React.FC = () => {
  const mobileAndTabletStyles = "w-full flex-row h-fit rounded-none top-0";
  const desktopStyles = "md:left-0 md:w-fit md:flex-col md:h-full md:min-h-screen md:rounded-r-2.5xl";
  return (
    <nav
      className={`fixed bg-blue-700 flex items-center justify-between ${mobileAndTabletStyles} ${desktopStyles}`}
    >
      <Link href="/">
        <Image src="/images/icon-logo.svg" alt="logo" width={80} height={80} className="cursor-pointer" />
      </Link>
      <div className="flex items-center p-4">
        <Image className="rounded-full" src="/images/icon-sample-avatar.jpeg" alt="avatar" width={40} height={40} />
      </div>
    </nav>
  );
};
