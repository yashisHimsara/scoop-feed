import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="text-center space-y-8 animate-fade-in">
        {/* Logo placeholder - you can replace with actual logo */}
        <div className="w-32 h-32 mx-auto bg-news-gradient rounded-full flex items-center justify-center shadow-news">
          <div className="text-4xl font-bold text-primary-foreground font-poppins">
            NEWS
          </div>
        </div>
        
        {/* Loading spinner */}
        <div className="loading-spinner w-12 h-12 mx-auto"></div>
        
        {/* Loading text */}
        <div className="space-y-2">
          <p className="font-poppins text-lg text-foreground font-medium">
            Loading Latest News...
          </p>
          <div className="w-48 h-2 bg-muted rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-news-gradient transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-poppins text-sm text-muted-foreground">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;