
import { TrendingUp, Users, Globe, Award } from "lucide-react";

const stats = [
  {
    icon: <TrendingUp className="h-8 w-8 text-transport-700" />,
    value: "15,000+",
    label: "Successful Deliveries"
  },
  {
    icon: <Users className="h-8 w-8 text-transport-700" />,
    value: "300+",
    label: "Happy Clients"
  },
  {
    icon: <Globe className="h-8 w-8 text-transport-700" />,
    value: "20+",
    label: "Countries Covered"
  },
  {
    icon: <Award className="h-8 w-8 text-transport-700" />,
    value: "15+",
    label: "Years of Excellence"
  }
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-transport-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
