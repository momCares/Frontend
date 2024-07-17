import Image from "next/image";
import Link from "next/link";
import momCaresLogo from "@/assets/momcares_logo.png";

const AuthLayout = (props) => {
  const { error, title, children, link, linkText, linkName, className } = props;
  return (
    <header className="bg-color-secondary flex flex-wrap w-full md:py-28 py-40 md:px-10 px-5">
      <div className="flex items-center justify-center md:w-1/2 w-full">
        <Image
          src={momCaresLogo}
          alt="Momcares Logo"
          width={500}
          height={300}
          className="rounded-xl p-5"
          priority
        />
      </div>
      <div className="flex flex-col items-center justify-center md:w-1/2 w-full h-max">
        {error && <p className="text-color-red mb-2">{error}</p>}
        <div className=" bg-color-primary w-full md:w-2/3 px-10 py-14 shadow-xl rounded-lg">
          <h1 className="text-[32px] mb-4 text-color-pink font-bold text-center">
            {title}
          </h1>
          {children}
          <p className="text-color-dark text-sm text-center mt-4">
            {linkText}
            <Link href={link} className="text-color-pink font-bold">
              {linkName}
            </Link>
          </p>
        </div>
      </div>
    </header>
  );
};

export default AuthLayout;
