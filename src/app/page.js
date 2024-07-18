import Carousel from "@/components/layouts/Carousel";
import Featured from "@/components/layouts/Featured";

export default function HomePage() {
  return (
    <div className="w-full h-full">
      <title>Mom Cares</title>
      <main>
        <div>
          <ul>
            <li>
              <Carousel />
            </li>
          </ul>
        </div>
      </main>
      <Featured />
    </div>
  );
}
