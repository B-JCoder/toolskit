import type { Metadata } from "next";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - ToolFixo Web Tools",
  description:
    "Read articles, tips, and guides about productivity, web tools, calculators, and how to make the most of ToolFixo's free utilities.",
  keywords: [
    "blog",
    "productivity tips",
    "calculator guides",
    "web tools blog",
    "toolfixo blog",
  ],
  openGraph: {
    title: "Blog - ToolFixo Web Tools",
    description:
      "Read articles, tips, and guides about productivity and web tools.",
    type: "website",
  },
};

// Sample blog posts - you can replace this with actual data from a CMS or database
const blogPosts = [
  {
    id: 1,
    title: "10 Productivity Hacks Using Free Web Tools",
    excerpt:
      "Discover how to boost your productivity using simple online calculators and utilities. Learn time-saving techniques that professionals use daily.",
    date: "2024-12-20",
    readTime: "5 min read",
    category: "Productivity",
  },
  {
    id: 2,
    title: "Understanding Your BMI: A Complete Guide",
    excerpt:
      "Learn what BMI means, how it's calculated, and what your results indicate about your health. Includes tips for maintaining a healthy weight.",
    date: "2024-12-18",
    readTime: "8 min read",
    category: "Health",
  },
  {
    id: 3,
    title: "How to Calculate Your GPA Like a Pro",
    excerpt:
      "Master GPA calculations with our comprehensive guide. Understand weighted vs unweighted GPA, grade scales, and how to improve your academic standing.",
    date: "2024-12-15",
    readTime: "6 min read",
    category: "Education",
  },
  {
    id: 4,
    title: "The Pomodoro Technique: Science-Backed Focus Method",
    excerpt:
      "Explore the research behind the Pomodoro Technique and learn how 25-minute work intervals can dramatically improve your concentration and output.",
    date: "2024-12-12",
    readTime: "7 min read",
    category: "Productivity",
  },
  {
    id: 5,
    title: "Creating Strong Passwords: Best Practices for 2024",
    excerpt:
      "Learn the latest password security recommendations, including length requirements, character diversity, and why password managers are essential.",
    date: "2024-12-10",
    readTime: "5 min read",
    category: "Security",
  },
  {
    id: 6,
    title: "Garden Planning 101: Maximize Your Growing Space",
    excerpt:
      "Calculate plant spacing, understand square foot gardening, and learn how to plan a productive vegetable garden in any size space.",
    date: "2024-12-08",
    readTime: "10 min read",
    category: "Gardening",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />

        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            ToolFixo Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tips, guides, and insights to help you make the most of our web
            tools and boost your productivity.
          </p>
        </div>

        {/* Featured Post */}
        <Card className="mb-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-primary mb-2">
              <span className="font-semibold">Featured</span>
            </div>
            <CardTitle className="text-3xl mb-3">
              {blogPosts[0].title}
            </CardTitle>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(blogPosts[0].date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {blogPosts[0].readTime}
              </span>
              <span className="px-3 py-1 bg-primary/20 rounded-full text-primary font-medium">
                {blogPosts[0].category}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-lg mb-6">
              {blogPosts[0].excerpt}
            </p>
            <Button className="group">
              Read Article
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <Card
              key={post.id}
              className="hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <CardHeader>
                <div className="flex items-center gap-2 text-xs mb-2">
                  <span className="px-2 py-1 bg-muted rounded-full text-muted-foreground font-medium">
                    {post.category}
                  </span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  {post.excerpt}
                </p>
                <Button variant="ghost" size="sm" className="group/btn p-0">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <Card className="mt-12 bg-muted/50">
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-semibold mb-2">
              More Articles Coming Soon!
            </h3>
            <p className="text-muted-foreground">
              We're constantly creating new content to help you get the most out
              of our tools. Check back regularly for updates.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
