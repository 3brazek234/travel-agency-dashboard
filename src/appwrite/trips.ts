import { appwriteConfig, database } from "./client";

//  fetching all trips or fetching single trip by id

// fetching all trips
export const getAllTrips = async () => {
  const allTrips = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.tripsCollectionId,
  );

  if (!allTrips.documents) {
    console.error("No trips found");
    return { allTrips: []};
  }

  return {
    allTrips: allTrips.documents,
  };
};
// fetching specific trip

export const getSingleTrip = async (id: string) => {
  const singleTrip = await database.getDocument(
    appwriteConfig.databaseId,
    appwriteConfig.tripsCollectionId,
    id
  );
  if (!singleTrip.$id) {
    console.error("no trip found");
    return null;
  }
  return singleTrip;
};
