import CIcon from "@coreui/icons-react";
import icons from "../utils/icons";

const ServiceCard = ({ title }) => (
  <div className="service-card">
    <CIcon icon={icons[title]} size="xl" />
    <h3>{title}</h3>
  </div>
);

export default ServiceCard;
