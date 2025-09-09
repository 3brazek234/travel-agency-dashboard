import Header from "../../component/common/Header"

function Home() {
    const user = {name: "Ahmed Hamdy"}
  return (
    <main className="dashboard wrapper">
      <Header title={`Welcome ${user?.name ?? "Guest"} `}
      description="Track activity, trends and popular destinations is real time."
      />
    </main>
  )
}

export default Home