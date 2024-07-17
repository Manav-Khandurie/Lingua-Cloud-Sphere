// src/pages/HomePage.jsx
import { Box, SimpleGrid, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";
import AnimatedHeading from "../components/AnimatedHeading";
import "@fontsource/press-start-2p";

const services = [
  { title: "Translation" },
  { title: "SST" },
  { title: "TTS" },
  { title: "Rekognition" },
  { title: "Textract" },
  { title: "OCR" },
];

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const HomePage = () => (
  <MotionBox
    p={8}
    bg="gray.800"
    color="white"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <MotionFlex justifyContent="center" mb={8}>
      <AnimatedHeading />
    </MotionFlex>
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
      {services.map((service) => (
        <MotionBox
          key={service.title}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <ServiceCard title={service.title} p={4} textAlign="center" />
        </MotionBox>
      ))}
    </SimpleGrid>
  </MotionBox>
);

export default HomePage;
