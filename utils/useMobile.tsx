import { useState, useEffect } from 'react';

// Define the return type of the hook
interface UseMobileResult {
  isPhone: boolean;
  isTablet: boolean;
}

const useMobile = (): UseMobileResult => {
  // State to track whether the device is a phone or tablet
  const [isPhone, setIsPhone] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    // Function to check the screen width and update state
    const checkDevice = () => {
      const screenWidth = window.innerWidth;

      // Check if the device is a phone (up to 767px)
      if (screenWidth <= 767) {
        setIsPhone(true);
        setIsTablet(false);
      }
      // Check if the device is a tablet (768px to 1024px)
      else if (screenWidth >= 768 && screenWidth <= 1024) {
        setIsTablet(true);
        setIsPhone(false);
      }
      // Otherwise, it's a desktop or larger device
      else {
        setIsPhone(false);
        setIsTablet(false);
      }
    };

    // Call the function on initial render
    checkDevice();

    // Add event listener to update on window resize
    window.addEventListener('resize', checkDevice);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isPhone, isTablet };
};

export default useMobile;