import React from "react";
import styled from "styled-components";
import {
  CloseRounded,
  BookmarkBorderRounded,
  ShareRounded,
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
  position: absolute;
  top: 16px;
  right: 16px;
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

  &:hover {
    background: ${({ theme }) => theme.red};
    color: white;
    transform: rotate(90deg);
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background: black;
  border-radius: 20px 20px 0 0;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const ContentSection = styled.div`
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
`;

const TitleSection = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const Badge = styled.span`
  background: ${({ theme, level }) =>
    level === "Beginner"
      ? theme.green + 20
      : level === "Intermediate"
      ? theme.orange + 20
      : theme.red + 20};
  color: ${({ theme, level }) =>
    level === "Beginner"
      ? theme.green
      : level === "Intermediate"
      ? theme.orange
      : theme.red};
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
`;

const Duration = styled.span`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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

const Description = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 20px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 20px;
  background: ${({ theme }) => theme.card_light};
  border-radius: 12px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 600;
  text-transform: uppercase;
`;

const InfoValue = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 700;
`;

const VideoModal = ({ tutorial, onClose }) => {
  if (!tutorial) return null;

  // Convert regular YouTube URL to embed URL
  const getEmbedUrl = (url) => {
    if (!url) return "";
    const videoId = url.split("v=")[1] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleBookmark = () => {
    alert("Bookmark feature - Coming soon!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tutorial.title,
        text: tutorial.description,
      });
    } else {
      alert("Share feature - Coming soon!");
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <CloseRounded />
        </CloseButton>

        <VideoContainer>
          <iframe
            src={getEmbedUrl(tutorial.videoUrl)}
            title={tutorial.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoContainer>

        <ContentSection>
          <Header>
            <TitleSection>
              <Title>{tutorial.title}</Title>
              <Meta>
                <Badge level={tutorial.level}>{tutorial.level}</Badge>
                <Duration>⏱ {tutorial.duration}</Duration>
              </Meta>
            </TitleSection>

            <ActionButtons>
              <ActionButton onClick={handleBookmark} title="Save for later">
                <BookmarkBorderRounded />
              </ActionButton>
              <ActionButton onClick={handleShare} title="Share">
                <ShareRounded />
              </ActionButton>
            </ActionButtons>
          </Header>

          <Description>
            {tutorial.fullDescription || tutorial.description}
          </Description>

          <InfoGrid>
            <InfoItem>
              <InfoLabel>Category</InfoLabel>
              <InfoValue>{tutorial.category}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Level</InfoLabel>
              <InfoValue>{tutorial.level}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Duration</InfoLabel>
              <InfoValue>{tutorial.duration}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Instructor</InfoLabel>
              <InfoValue>{tutorial.instructor || "FitTrack Team"}</InfoValue>
            </InfoItem>
          </InfoGrid>
        </ContentSection>
      </ModalContent>
    </Overlay>
  );
};

export default VideoModal;
