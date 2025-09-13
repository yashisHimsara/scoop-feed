import { Card } from "@/components/ui/card";

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  sourceName: string;
  sourceIcon?: string;
  publishedAt: string;
}

const NewsCard = ({ title, description, imageUrl, sourceName, sourceIcon, publishedAt }: NewsCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="card-gradient border-card-border hover:shadow-card transition-all duration-300 hover:scale-[1.02] animate-slide-up">
      <div className="p-4 space-y-4">
        {imageUrl && (
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className="space-y-3">
          <h3 className="font-poppins font-semibold text-lg text-card-foreground leading-tight line-clamp-2 hover:text-accent transition-colors">
            {title}
          </h3>
          
          <p className="font-poppins text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {description || "No description available"}
          </p>
          
          <div className="flex items-center justify-between pt-2 border-t border-card-border/50">
            <div className="flex items-center space-x-2">
              {sourceIcon && (
                <img 
                  src={sourceIcon} 
                  alt={sourceName}
                  className="w-5 h-5 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <span className="font-poppins font-medium text-sm text-accent">
                {sourceName}
              </span>
            </div>
            
            <time className="font-poppins text-xs text-muted-foreground">
              {formatDate(publishedAt)}
            </time>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;