import Header from '../../component/common/Header'

function Trips() {
  return (
    <main className="flex flex-col gap-10 w-full pb-20 max-w-7xl mx-auto px-4 lg:px-8">
      <Header
        title="Trips"
        description="View and edit AI-generated travel plans"
        ctaText="Create New Trip"
        ctaUrl="/dashboard/trips/new"  
      />

    </main>
  )
}

export default Trips