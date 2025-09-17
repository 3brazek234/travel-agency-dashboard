import { Link } from "react-router-dom";
import locationMark from "../../../../public/icons/location-mark.svg";
import { ChipListComponent, ChipsDirective, ChipDirective } from "@syncfusion/ej2-react-buttons";
import {  getFirstWord } from "../../../lib/utils"

// واجهة الـ props الآن صحيحة
interface TripCardsProps {
  trip: {
    id: string;
    name: string;
    imageUrls: string[]; // <-- يجب أن تكون مصفوفة
    itinerary: { location: string }[];
    tags: string[];
    travelStyle: string;
    interests: string;
    estimatedPrice: string;
  };
}

export default function TripCards({ trip }: TripCardsProps) {
  const tags = [trip.interests, trip.travelStyle].flat().filter(Boolean);

  return (
    <Link
      to={`/dashboard/trips/${trip.id}`}
      className="shadow-lg bg-white rounded-2xl flex flex-col w-full relative group transform hover:-translate-y-2 transition-all duration-300"
    >
      <div className="relative">
        <img
          // --- التصحيح: imageUrls هي مصفوفة، لذا نأخذ أول عنصر ---
          src={trip.imageUrls[0] || 'default-image.png'}
          alt={trip.name}
          className="w-full h-48 rounded-t-2xl object-cover"
        />
        <article className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-xl px-3 py-1 flex flex-col items-center">
          <span className="font-semibold text-dark-100">{trip.estimatedPrice}</span>
        </article>
      </div>

      <article className="flex flex-col gap-3 p-4">
        <h2 className="text-lg font-semibold text-dark-100 line-clamp-2 h-14">
          {trip.name}
        </h2>
        <figure className="flex items-center gap-2">
          <img src={locationMark} alt="Location marker" className="w-4 h-4" />
          <figcaption className="text-sm font-normal text-gray-500">
            {trip.itinerary?.[0]?.location ?? "Multiple Locations"}
          </figcaption>
        </figure>
      </article>

      <div className="mt-auto px-4 pb-4">
        <ChipListComponent id={`chip-${trip.id}`}>
          <ChipsDirective>
            {tags.map((tag, index) => (
              <ChipDirective key={index} text={getFirstWord(tag)} cssClass={index === 0 ? "bg-pink-50 text-pink-500" : "bg-success-50 text-success-700"} />
            ))}
          </ChipsDirective>
        </ChipListComponent>
      </div>
    </Link>
  );
}