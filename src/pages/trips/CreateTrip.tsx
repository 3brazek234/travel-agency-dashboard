import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import Header from "../../component/common/Header";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Query } from "@syncfusion/ej2-data";
import { comboBoxItems, selectItems } from "../../constants";
import { cn, formatKey } from "../../lib/utils";
import {
  LayerDirective,
  LayersDirective,
  MapsComponent,
} from "@syncfusion/ej2-react-maps";
import { useState } from "react";
import { world_map } from "../../constants/world_map";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import magicIcon from "../../assets/icons/magic-star.svg";
import loaderIcon from "../../assets/icons/loader.svg";
import { account, database } from "../../appwrite/client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ID } from "appwrite";
import type { Country, TripFormData } from "../..";
interface UnsplashImage {
  urls: {
    regular: string;
    [key: string]: any;
  };
  [key: string]: any;
}

function CreateTrip() {
  const data = useLoaderData() as Country[];
  const countryData = data.map((country) => ({
    name: country.name,
    value: country.name,
  }));
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TripFormData>({
    country: countryData[0].name.common || "",
    travelStyle: "",
    interest: "",
    budget: "",
    duration: 0,
    groupType: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    if (Object.values(formData).some((value) => value === "" || value === 0)) {
      setErr("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const user = await account.get();
      if (!user) {
        setErr("You must be logged in");
        setLoading(false);
        return;
      }
      const databaseAppwrite = import.meta.env.VITE_APPWRITE_DATABASE_ID;
      const tripsCollection = import.meta.env.VITE_APPWRITE_TRIPS_COLLECTION_ID;

      const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
      });
      const prompt = `Generate a ${formData.duration}-day travel itinerary for ${formData.country} based on the following user information:
    Budget: '${formData.budget}'
    Interests: '${formData.interest}'
    TravelStyle: '${formData.travelStyle}'
    GroupType: '${formData.groupType}'
    Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
    {
    "name": "A descriptive title for the trip",
    "description": "A brief description of the trip and its highlights not exceeding 100 words",
    "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
    "duration": ${formData.duration},
    "budget": "${formData.budget}",
    "travelStyle": "${formData.travelStyle}",
    "country": "${formData.country}",
    "interests": ${formData.interest},
    "groupType": "${formData.groupType}",
    "bestTimeToVisit": [
      '🌸 Season (from month to month): reason to visit',
      '☀️ Season (from month to month): reason to visit',
      '🍁 Season (from month to month): reason to visit',
      '❄️ Season (from month to month): reason to visit'
    ],
    "weatherInfo": [
      '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
      '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
      '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
      '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
    ],
    "location": {
      "city": "name of the city or region",
      "coordinates": [latitude, longitude],
      "openStreetMap": "link to open street map"
    },
    "itinerary": [
    {
      "day": 1,
      "location": "City/Region Name",
      "activities": [
        {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
        {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
        {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
      ]
    },
    ...
    ]
    }`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const tripText = response.text();

      const cleanedJsonString = tripText.substring(
        tripText.indexOf("{"),
        tripText.lastIndexOf("}") + 1
      );


      
      const unsplashApiKey = import.meta.env.VITE_UNSPLAH_ACCESS_KEY;

      const imageResponse = await fetch(
        `https://api.unsplash.com/search/photos?query=${formData.country}&client_id=${unsplashApiKey}&per_page=3`
      );
      const imageData = (await imageResponse.json()) as {
        results: UnsplashImage[];
      };
      const imageUrls = imageData.results.map(
        (imgResult: UnsplashImage) => imgResult.urls?.regular || null
      );
      const savedItinerary = await database.createDocument(
        databaseAppwrite,
        tripsCollection,
        ID.unique(),
        {
          tripdetail: cleanedJsonString,
          createdAt: new Date().toISOString(),
          imgUrl: imageUrls,
          userId: user.$id,
          payment_link: "sasasasas",
        }
      );

      // --- 4. إعادة التوجيه عند النجاح ---
      console.log("Success! Navigating to trip:", savedItinerary.$id);
      navigate(`/dashboard/trips/${savedItinerary.$id}`);
    } catch (error) {
      setErr("Something went wrong. Please check the console.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (
    key: keyof TripFormData,
    value: string | number
  ) => {
    console.log(value);
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const mapData = [
    {
      country: formData.country,
      color: "#EA382E",
      coordinates:
        data.find((c: Country) => c.name.common === formData.country)?.latlng ||
        [],
    },
  ];
  const onFiltering = (args: any) => {
    console.log(args);
    let query = new Query();
    query =
      args.text !== ""
        ? query.where("name", "contains", args.text, true)
        : query;

    args.updateData(countryData, query);
  };
  const iconProps = loading
    ? { src: loaderIcon, alt: "Loading spinner" }
    : { src: magicIcon, alt: "Magic wand icon" };

  return (
    <main className="flex flex-col gap-10 pb-20 w-full max-w-7xl mx-auto px-4 lg:px-8">
      <Header
        title="Add a New Trip"
        description="View and edit AI-generated travel plans"
      />
      <section className="mt-2.5 w-full max-w-3xl px-4 lg:px-8 mx-auto">
        <form
          className="flex flex-col gap-6 py-6 bg-white border border-light-200 rounded-xl shadow-100"
          onClick={handleSubmit}
        >
          <div className="w-full flex flex-col gap-2.5 px-6 relative">
            <label
              htmlFor="country"
              className="text-sm font-normal text-gray-100"
            >
              Country
            </label>
            <ComboBoxComponent
              id="country"
              name="country"
              dataSource={countryData}
              fields={{ text: "name", value: "value" }}
              placeholder="Select a country"
              className="!p-3.5 !border w-full !border-light-400 !rounded-xl !text-base !text-dark-300 !font-normal"
              change={(e: { value: string | undefined }) => {
                if (e.value) {
                  handleChange("country", e.value);
                }
              }}
              allowFiltering
              filtering={onFiltering}
            />
          </div>
          <div className="w-full flex flex-col gap-2.5 px-6 relative">
            <label
              htmlFor="duration"
              className="text-sm font-normal text-gray-100"
            >
              Duration
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              placeholder="Enter number of days"
              className="p-3.5 border border-light-400 rounded-xl text-base text-dark-300 font-normal placeholder:text-gray-100"
              onChange={(e) => {
                handleChange("duration", Number(e.target.value));
              }}
            />
          </div>
          {selectItems.map((item) => (
            <div
              key={item}
              className="w-full flex flex-col gap-2.5 px-6 relative"
            >
              <label
                htmlFor={item}
                className="text-sm font-normal text-gray-100"
              >
                {formatKey(item)}
              </label>
              <ComboBoxComponent
                id={item}
                name={item}
                dataSource={comboBoxItems[item].map((item) => ({
                  text: item,
                  value: item,
                }))}
                fields={{ text: "text", value: "value" }}
                placeholder={`Select ${formatKey(item)}`}
                change={(e: { value: string | undefined }) => {
                  if (e.value) {
                    handleChange(item, e.value);
                  }
                }}
              />
            </div>
          ))}
          <div className="w-full flex flex-col gap-2.5 px-6 relative">
            <label
              htmlFor="location"
              className="text-sm font-normal text-gray-100"
            >
              location on the world map
            </label>
            <MapsComponent>
              <LayersDirective>
                <LayerDirective
                  dataSource={mapData}
                  shapeData={world_map}
                  shapeDataPath="country"
                  shapePropertyPath="name"
                  shapeSettings={{ colorValuePath: "color", fill: "#e5e5e5 " }}
                />
              </LayersDirective>
            </MapsComponent>
          </div>
          <div className="bg-gray-200 h-px w-full"></div>
          {err && (
            <div className="text-red-500 text-base font-medium text-center py-4">
              {err}
            </div>
          )}
          <footer className="px-6 w-full">
            <ButtonComponent
              type="submit"
              disabled={loading}
              className="!h-12 !w-full  !bg-primary-100 !px-4 !rounded-lg !flex !items-center !justify-center !gap-1.5 !shadow-none text-white"
            >
              <img
                {...iconProps}
                className={cn("h-5 w-5", loading ? "animate-spin" : "")}
              />

              <span className="text-sm md:text-base font-semibold text-white">
                {loading ? "Generating..." : "Create Trip"}
              </span>
            </ButtonComponent>
          </footer>
        </form>
      </section>
    </main>
  );
}

export default CreateTrip;
