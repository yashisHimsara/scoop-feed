import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  loading?: boolean;
}

const PaginationControls = ({ 
  currentPage, 
  onPrevious, 
  onNext, 
  hasPrevious, 
  hasNext,
  loading = false 
}: PaginationControlsProps) => {
  return (
    <div className="flex items-center justify-center space-x-4 py-8">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevious}
        disabled={!hasPrevious || loading}
        className="font-poppins bg-card border-card-border hover:bg-primary hover:text-primary-foreground transition-all"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </Button>
      
      <div className="flex items-center space-x-2">
        <div className="px-3 py-1 bg-news-gradient rounded-lg shadow-news">
          <span className="font-poppins font-bold text-primary-foreground">
            {currentPage}
          </span>
        </div>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={!hasNext || loading}
        className="font-poppins bg-card border-card-border hover:bg-primary hover:text-primary-foreground transition-all"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};

export default PaginationControls;