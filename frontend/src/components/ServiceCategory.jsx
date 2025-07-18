import { Link } from 'react-router-dom';
import { FaBroom, FaWrench, FaPaintRoller, FaTruck, FaShower, FaBolt } from 'react-icons/fa';  // Example icons from react-icons

const services = [
  { icon: <FaBroom size={40} />, label: 'Cleaning', href: '/cleaning' },
  { icon: <FaWrench size={40} />, label: 'Repair', href: '/repair' },
  { icon: <FaPaintRoller size={40} />, label: 'Painting', href: '/painting' },
  { icon: <FaTruck size={40} />, label: 'Shifting', href: '/shifting' },
  { icon: <FaShower size={40} />, label: 'Plumbing', href: '/plumbing' },
  { icon: <FaBolt size={40} />, label: 'Electric', href: '/electric' },
];

const ServiceCards = () => {
  return (
    <section className="py-12 bg-purple-100">
      <div className="container mx-auto px-4 md:px-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {services.map((service, index) => (
          <Link
            to={`/category${service.href}`} // Adjust the link to category with href
            key={index}
            className="bg-white p-6 text-center rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center"
          >
            <div className="text-purple-600 mb-3">
              {service.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-700">{service.label}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ServiceCards;
