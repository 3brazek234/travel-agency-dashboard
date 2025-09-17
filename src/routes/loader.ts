import type { LoaderFunctionArgs } from "react-router-dom";
import { getAllTrips, getSingleTrip } from "../appwrite/trips";
import type { Country } from "..";
import { getUser } from "../appwrite/auth";
import { parseTripData } from "../lib/utils";

export const loaderTripDetails = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) {
    throw new Error("id is required");
  }
  const trip = await getSingleTrip(id);
  return trip;
};
export const createTripLoader = async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,latlng,maps"
  );
  const data = await response.json();

  return data.map((country: Country) => ({
    name: country.name?.common || "",
    latlng: country.latlng,
    value: country.name?.common || "",
    openStreetMap: country.maps?.openStreetMaps,
  }));
};
export const getAllUser = async () => {
  const user = await getUser();
  return user;
};

export const loaderAllTrips = async () => {
  const { allTrips } = await getAllTrips();

  return {
    trips: allTrips.map(({ $id, tripdetail, imgUrl }) => ({
      id: $id,
      ...parseTripData(tripdetail),
      imageUrls: imgUrl ?? [],
    })),
  };
};
