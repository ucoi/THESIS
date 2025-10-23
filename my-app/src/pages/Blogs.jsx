import React, { useState } from "react";
import styled from "styled-components";
import {
  AccessTimeRounded,
  PersonRounded,
  SearchRounded,
  TrendingUpRounded,
  BookmarkBorderRounded,
} from "@mui/icons-material";
import BlogModal from "../components/BlogModal";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Title = styled.div`
  padding: 0px 16px;
  font-size: 28px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 700;
`;

const Desc = styled.div`
  padding: 0px 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 400;
`;

const SearchBar = styled.div`
  max-width: 600px;
  display: flex;
  border: 2px solid ${({ theme }) => theme.text_secondary + 30};
  border-radius: 12px;
  padding: 14px 16px;
  margin: 0px 16px;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  font-weight: 500;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 12px;
  padding: 0px 16px;
  flex-wrap: wrap;
`;

const FilterChip = styled.div`
  padding: 10px 18px;
  border-radius: 24px;
  border: 2px solid
    ${({ theme, active }) =>
      active ? theme.primary : theme.text_secondary + 30};
  background: ${({ theme, active }) =>
    active ? theme.primary : "transparent"};
  color: ${({ theme, active }) =>
    active ? theme.white : theme.text_secondary};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme, active }) =>
      active ? theme.primary : theme.primary + 10};
    color: ${({ theme, active }) => (active ? theme.white : theme.primary)};
    transform: translateY(-2px);
  }
`;

const BlogsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  padding: 0px 16px;
  margin-bottom: 100px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const BlogCard = styled.div`
  border: 1px solid ${({ theme }) => theme.text_primary + 15};
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.card};
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow_lg};
    transform: translateY(-6px);

    .blog-image {
      transform: scale(1.05);
    }
  }
`;

const BlogImage = styled.div`
  width: 100%;
  height: 220px;
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
  }
`;

const TrendingBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ theme }) => theme.red};
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 1;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
`;

const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
`;

const BlogTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogExcerpt = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.text_secondary + 20};
  margin-top: auto;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 600;
`;

const ReadTime = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
`;

const BookmarkButton = styled.button`
  background: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: scale(1.1);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.text_secondary};

  h3 {
    font-size: 24px;
    margin-bottom: 12px;
    color: ${({ theme }) => theme.text_primary};
  }

  p {
    font-size: 16px;
  }
`;

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const filters = [
    "All",
    "Nutrition",
    "Training",
    "Recovery",
    "Motivation",
    "Beginner",
  ];

  const blogs = [
    {
      id: 1,
      title: "10 Essential Foods for Muscle Growth",
      excerpt:
        "Discover the top foods that will help you build lean muscle mass and recover faster from intense workouts.",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600",
      author: "Dr. Sarah Johnson",
      authorBio:
        "Certified nutritionist with 10+ years of experience in sports nutrition",
      readTime: "5 min read",
      date: "Oct 20, 2024",
      tags: ["Nutrition", "Muscle Building"],
      likes: 234,
      trending: true,
      fullContent: `
        <h2>Introduction</h2>
        <p>Building muscle isn't just about lifting weights—nutrition plays a crucial role in your gains. Here are the top 10 foods every bodybuilder should include in their diet.</p>
        
        <h2>1. Chicken Breast</h2>
        <p>Lean protein powerhouse with approximately 31g of protein per 100g. It's low in fat and perfect for muscle recovery.</p>
        
        <h2>2. Eggs</h2>
        <p>Complete protein source with all essential amino acids. The yolk contains healthy fats and vitamins that support hormone production.</p>
        
        <h2>3. Greek Yogurt</h2>
        <p>High in protein and probiotics. Choose full-fat versions for better nutrient absorption and sustained energy.</p>
        
        <blockquote>"Nutrition is 70% of bodybuilding. You can train hard, but if you're not eating right, you won't see results." - Arnold Schwarzenegger</blockquote>
        
        <h2>4. Salmon</h2>
        <p>Rich in omega-3 fatty acids that reduce inflammation and support muscle recovery. Aim for wild-caught when possible.</p>
        
        <h2>5. Sweet Potatoes</h2>
        <p>Complex carbohydrates that provide sustained energy for your workouts. High in fiber and vitamins.</p>
        
        <h2>Key Takeaways</h2>
        <ul>
          <li>Prioritize whole, unprocessed foods</li>
          <li>Get protein from multiple sources</li>
          <li>Don't fear healthy fats</li>
          <li>Time your carbs around workouts</li>
          <li>Stay hydrated throughout the day</li>
        </ul>
      `,
    },
    {
      id: 2,
      title: "How to Create an Effective Workout Split",
      excerpt:
        "Learn how to design a workout program that maximizes gains while allowing proper recovery time.",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600",
      author: "Coach Mike Anderson",
      authorBio:
        "NASM certified personal trainer specializing in strength training",
      readTime: "8 min read",
      date: "Oct 18, 2024",
      tags: ["Training", "Beginner"],
      likes: 189,
      trending: false,
      fullContent: `
        <h2>Understanding Workout Splits</h2>
        <p>A workout split divides your training across different days, focusing on specific muscle groups each session. This allows for targeted work and adequate recovery.</p>
        
        <h2>Popular Split Options</h2>
        
        <h3>Push/Pull/Legs (PPL)</h3>
        <p>One of the most effective splits for intermediate to advanced lifters:</p>
        <ul>
          <li><strong>Push Day:</strong> Chest, shoulders, triceps</li>
          <li><strong>Pull Day:</strong> Back, biceps, rear delts</li>
          <li><strong>Leg Day:</strong> Quads, hamstrings, calves, glutes</li>
        </ul>
        
        <h3>Upper/Lower Split</h3>
        <p>Perfect for beginners and those with limited time. Train upper body one day, lower body the next.</p>
        
        <h2>How to Choose Your Split</h2>
        <p>Consider these factors:</p>
        <ul>
          <li>Training experience level</li>
          <li>Available training days per week</li>
          <li>Recovery capacity</li>
          <li>Personal preferences and goals</li>
        </ul>
        
        <blockquote>"The best workout split is the one you can stick to consistently." - Coach Mike</blockquote>
      `,
    },
    {
      id: 3,
      title: "The Science of Sleep and Muscle Recovery",
      excerpt:
        "Why quality sleep is just as important as your workouts for building muscle and losing fat.",
      image:
        "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600",
      author: "Dr. Emily Chen",
      authorBio: "Sleep researcher and sports medicine specialist",
      readTime: "6 min read",
      date: "Oct 15, 2024",
      tags: ["Recovery", "Science"],
      likes: 312,
      trending: true,
      fullContent: `
        <h2>Why Sleep Matters</h2>
        <p>During sleep, your body releases growth hormone, repairs muscle tissue, and consolidates the adaptations from your training. Without adequate sleep, your gains suffer.</p>
        
        <h2>Sleep Stages and Muscle Growth</h2>
        
        <h3>Deep Sleep (Stages 3-4)</h3>
        <p>This is when growth hormone secretion peaks. Aim for 90+ minutes of deep sleep per night.</p>
        
        <h3>REM Sleep</h3>
        <p>Important for cognitive function and nervous system recovery. Essential for learning new movement patterns.</p>
        
        <h2>Optimizing Your Sleep</h2>
        <ul>
          <li>Maintain consistent sleep/wake times</li>
          <li>Keep bedroom cool (65-68°F)</li>
          <li>Avoid screens 1 hour before bed</li>
          <li>Consider magnesium supplementation</li>
          <li>Limit caffeine after 2 PM</li>
        </ul>
        
        <h2>The Data</h2>
        <p>Studies show that athletes getting less than 7 hours of sleep experience:</p>
        <ul>
          <li>Decreased testosterone levels</li>
          <li>Increased cortisol (stress hormone)</li>
          <li>Reduced protein synthesis</li>
          <li>Impaired glucose metabolism</li>
        </ul>
      `,
    },
    {
      id: 4,
      title: "Debunking Common Fitness Myths",
      excerpt:
        "Separate fact from fiction with these evidence-based truths about fitness and nutrition.",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600",
      author: "Coach Alex Rivera",
      authorBio:
        "Evidence-based fitness educator and former competitive athlete",
      readTime: "7 min read",
      date: "Oct 12, 2024",
      tags: ["Education", "Beginner"],
      likes: 276,
      trending: false,
      fullContent: `
        <h2>Myth #1: Lifting Makes Women Bulky</h2>
        <p><strong>Truth:</strong> Women have 1/15th the testosterone of men, making it nearly impossible to get "bulky" without years of dedicated training and specific nutrition.</p>
        
        <h2>Myth #2: You Can Spot Reduce Fat</h2>
        <p><strong>Truth:</strong> Fat loss occurs systemically. You cannot target specific areas for fat loss through exercise alone.</p>
        
        <h2>Myth #3: Cardio is Best for Fat Loss</h2>
        <p><strong>Truth:</strong> Resistance training builds muscle, which increases metabolism and burns more calories at rest. Combine both for optimal results.</p>
        
        <h2>Myth #4: Eating After 6 PM Makes You Fat</h2>
        <p><strong>Truth:</strong> Total daily calorie intake matters more than meal timing. Your body doesn't have a "fat storage" switch at 6 PM.</p>
        
        <h2>Myth #5: You Need Supplements to Build Muscle</h2>
        <p><strong>Truth:</strong> While some supplements can help, they're called "supplements" for a reason. Whole foods, training, and sleep are far more important.</p>
        
        <blockquote>"Don't believe everything you read on social media. Look for peer-reviewed research and consult qualified professionals." - Coach Alex</blockquote>
      `,
    },
    {
      id: 5,
      title: "Staying Motivated: Long-Term Fitness Success",
      excerpt:
        "Practical strategies to maintain consistency and reach your fitness goals without burnout.",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600",
      author: "Jessica Martinez",
      authorBio: "Mindset coach and certified personal trainer",
      readTime: "5 min read",
      date: "Oct 10, 2024",
      tags: ["Motivation", "Mindset"],
      likes: 198,
      trending: false,
      fullContent: `
        <h2>The Motivation Myth</h2>
        <p>Motivation is fleeting. Successful people rely on systems and habits, not motivation.</p>
        
        <h2>Building Sustainable Habits</h2>
        
        <h3>Start Small</h3>
        <p>Don't overhaul your entire life overnight. Add one new habit at a time and make it stick before adding more.</p>
        
        <h3>Create Environmental Cues</h3>
        <p>Lay out your gym clothes the night before. Prep your meals on Sunday. Make the healthy choice the easy choice.</p>
        
        <h2>Strategies That Work</h2>
        <ul>
          <li><strong>Track Progress:</strong> What gets measured gets managed</li>
          <li><strong>Find Community:</strong> Train with others who share your goals</li>
          <li><strong>Set Process Goals:</strong> Focus on actions, not outcomes</li>
          <li><strong>Celebrate Small Wins:</strong> Acknowledge every step forward</li>
          <li><strong>Plan for Obstacles:</strong> Have backup plans for busy days</li>
        </ul>
        
        <h2>The 2-Day Rule</h2>
        <p>Never miss two days in a row. Missing one workout is life; missing two is the start of a pattern.</p>
        
        <blockquote>"Discipline is choosing between what you want now and what you want most." - Abraham Lincoln</blockquote>
      `,
    },
    {
      id: 6,
      title: "Understanding Macros: A Complete Guide",
      excerpt:
        "Master the fundamentals of protein, carbs, and fats to optimize your nutrition for any goal.",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600",
      author: "Dr. Sarah Johnson",
      authorBio:
        "Certified nutritionist with 10+ years of experience in sports nutrition",
      readTime: "10 min read",
      date: "Oct 8, 2024",
      tags: ["Nutrition", "Education"],
      likes: 445,
      trending: true,
      fullContent: `
        <h2>What Are Macronutrients?</h2>
        <p>Macronutrients (macros) are the three main nutrients your body needs in large amounts: protein, carbohydrates, and fats.</p>
        
        <h2>Protein: The Building Block</h2>
        <p><strong>Role:</strong> Muscle repair, enzyme production, immune function</p>
        <p><strong>Recommended:</strong> 0.8-1g per pound of body weight for active individuals</p>
        <p><strong>Best Sources:</strong> Chicken, fish, eggs, Greek yogurt, legumes</p>
        
        <h2>Carbohydrates: The Energy Source</h2>
        <p><strong>Role:</strong> Primary fuel for high-intensity exercise, brain function</p>
        <p><strong>Recommended:</strong> 40-60% of total calories, depending on activity level</p>
        <p><strong>Best Sources:</strong> Oats, rice, sweet potatoes, fruits, vegetables</p>
        
        <h2>Fats: The Essential Nutrient</h2>
        <p><strong>Role:</strong> Hormone production, vitamin absorption, cell health</p>
        <p><strong>Recommended:</strong> 20-30% of total calories</p>
        <p><strong>Best Sources:</strong> Avocados, nuts, olive oil, fatty fish</p>
        
        <h2>How to Calculate Your Macros</h2>
        <ol>
          <li>Calculate your Total Daily Energy Expenditure (TDEE)</li>
          <li>Adjust calories based on your goal (surplus for muscle, deficit for fat loss)</li>
          <li>Set protein at 0.8-1g per lb body weight</li>
          <li>Allocate remaining calories between carbs and fats based on preference</li>
        </ol>
      `,
    },
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" || blog.tags.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  const relatedBlogs = blogs.filter((b) => b.id !== selectedBlog?.id);

  return (
    <Container>
      <Wrapper>
        <Title>Fitness Blog</Title>
        <Desc>
          Expert articles on nutrition, training, recovery, and motivation
        </Desc>

        <SearchBar>
          <SearchRounded sx={{ color: "inherit" }} />
          <SearchInput
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>

        <FilterSection>
          {filters.map((filter) => (
            <FilterChip
              key={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </FilterChip>
          ))}
        </FilterSection>

        <BlogsGrid>
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} onClick={() => setSelectedBlog(blog)}>
              <BlogImage img={blog.image} className="blog-image">
                {blog.trending && (
                  <TrendingBadge>
                    <TrendingUpRounded sx={{ fontSize: "14px" }} />
                    TRENDING
                  </TrendingBadge>
                )}
              </BlogImage>

              <CardContent>
                <TagsContainer>
                  {blog.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagsContainer>

                <BlogTitle>{blog.title}</BlogTitle>
                <BlogExcerpt>{blog.excerpt}</BlogExcerpt>

                <CardFooter>
                  <MetaInfo>
                    <Author>
                      <PersonRounded sx={{ fontSize: "16px" }} />
                      {blog.author}
                    </Author>
                    <ReadTime>
                      <AccessTimeRounded sx={{ fontSize: "16px" }} />
                      {blog.readTime}
                    </ReadTime>
                  </MetaInfo>
                  <BookmarkButton
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Bookmark feature - Coming soon!");
                    }}
                  >
                    <BookmarkBorderRounded />
                  </BookmarkButton>
                </CardFooter>
              </CardContent>
            </BlogCard>
          ))}
        </BlogsGrid>

        {filteredBlogs.length === 0 && (
          <EmptyState>
            <h3>No articles found</h3>
            <p>Try a different search or filter.</p>
          </EmptyState>
        )}
      </Wrapper>

      {selectedBlog && (
        <BlogModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
          relatedBlogs={relatedBlogs}
        />
      )}
    </Container>
  );
};

export default Blogs;
