import React from "react";
import styled from "styled-components";
import {
  CloseRounded,
  AccessTimeRounded,
  PersonRounded,
  CalendarTodayRounded,
  BookmarkBorderRounded,
  ShareRounded,
  FavoriteRounded,
} from "@mui/icons-material";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.card_light};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 10px;
  }

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 16px;
  }
`;

const CloseButton = styled.button`
  position: sticky;
  top: 16px;
  left: calc(100% - 56px);
  background: ${({ theme }) => theme.text_primary}20;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.text_primary};
  transition: all 0.3s ease;
  z-index: 10;
  margin: 16px;

  &:hover {
    background: ${({ theme }) => theme.red};
    color: white;
    transform: rotate(90deg);
  }
`;

const FeaturedImage = styled.div`
  width: 100%;
  height: 400px;
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-position: center;
  border-radius: 20px 20px 0 0;

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ContentSection = styled.div`
  padding: 40px;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.3;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  padding-bottom: 24px;
  border-bottom: 2px solid ${({ theme }) => theme.text_secondary}20;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  font-weight: 500;
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 0;
  border-bottom: 2px solid ${({ theme }) => theme.text_secondary}20;
`;

const AuthorAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 24px;
  flex-shrink: 0;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 4px;
`;

const AuthorBio = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: ${({ theme, active }) =>
    active ? theme.primary : theme.primary + 20};
  color: ${({ theme, active }) => (active ? "white" : theme.primary)};
  border: none;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ArticleContent = styled.div`
  padding: 32px 0;
  color: ${({ theme }) => theme.text_primary};
  font-size: 17px;
  line-height: 1.8;

  h2 {
    font-size: 28px;
    font-weight: 700;
    margin: 32px 0 16px 0;
    color: ${({ theme }) => theme.text_primary};
  }

  h3 {
    font-size: 22px;
    font-weight: 600;
    margin: 24px 0 12px 0;
    color: ${({ theme }) => theme.text_primary};
  }

  p {
    margin-bottom: 20px;
    color: ${({ theme }) => theme.text_secondary};
  }

  ul,
  ol {
    margin: 16px 0;
    padding-left: 24px;
    color: ${({ theme }) => theme.text_secondary};
  }

  li {
    margin-bottom: 12px;
    line-height: 1.7;
  }

  strong {
    color: ${({ theme }) => theme.text_primary};
    font-weight: 700;
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.primary};
    padding: 16px 24px;
    margin: 24px 0;
    background: ${({ theme }) => theme.card_light};
    border-radius: 8px;
    font-style: italic;
    color: ${({ theme }) => theme.text_primary};
  }

  code {
    background: ${({ theme }) => theme.card_light};
    padding: 2px 8px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9em;
    color: ${({ theme }) => theme.primary};
  }
`;

const RelatedArticles = styled.div`
  padding-top: 32px;
  border-top: 2px solid ${({ theme }) => theme.text_secondary}20;
`;

const RelatedTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

const RelatedCard = styled.div`
  padding: 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.card_light};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary}10;
    transform: translateY(-2px);
  }
`;

const RelatedCardTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const RelatedCardMeta = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
`;

const BlogModal = ({ blog, onClose, relatedBlogs = [] }) => {
  const [liked, setLiked] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(false);

  if (!blog) return null;

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
      });
    } else {
      alert("Share feature - Coming soon!");
    }
  };

  const getAuthorInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <CloseRounded />
        </CloseButton>

        <FeaturedImage img={blog.image} />

        <ContentSection>
          <Header>
            <TagsContainer>
              {blog.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagsContainer>

            <Title>{blog.title}</Title>

            <Meta>
              <MetaItem>
                <AccessTimeRounded sx={{ fontSize: "18px" }} />
                {blog.readTime}
              </MetaItem>
              <MetaItem>
                <CalendarTodayRounded sx={{ fontSize: "18px" }} />
                {blog.date}
              </MetaItem>
              <MetaItem>
                <FavoriteRounded sx={{ fontSize: "18px" }} />
                {blog.likes || 124} likes
              </MetaItem>
            </Meta>
          </Header>

          <AuthorSection>
            <AuthorAvatar>{getAuthorInitials(blog.author)}</AuthorAvatar>
            <AuthorInfo>
              <AuthorName>{blog.author}</AuthorName>
              <AuthorBio>
                {blog.authorBio || "Fitness enthusiast and certified trainer"}
              </AuthorBio>
            </AuthorInfo>
            <ActionButtons>
              <ActionButton onClick={handleLike} active={liked}>
                <FavoriteRounded sx={{ fontSize: "18px" }} />
                {liked ? "Liked" : "Like"}
              </ActionButton>
              <ActionButton onClick={handleBookmark} active={bookmarked}>
                <BookmarkBorderRounded sx={{ fontSize: "18px" }} />
              </ActionButton>
              <ActionButton onClick={handleShare}>
                <ShareRounded sx={{ fontSize: "18px" }} />
              </ActionButton>
            </ActionButtons>
          </AuthorSection>

          <ArticleContent
            dangerouslySetInnerHTML={{
              __html: blog.fullContent || blog.content,
            }}
          />

          {relatedBlogs.length > 0 && (
            <RelatedArticles>
              <RelatedTitle>Related Articles</RelatedTitle>
              <RelatedGrid>
                {relatedBlogs.slice(0, 3).map((related) => (
                  <RelatedCard
                    key={related.id}
                    onClick={() => window.location.reload()}
                  >
                    <RelatedCardTitle>{related.title}</RelatedCardTitle>
                    <RelatedCardMeta>
                      {related.readTime} • {related.author}
                    </RelatedCardMeta>
                  </RelatedCard>
                ))}
              </RelatedGrid>
            </RelatedArticles>
          )}
        </ContentSection>
      </ModalContent>
    </Overlay>
  );
};

export default BlogModal;
