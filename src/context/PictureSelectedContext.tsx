import { createContext } from "react";
export interface Image {
  id: string;
  alt_description: string;
  color?: string;
  orientation?: string;
  urls: {
    regular: string;
  };
}

export interface ImageSelectedContextType {
  image: Image | null;
  setImage: (image: Image | null) => void;
}

const ErrorContext = createContext<ImageSelectedContextType>({
  image: null,
  setImage: () => {},
});

export default ErrorContext;
