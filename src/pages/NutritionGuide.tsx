import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { articles, foodItems, foodCategories, Article } from '@/data/nutritionGuide';
import { BookOpen, Apple, ChevronRight, ArrowLeft, Clock, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export function NutritionGuide() {
  const [activeTab, setActiveTab] = useState<'articles' | 'foods'>('articles');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFoods = foodItems.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.benefits.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="bg-card border-b border-border px-5 pt-12 pb-4 sticky top-0 z-10">
          <div className="max-w-lg mx-auto">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
            >
              <ArrowLeft size={18} />
              <span className="text-sm">Back to guides</span>
            </button>
            <h1 className="font-display text-xl font-semibold text-foreground">
              {selectedArticle.title}
            </h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {selectedArticle.readTime} min read
              </span>
              <span className="px-2 py-0.5 rounded-full bg-sage-light text-xs">
                {selectedArticle.category}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-6 max-w-lg mx-auto">
          <div className="prose prose-sm max-w-none">
            {selectedArticle.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={i} className="font-display text-lg font-semibold text-foreground mt-6 mb-3">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={i} className="space-y-2 my-4">
                    {paragraph.split('\n').map((item, j) => (
                      <li key={j} className="text-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{item.replace('- ', '')}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border px-5 pt-12 pb-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">
            Care Guide
          </h1>
          <p className="text-sm text-muted-foreground">
            Nutrition tips and helpful articles
          </p>

          {/* Search */}
          <div className="relative mt-4">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles and foods..."
              className="pl-10"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab('articles')}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                activeTab === 'articles'
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <BookOpen size={16} className="inline mr-2" />
              Articles
            </button>
            <button
              onClick={() => setActiveTab('foods')}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                activeTab === 'foods'
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <Apple size={16} className="inline mr-2" />
              Foods
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 max-w-lg mx-auto">
        {activeTab === 'articles' ? (
          <div className="space-y-3 stagger-children">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                variant="default"
                className="cursor-pointer card-hover"
                onClick={() => setSelectedArticle(article)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-full bg-sage-light text-xs text-foreground">
                          {article.category}
                        </span>
                        {article.trimester && article.trimester !== 'all' && (
                          <span className="px-2 py-0.5 rounded-full bg-blush-light text-xs text-foreground">
                            Trimester {article.trimester}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-1">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {article.summary}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Clock size={12} />
                        {article.readTime} min read
                      </p>
                    </div>
                    <ChevronRight size={20} className="text-muted-foreground mt-6" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {foodCategories.map((category) => {
              const categoryFoods = filteredFoods.filter(f => f.category === category.id);
              if (categoryFoods.length === 0) return null;
              
              return (
                <div key={category.id} className="animate-fade-in">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span>{category.icon}</span>
                    {category.name}
                  </h3>
                  <div className="space-y-2">
                    {categoryFoods.map((food) => (
                      <Card key={food.id} variant="soft">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-foreground">{food.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {food.benefits.join(' • ')}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {food.nutrients.slice(0, 4).map((nutrient) => (
                                  <span 
                                    key={nutrient}
                                    className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                                  >
                                    {nutrient}
                                  </span>
                                ))}
                              </div>
                              {food.notes && (
                                <p className="text-xs text-muted-foreground mt-2 italic">
                                  Note: {food.notes}
                                </p>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {food.servingSize}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
