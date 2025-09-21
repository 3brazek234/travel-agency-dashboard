import { useLoaderData } from "react-router-dom";
import { cn, getFirstWord, parseTripData } from "../../lib/utils";
import Header from "../../component/common/Header";
import type { TripDocument } from "../../lib/tripDetails.Interfaces";
import type { Activity, DayPlan } from "../../types/trip";
import InfoPill from "../../component/pageComponent/trips/InfoPill";
import star from "../../assets/icons/star.svg";
import calendar from "../../assets/icons/calendar.svg";
import location from "../../assets/icons/location-mark.svg";
import {
  ChipDirective,  
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";


function TripDetails() {
  const loaderData = useLoaderData() as TripDocument;
  const tripDetail = parseTripData(loaderData.tripdetail);
  const imageUrls = loaderData?.imgUrl || [];
  const pillItems = [
    { text: tripDetail?.travelStyle, bg: "!bg-pink-50 !text-pink-500" },
    { text: tripDetail?.groupType, bg: "!bg-primary-50 !text-primary-500" },
    { text: tripDetail?.budget, bg: "!bg-success-50 !text-success-700" },
    { text: tripDetail?.interests, bg: "!bg-navy-50 !text-navy-500" },
  ];
  console.log(tripDetail);
  const visitTimeAndWeatherInfo = [
    { title: "Best Time to Visit:", items: tripDetail?.bestTimeToVisit },
    { title: "Weather:", items: tripDetail?.weatherInfo },
  ];

  return (
    <main className="flex flex-col gap-10 pb-20 w-full max-w-7xl mx-auto px-4 lg:px-8">
      <Header
        title="Trip Details"
        description="View and edit AI-generated travel plans"
      />
      <section className="w-full max-w-xl px-4 lg:px-8 mx-start flex flex-col gap-9 mt-2.5">
        <header className="flex flex-col gap-6 overflow-hidden">
          <h1 className="text-3xl md:text-[40px] md:leading-[44px] font-semibold">
            {tripDetail?.name}
          </h1>
          <div className="flex items-center gap-5">
            {" "}
            <InfoPill
              text={`${tripDetail?.duration} days trip`}
              image={calendar}
            />
            <InfoPill
              text={`${tripDetail?.itinerary
                ?.slice(0, 2)
                .map((item) => item.location)
                .join(", ")}`}
              image={location}
            />
          </div>
        </header>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-7 mt-1">
        {imageUrls.map((url: string, index: number) => (
          <img
            src={url}
            alt={`Image ${index + 1}`}
            key={index}
            className={cn(
              "w-full rounded-xl object-cover",
              index === 0
                ? "md:col-span-2 md:row-span-2 h-[330px]"
                : "md:row-span-1 h-[150px]"
            )}
          />
        ))}
      </section>
      <section className="flex gap-3 md:gap-3 items-center flex-wrap">
        <ChipListComponent id="travel-chip">
          <ChipsDirective>
            {pillItems.map((item, index) => (
              <ChipDirective
                key={index}
                text={getFirstWord(item.text)}
                cssClass={`${item.bg} !text-base !font-medium !px-4`}
              />
            ))}
          </ChipsDirective>
        </ChipListComponent>
        <ul className="flex gap-1 items-center">
          {Array(5)
            .fill("null")
            .map((_, index) => (
              <li key={index}>
                <img src={star} alt="star" className="size-[18px]" />
              </li>
            ))}

          <li className="ml-1">
            <ChipListComponent>
              <ChipsDirective>
                <ChipDirective
                  text="4.9/5"
                  cssClass="!bg-yellow-50 !text-yellow-700"
                />
              </ChipsDirective>
            </ChipListComponent>
          </li>
        </ul>
      </section>
      <section className="flex justify-between gap-5">
        <article className="flex flex-col gap-4">
          <h3 className="text-xl md:text-3xl text-dark-100 font-semibold">
            {tripDetail?.duration}-Day {tripDetail?.country}{" "}
            {tripDetail?.travelStyle} Trip
          </h3>
          <p className="text-base md:text-2xl text-gray-100 font-normal">
            {tripDetail?.budget}, {tripDetail?.groupType} and{" "}
            {tripDetail?.interests}
          </p>
        </article>

        <h2 className="text-sm md:text-xl font-normal text-dark-100">
          {tripDetail?.estimatedPrice}
        </h2>
      </section>

      <p className="text-sm md:text-lg font-normal text-dark-400">
        {tripDetail?.description}
      </p>

      <ul className="flex flex-col gap-9">
        {tripDetail?.itinerary?.map((dayPlan: DayPlan, index: number) => (
          <li key={index} className="flex flex-col gap-4">
            <h3 className="text-base md:text-xl font-semibold text-dark-400">
              Day {dayPlan.day}: {dayPlan.location}
            </h3>

            <ul className="flex flex-col sm:gap-3 gap-7">
              {dayPlan.activities.map((activity: Activity, index: number) => (
                <li
                  key={index}
                  className="flex max-sm:flex-col flex-row justify-between sm:gap-7 gap-3 text-sm md:text-lg font-normal text-dark-400 !list-disc"
                >
                  <span className="flex-shring-0 p-18-semibold w-[90px]">
                    {activity.time}
                  </span>
                  <p className="flex-grow">{activity.description}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {visitTimeAndWeatherInfo.map((section) => (
        <section key={section.title} className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <h3 className="text-base md:text-xl text-dark-400 font-semibold">{section.title}</h3>

            <ul className="flex flex-col gap-3">
              {section.items?.map((item) => (
                <li key={item} className="flex justify-between gap-7 text-sm md:text-lg font-normal text-dark-400 !list-disc">
                  <p className="flex-grow">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
   
   
    </main>
  );
}

export default TripDetails;
