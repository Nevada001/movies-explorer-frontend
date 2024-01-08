import { useCallback, useEffect, useState } from "react";
import { TOTAL_CARDS_NUMBER_DESK, TOTAL_CARDS_NUMBER_MEDIUM, TOTAL_CARDS_NUMBER_MOBILE, ZERO } from "../../constants/const-amount";
import { SCREEN_L, SCREEN_M, SCREEN_XS } from "../../constants/const-breakpoints";


export const useResize = () => {
  const [amountOfMovies, setAmountOfMovies] = useState({
    totalAmount: ZERO
  });

  const handleResize = useCallback(() => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= SCREEN_L) {
      setAmountOfMovies((prev) => ({
        ...prev,
        totalAmount: TOTAL_CARDS_NUMBER_DESK
      }))
    }
    else if (screenWidth >= SCREEN_M) {
      setAmountOfMovies((prev) => ({
        ...prev,
        totalAmount: TOTAL_CARDS_NUMBER_MEDIUM
      }))
    }
    else if (screenWidth >= SCREEN_XS && screenWidth < SCREEN_M)  {
      setAmountOfMovies((prev) => ({
        ...prev,
        totalAmount: TOTAL_CARDS_NUMBER_MOBILE
      }))
    }
  },[])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
  return {amountOfMovies, setAmountOfMovies}
};