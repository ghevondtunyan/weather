import React, { useState, useEffect } from "react";

export default function useDeny(value, delay) {
  const [denyValue, setDenyValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDenyValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);
  return denyValue;
}
