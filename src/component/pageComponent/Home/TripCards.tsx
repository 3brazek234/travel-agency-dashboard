import { Link } from "react-router-dom";
import locationMark from "../../../../public/icons/location-mark.svg";
import {
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";
import { cn, getFirstWord } from "../../../lib/utils";
interface TripCardsProps {
  trip: {
    id: number;
    name: string;
    imageUrls: string; // لو صورة واحدة (path/string)
    itinerary: { location: string }[]; // Array من objects فيها location
    tags: string[]; // Array of strings
    travelStyle: string;
    estimatedPrice: string;
  };
}
export default function TripCards({ trip }: TripCardsProps) {
  return (
    <Link
      to={`/trips/${trip.id}`}
      className="shadow-300 bg-white rounded-[20px] flex-col w-full relative"
    >
      <img
        src={trip.imageUrls}
        alt={trip.name}
        className="w-full h-[160px] rounded-t-xl object-cover aspect-video"
      />
      <article className="flex flex-col gap-3 mt-4 pl-[18px] pr-3.5">
        <h2 className="text-sm md:text-lg font-semibold text-dark-100 line-clamp-2">
          {trip.name}
        </h2>
        <figure className="flex items-center gap-2">
          <img src={locationMark} alt="Location marker" />
          <figcaption className="text-xs md:text-sm font-normal text-gray-100">
            {trip.itinerary[0].location}
          </figcaption>
        </figure>
      </article>
      <div className="mt-5 pl-[18px] pr-3.5 pb-5">
        <ChipListComponent id="travel-chip">
  <ChipsDirective>
    {trip?.tags?.map((tag, index) => (
      <ChipDirective
        key={index}
        text={getFirstWord(tag)}
        cssClass={cn(
          index === 1
            ? "bg-pink-50 text-pink-500" // ✅ صح
            : "!bg-success-50 !text-success-700"
        )}
      />
    ))}
  </ChipsDirective>
</ChipListComponent>
      </div>
      <article className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-10 px-3 py-1 flex flex-col items-center rounded-xl">
     
        <span className="text-sm md:text-base font-semibold text-dark-100">
          {trip.estimatedPrice}
        </span>
      </article>
    </Link>
  );
}
