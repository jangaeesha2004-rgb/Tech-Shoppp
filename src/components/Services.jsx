import servicesData from "../data/servicesData.jsx";
import "../styles/Services.css";

// "Our Advantages" section
function Services() {
  return (
    <section className="services">
      <h2 className="section-title">Our Advantages</h2>
      <div className="services-list">
        {servicesData.map((service) => (
          <div className="service-item" key={service.id}>
            <span className="service-icon">{service.icon}</span>
            <div>
              <h4>{service.title}</h4>
              <p>{service.info}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
