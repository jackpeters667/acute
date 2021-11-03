import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link from "next/link";
type Entry = {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  title: string;
  number: string;
  path: string;
};
export default function FeaturedInfo(entry: Entry) {
  return (
    <div className="p-4 md:w-1/3">
      <div className="flex rounded-lg h-full bg-gray-800 bg-opacity-60 p-8 flex-col">
        <div className="flex items-center mb-3">
          <h2 className="text-white text-2xl title-font font-medium">
            {entry.title}
          </h2>
        </div>
        <div className="flex-grow">
          <div className="flex items-center text-white">
            <entry.icon className="mr-1 text-xl" />
            <p className="leading-relaxed text-xl">{entry.number}</p>
          </div>
          <Link href={entry.path}>
            <a className="mt-3 text-blue-400 inline-flex items-center">
              View More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
