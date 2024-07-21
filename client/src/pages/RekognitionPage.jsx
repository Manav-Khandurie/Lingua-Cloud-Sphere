import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Progress,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import useRecognition from "../hooks/useRekognition";
import { LoadingBouncyComponent } from "../components/LoadingComponent";
import FacialAnalysisResult from "../components/FacialAnalysisResult";

const steps = [
  { title: "Upload Image", description: "Upload an image file" },
  { title: "Choose Operation", description: "Select an analysis operation" },
  { title: "Result", description: "View the analysis result" },
];

const RecognitionPage = () => {
  const { uploading, error, result, loading, recognize } = useRecognition();
  const [imageFile, setImageFile] = useState(null);
  const [operation, setOperation] = useState("");
  const { activeStep, setActiveStep } = useSteps({ initialStep: 0 });

  const handleNextStep = async () => {
    if (activeStep === 0 && imageFile) {
      setActiveStep(1);
    } else if (activeStep === 1 && operation) {
      await recognize(imageFile, operation);
      setActiveStep(2);
    } else if (activeStep === 2) {
      resetForm();
    }
  };

  const handleBackStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const resetForm = () => {
    setImageFile(null);
    setOperation("");
    setActiveStep(0);
  };

  const getButtonText = () => {
    if (loading) {
      return <LoadingBouncyComponent />;
    } else if (activeStep === 2) {
      return "Done";
    }
    return "Next";
  };

  return (
    <Box
      p={8}
      bg="gray.800"
      minH="70vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading
        as="h1"
        size="xl"
        mb={6}
        color="white"
        fontFamily={"'Press Start 2P', cursive"}
      >
        Image Recognition
      </Heading>
      <Box
        p={6}
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        maxWidth="80%"
        w="100%"
        position="relative"
        border="2px solid"
        borderColor="teal.400"
      >
        <Stepper index={activeStep} mb={4}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <Flex direction="column">
          {activeStep === 0 && (
            <Input
              type="file"
              accept="image/*"
              mb={4}
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          )}
          {activeStep === 1 && (
            <Select
              placeholder="Select operation"
              onChange={(e) => setOperation(e.target.value)}
            >
              <option value="facial_analysis">Facial Analysis</option>
              <option value="object_detection">Object Detection</option>
              <option value="celebrity_detection">Celebrity Detection</option>
            </Select>
          )}
          {activeStep === 2 && result && operation === "facial_analysis" && (
            <FacialAnalysisResult image={imageFile} result={result} />
          )}
          {error && (
            <Text mt={4} color="red.500">
              Error: {error}
            </Text>
          )}
          {uploading && activeStep === 1 && (
            <Progress size="xs" isIndeterminate mb={4} />
          )}
          <Flex justifyContent="space-between">
            <Button
              onClick={handleBackStep}
              isDisabled={activeStep === 0 || loading}
              mr={4}
            >
              Back
            </Button>
            <Button
              colorScheme="teal"
              onClick={handleNextStep}
              isDisabled={
                loading ||
                (activeStep === 0 && !imageFile) ||
                (activeStep === 1 && !operation)
              }
              _hover={{ opacity: "0.8" }}
            >
              {getButtonText()}
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default RecognitionPage;
