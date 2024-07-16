import ServiceCard from "../components/ServiceCard";

const services = [
  { title: "Translation" },
  { title: "SST" },
  { title: "TTS" },
  { title: "Rekognition" },
  { title: "Textract" },
  { title: "OCR" },
];

const HomePage = () => (
  <div className="home-page">
    <div className="hero">
      <h1>LCS.</h1>
    </div>
    <div className="services">
      {services.map((service) => (
        <ServiceCard key={service.title} title={service.title} />
      ))}
    </div>
  </div>
);

export default HomePage;
