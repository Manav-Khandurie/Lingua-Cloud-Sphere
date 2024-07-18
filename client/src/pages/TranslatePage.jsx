import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Select,
  IconButton,
  useClipboard,
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
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import useTranslate from "../hooks/useTranslate"; // Import the useTranslate hook
import { useState } from "react";
import { LoadingBouncyComponent } from "../components/LoadingComponent";

const steps = [
  { title: "Your Text", description: "Enter text to translate" },
  { title: "Target Language", description: "Select the target language" },
  { title: "Result", description: "View the translation result" },
];

const TranslatePage = () => {
  const { translation, loading, error, translate } = useTranslate();
  const [textToTranslate, setTextToTranslate] = useState("");
  const [toLanguage, setToLanguage] = useState("");
  const { hasCopied, onCopy } = useClipboard(translation);
  const { activeStep, setActiveStep } = useSteps({ initialStep: 0 });

  const handleNextStep = () => {
    if (activeStep === 0 && textToTranslate) {
      setActiveStep(1);
    } else if (activeStep === 1 && toLanguage) {
      translate(textToTranslate, toLanguage);
      setActiveStep(2);
    }
  };

  const handleBackStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <Box
      p={8}
      bg="gray.800"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading as="h1" size="xl" mb={6} color="white">
        Translate Page
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
              mb={4}
              placeholder="Enter text to translate"
              value={textToTranslate}
              onChange={(e) => setTextToTranslate(e.target.value)}
            />
          )}
          {activeStep === 1 && (
            <Select
              placeholder="Select target language"
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
              mb={4}
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              {/* Add more language options as needed */}
            </Select>
          )}
          {activeStep === 2 && translation && (
            <Box
              p={4}
              bg="gray.100"
              borderRadius="md"
              mb={4}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="md">{translation}</Text>
              <IconButton
                aria-label="Copy translation"
                icon={<CopyIcon />}
                onClick={onCopy}
                colorScheme="teal"
                size="sm"
                ml={4}
              />
            </Box>
          )}
          {error && (
            <Text mt={4} color="red.500">
              Error: {error.message}
            </Text>
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
                (activeStep === 0 && !textToTranslate) ||
                (activeStep === 1 && !toLanguage)
              }
              _hover={{ opacity: "0.8" }}
            >
              {loading ? (
                <LoadingBouncyComponent />
              ) : activeStep === 2 ? (
                "Done"
              ) : (
                "Next"
              )}
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default TranslatePage;
