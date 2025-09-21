import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
} from "@syncfusion/ej2-react-grids";
import Header from "../../component/common/Header";
import { getAllUsers } from "../../appwrite/auth";
import { useLoaderData } from "react-router-dom";
interface BaseUser {
  id: string;
  name: string;
  email: string;
  dateJoined: string;
  imgUrl: string;
}
export const fetchUsers = async () => {
  const data = await getAllUsers();
  return data;
};

function AllUsers() {
  const { users, total } = useLoaderData();
  console.log(users);
  return (
    <main className="w-full min-h-screen flex flex-col gap-10 max-w-7xl mx-auto px-4 lg:px-8">
      <Header
        title="Manage Users"
        description="Filter , Sort and Manage all users"
      />
      <p className="text-sm text-gray-500">Total Users: {total}</p>
      <GridComponent dataSource={users} gridLines="None">
        <ColumnsDirective>
          <ColumnDirective
            headerText="Name"
            field="name"
            width="200"
            textAlign="Left"
            template={(props: BaseUser) => (
              <div className="flex items-center gap-2">
                <img
                  src={props.imgUrl}
                  alt={props.name}
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span>{props.name}</span>
              </div>
            )}
          />
          <ColumnDirective
            headerText="Email"
            field="email"
            width="150"
            textAlign="Left"
          />
          <ColumnDirective
            headerText="Date Joined"
            field="joinedat"
            width="120"
            textAlign="Left"
            
          />
          <ColumnDirective
            headerText="Trips Created"
            field="status"
            width="120"
            textAlign="Left"
          />
        </ColumnsDirective>
      </GridComponent>

    </main>
  );
}

export default AllUsers;
