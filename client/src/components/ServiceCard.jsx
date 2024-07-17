import CIcon from "@coreui/icons-react";
import icons from "../utils/icons";
import PropTypes from "prop-types";

const ServiceCard = ({ title }) => (
  <div className="service-card">
    <CIcon icon={icons[title]} size="lg" />
    <h3>{title}</h3>
  </div>
);

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ServiceCard;
