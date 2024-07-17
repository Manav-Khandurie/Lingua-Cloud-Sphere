import { bouncy } from "ldrs";

bouncy.register();

const LoadingBouncyComponent = () => {
  return <l-bouncy size="100" speed="1.5" color="purple" />;
};

export { LoadingBouncyComponent };
