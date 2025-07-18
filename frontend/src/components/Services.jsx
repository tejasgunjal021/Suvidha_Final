

const Services = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">What’s Happening in Your Area</h2>
        <p className="mt-4 text-gray-600">Whether you’re in search of a service provider, a service, or simply comparing different providers...</p>
        <div className="mt-8 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4  ">
            <div className="bg-gray-100 p-4 shadow-md rounded ">
              <h3 className="text-2xl font-semibold text-purple-600">237</h3>
              <p className="text-gray-600">Services Available</p>
            </div>
            <div className="bg-gray-100 p-4 shadow-md rounded">
              <h3 className="text-2xl font-semibold text-purple-600">716</h3>
              <p className="text-gray-600">Providers</p>
            </div>
            <div className="bg-gray-100 p-4 shadow-md rounded">
              <h3 className="text-2xl font-semibold text-purple-600">8.3k</h3>
              <p className="text-gray-600">Active Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
