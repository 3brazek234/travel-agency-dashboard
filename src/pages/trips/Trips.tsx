import { Link, useLoaderData } from "react-router";

import Header from "../../component/common/Header";
import TripCards from "../../component/pageComponent/Home/TripCards";

const Trips = () => {
  const { trips } = useLoaderData();
  console.log(trips);

  return (
    <main className="flex flex-col gap-10 w-full pb-20 max-w-7xl mx-auto px-4 lg:px-8">
      <Header
        title="Trips"
        description="View and manage all your AI-generated travel plans"
        ctaText="Create New Trip"
        ctaUrl="/dashboard/trips/new"
      />
      <section>
        {trips && trips.length > 0 ? (
          <div className="trip-grid mb-4">
            {trips.map((trip) => (
              <TripCards key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No trips found. Why not create one?</p>
            <Link
              to="/dashboard/trips/new"
              className="text-primary-100 font-semibold mt-2 inline-block"
            >
              Create New Trip
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};
export default Trips;
