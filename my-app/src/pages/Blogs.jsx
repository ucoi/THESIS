import React, { useState } from "react";
import styled from "styled-components";
import {
  CalendarTodayRounded,
  PersonRounded,
  SearchRounded,
} from "@mui/icons-material";

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
  max-width: 1200px;
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
  font-weight: 600;
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
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  border-radius: 8px;
  padding: 12px 16px;
  margin: 0px 16px;
  align-items: center;
  gap: 12px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
`;

const BlogsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0px 16px;
  margin-bottom: 100px;
`;

const BlogCard = styled.div`
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  gap: 20px;
  &:hover {
    box-shadow: 0px 4px 20px ${({ theme }) => theme.primary + 30};
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BlogImage = styled.div`
  min-width: 300px;
  height: 200px;
  background: ${({ theme }) => theme.text_secondary + 20};
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-position: center;
  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
  }
`;

const BlogContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const BlogTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const BlogExcerpt = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
`;

const BlogMeta = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: auto;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
`;

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const blogs = [
    {
      id: 1,
      title: "The Science Behind Progressive Overload",
      excerpt:
        "Understanding how progressive overload works and why it's essential for building muscle and strength. Learn the principles that drive muscle growth...",
      author: "Dr. Sarah Johnson",
      date: "Oct 15, 2025",
      tags: ["Training", "Science"],
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
    },
    {
      id: 2,
      title: "Top 10 Pre-Workout Nutrition Tips",
      excerpt:
        "Fuel your workouts properly with these evidence-based nutrition strategies. What you eat before training can make or break your performance...",
      author: "Mike Thompson",
      date: "Oct 12, 2025",
      tags: ["Nutrition", "Tips"],
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
    },
    {
      id: 3,
      title: "Recovery: The Most Overlooked Aspect of Fitness",
      excerpt:
        "Why rest days are just as important as training days. Discover the science of recovery and how to optimize it for maximum gains...",
      author: "Emily Chen",
      date: "Oct 10, 2025",
      tags: ["Recovery", "Health"],
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    },
    {
      id: 4,
      title: "Building a Sustainable Workout Routine",
      excerpt:
        "Create a fitness plan you can stick to for life. Learn how to balance intensity, volume, and recovery for long-term success...",
      author: "James Rodriguez",
      date: "Oct 8, 2025",
      tags: ["Training", "Lifestyle"],
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
    },
    {
      id: 5,
      title: "Myths About Cardio and Fat Loss",
      excerpt:
        "Debunking common misconceptions about cardio exercise. What really works for fat loss and what's just wasted effort...",
      author: "Dr. Sarah Johnson",
      date: "Oct 5, 2025",
      tags: ["Cardio", "Fat Loss"],
      image:
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400",
    },
  ];

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <Container>
      <Wrapper>
        <Title>Fitness Blog</Title>
        <Desc>
          Expert insights, training tips, and the latest fitness research
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

        <BlogsContainer>
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id}>
              <BlogImage img={blog.image} />
              <BlogContent>
                <BlogTitle>{blog.title}</BlogTitle>
                <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
                <BlogMeta>
                  <MetaItem>
                    <PersonRounded sx={{ fontSize: "18px" }} />
                    {blog.author}
                  </MetaItem>
                  <MetaItem>
                    <CalendarTodayRounded sx={{ fontSize: "18px" }} />
                    {blog.date}
                  </MetaItem>
                  {blog.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </BlogMeta>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogsContainer>

        {filteredBlogs.length === 0 && (
          <Desc style={{ textAlign: "center", marginTop: "40px" }}>
            No articles found. Try a different search term.
          </Desc>
        )}
      </Wrapper>
    </Container>
  );
};

export default Blogs;
