import Header from "../../component/common/Header";
import StateCards from "../../component/pageComponent/Home/StateCards";
import TripCards from "../../component/pageComponent/Home/TripCards";
import img3 from "/public/images/sample4.jpg";
import img1 from "/public/images/sample1.jpg";
import img2 from "/public/images/sample2.jpg";
import img4 from "/public/images/sample3.jpg";
import { useLoaderData } from "react-router-dom";

const allTrips = [
  {
    id: "1",
    name: "Tropical Rewind",
    imageUrls: [img1],
    itinerary: [{ location: "Thailand" }],
    tags: ["Adventure", "Culture", "Nature"],
    travelStyle: "Solo",
    estimatedPrice: "$1,000",
  },
  {
    id: 2,
    name: "French Reverie",
    imageUrls: [img2],
    itinerary: [{ location: "Paris" }],
    tags: ["Relaxation", "Culinary", "Romance"],
    travelStyle: "Family",
    estimatedPrice: "$2,000",
  },
  {
    id: "3",
    name: "Zen Break",
    imageUrls: [img3],
    itinerary: [{ location: "Japan" }],
    tags: ["Shopping", "Luxury"],
    travelStyle: "Couple",
    estimatedPrice: "$3,000",
  },
  {
    id: "4",
    name: "Adventure in Westeros",
    imageUrls: [img4],
    itinerary: [{ location: "Croatia" }],
    tags: ["Historical", "Culture"],
    travelStyle: "Friends",
    estimatedPrice: "$4,000",
  },
];
const dashboardStats = {
  totalUsers: 120,
  usersJoined: { currentMonth: 15, lastMonth: 10 },
  totalTrips: 20,
  tripsCreated: { currentMonth: 5, lastMonth: 8 },
  userRole: { total: 3, currentMonth: 25, lastMonth: 34 },
};
function Home() {
  const user = useLoaderData();
  return (
    <main className="flex flex-col gap-10 w-full pb-20 max-w-7xl mx-auto px-4 lg:px-8">
      <Header
        title={`Welcome ${user?.name ?? "Guest"} `}
        description="Track activity, trends and popular destinations is real time."
      />
      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <StateCards
            headerTitle="Total Users"
            totalUsers={dashboardStats.totalUsers}
            currentMonthCount={dashboardStats.usersJoined.currentMonth}
            lastMonthCount={dashboardStats.usersJoined.lastMonth}
          />
          <StateCards
            headerTitle="Total trips"
            totalUsers={dashboardStats.totalTrips}
            currentMonthCount={dashboardStats.tripsCreated.currentMonth}
            lastMonthCount={dashboardStats.tripsCreated.lastMonth}
          />
          <StateCards
            headerTitle="Active Users"
            totalUsers={dashboardStats.userRole.total}
            currentMonthCount={dashboardStats.userRole.currentMonth}
            lastMonthCount={dashboardStats.userRole.lastMonth}
          />
        </div>
      </section>
      <div className="container">
        <h2 className="text-xl font-semibold text-dark-100">Created Trips</h2>
        <div className=" grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-7">
          {allTrips.slice(0, 4).map((trip) => (
            <TripCards key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
