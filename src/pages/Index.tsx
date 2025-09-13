import { useState, useEffect } from "react";
import { useNewsApi } from "@/hooks/useNewsApi";
import NewsCard from "@/components/NewsCard";
import LoadingScreen from "@/components/LoadingScreen";
import PaginationControls from "@/components/PaginationControls";
import { Newspaper, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showLoading, setShowLoading] = useState(true);
  const { toast } = useToast();
  
  // You can add your API key here - for demo purposes, we're using mock data
  const apiKey = undefined; // Replace with your newsdata.io API key
  const language = 'en';
  
  const { 
    data, 
    loading, 
    error, 
    currentPage, 
    hasNextPage, 
    hasPreviousPage, 
    goToNextPage, 
    goToPreviousPage,
    refetch 
  } = useNewsApi({ apiKey, language });

  const currentDate = new Date().toDateString();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshing news...",
      description: "Getting the latest stories for you",
    });
  };

  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with gradient */}
      <header className="bg-news-gradient shadow-news sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Newspaper className="w-8 h-8 text-primary-foreground" />
              <div>
                <h1 className="font-poppins font-bold text-2xl text-primary-foreground">
                  Today Hot News
                </h1>
                <p className="font-poppins text-primary-foreground/80 text-sm">
                  {currentDate}
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
              className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {loading && !data ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="loading-spinner w-12 h-12 mb-4"></div>
            <p className="font-poppins text-muted-foreground">Loading news articles...</p>
          </div>
        ) : data && data.results.length > 0 ? (
          <>
            {/* News grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {data.results.map((article, index) => (
                <div key={article.article_id} style={{ animationDelay: `${index * 100}ms` }}>
                  <NewsCard
                    title={article.title}
                    description={article.description}
                    imageUrl={article.image_url}
                    sourceName={article.source_name}
                    sourceIcon={article.source_icon}
                    publishedAt={article.pubDate}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <PaginationControls
              currentPage={currentPage}
              onNext={goToNextPage}
              onPrevious={goToPreviousPage}
              hasNext={hasNextPage}
              hasPrevious={hasPreviousPage}
              loading={loading}
            />
          </>
        ) : (
          <div className="text-center py-20">
            <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-poppins text-xl font-semibold text-foreground mb-2">
              No news articles found
            </h2>
            <p className="font-poppins text-muted-foreground mb-4">
              {!apiKey ? "Demo mode active - Add your API key for live news" : "Try refreshing or check your connection"}
            </p>
            <Button onClick={handleRefresh} variant="outline">
              Try Again
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
