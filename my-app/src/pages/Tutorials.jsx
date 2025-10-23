import React, { useState } from "react";
import styled from "styled-components";
import {
  PlayCircleOutlineRounded,
  SearchRounded,
  NewReleasesRounded,
} from "@mui/icons-material";
import VideoModal from "../components/VideoModal";

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

  &:active {
    transform: translateY(0);
  }
`;

const TutorialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  padding: 0px 16px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }
`;

const TutorialCard = styled.div`
  border: 1px solid ${({ theme }) => theme.text_primary + 15};
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.card};
  box-shadow: ${({ theme }) => theme.shadow};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow_lg};
    transform: translateY(-6px);

    .play-button {
      transform: scale(1.2);
      background: ${({ theme }) => theme.primary};
    }

    .thumbnail {
      transform: scale(1.05);
    }
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 200px;
  background: ${({ theme }) => theme.text_secondary + 20};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;

const PlayIcon = styled.div`
  color: white;
  background: ${({ theme }) => theme.primary}cc;
  border-radius: 50%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
`;

const DurationBadge = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  backdrop-filter: blur(10px);
`;

const NewBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: ${({ theme }) => theme.green};
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
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
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.4;
`;

const CardDesc = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.text_secondary + 20};
  margin-top: auto;
`;

const Category = styled.span`
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
  border-radius: 8px;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
`;

const Instructor = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
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

const Tutorials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  const filters = [
    "All",
    "Beginner",
    "Intermediate",
    "Advanced",
    "Nutrition",
    "Form",
  ];

  const tutorials = [
    {
      id: 1,
      title: "How to Perfect Your Squat Form",
      description:
        "Learn the proper technique for squats to maximize gains and prevent injury.",
      fullDescription:
        "In this comprehensive tutorial, you'll learn everything about proper squat form. We cover foot positioning, bar placement, depth, and common mistakes to avoid. Perfect for beginners and intermediate lifters looking to improve their technique.",
      category: "Form",
      duration: "8 min",
      level: "Beginner",
      thumbnail:
        "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400",
      videoUrl: "https://www.youtube.com/watch?v=ultWZbUMPL8",
      instructor: "Coach Mike",
      isNew: false,
    },
    {
      id: 2,
      title: "Complete Beginner's Guide to Gym",
      description: "Everything you need to know to start your fitness journey.",
      fullDescription:
        "Starting at the gym can be intimidating. This guide covers gym etiquette, basic equipment usage, creating your first workout plan, and setting realistic goals. You'll feel confident walking into any gym after watching this.",
      category: "Beginner",
      duration: "15 min",
      level: "Beginner",
      thumbnail:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400",
      videoUrl: "https://www.youtube.com/watch?v=1HIXRDHnSww",
      instructor: "Sarah Johnson",
      isNew: true,
    },
    {
      id: 3,
      title: "Meal Prep for Muscle Gain",
      description:
        "Simple meal prep strategies to fuel your workouts and build muscle.",
      fullDescription:
        "Learn how to meal prep like a pro! This tutorial covers macronutrient calculations, grocery shopping tips, bulk cooking techniques, and storage solutions. Includes 3 complete muscle-building meal prep recipes.",
      category: "Nutrition",
      duration: "12 min",
      level: "Intermediate",
      thumbnail:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
      videoUrl: "https://www.youtube.com/watch?v=bZtHLbdFJsI",
      instructor: "Chef Tony",
      isNew: true,
    },
    {
      id: 4,
      title: "Advanced Deadlift Techniques",
      description:
        "Take your deadlift to the next level with these advanced tips.",
      fullDescription:
        "For experienced lifters ready to push their deadlift PR. We cover sumo vs conventional, proper breathing techniques, belt usage, and advanced programming strategies. Includes troubleshooting for common plateaus.",
      category: "Advanced",
      duration: "10 min",
      level: "Advanced",
      thumbnail:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
      videoUrl: "https://www.youtube.com/watch?v=op9kVnSso6Q",
      instructor: "Coach Mike",
      isNew: false,
    },
    {
      id: 5,
      title: "HIIT Cardio for Fat Loss",
      description:
        "High-intensity interval training routines for maximum fat burning.",
      fullDescription:
        "Burn maximum calories in minimum time! This HIIT workout requires no equipment and can be done anywhere. Includes warm-up, 20-minute workout, and cool-down. Modifications shown for all fitness levels.",
      category: "Intermediate",
      duration: "20 min",
      level: "Intermediate",
      thumbnail:
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400",
      videoUrl: "https://www.youtube.com/watch?v=ml6cT4AZdqI",
      instructor: "Emily Chen",
      isNew: true,
    },
    {
      id: 6,
      title: "Understanding Macros and Calories",
      description:
        "A complete guide to tracking macronutrients for your goals.",
      fullDescription:
        "Demystify nutrition! Learn what macros are, how to calculate your needs, the best tracking apps, and how to adjust based on your results. Perfect for anyone looking to take control of their diet.",
      category: "Nutrition",
      duration: "18 min",
      level: "Beginner",
      thumbnail:
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400",
      videoUrl: "https://www.youtube.com/watch?v=3d7QIZ7iEDc",
      instructor: "Dr. Sarah Johnson",
      isNew: false,
    },
  ];

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch =
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      tutorial.level === activeFilter ||
      tutorial.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Container>
      <Wrapper>
        <Title>Fitness Tutorials</Title>
        <Desc>
          Learn proper form, nutrition tips, and workout strategies from experts
        </Desc>

        <SearchBar>
          <SearchRounded sx={{ color: "inherit" }} />
          <SearchInput
            type="text"
            placeholder="Search tutorials..."
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

        <TutorialsGrid>
          {filteredTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              onClick={() => setSelectedTutorial(tutorial)}
            >
              <Thumbnail img={tutorial.thumbnail} className="thumbnail">
                <ThumbnailOverlay>
                  <PlayIcon className="play-button">
                    <PlayCircleOutlineRounded sx={{ fontSize: "56px" }} />
                  </PlayIcon>
                </ThumbnailOverlay>
                <DurationBadge>{tutorial.duration}</DurationBadge>
                {tutorial.isNew && (
                  <NewBadge>
                    <NewReleasesRounded sx={{ fontSize: "16px" }} />
                    NEW
                  </NewBadge>
                )}
              </Thumbnail>
              <CardContent>
                <CardTitle>{tutorial.title}</CardTitle>
                <CardDesc>{tutorial.description}</CardDesc>
                <CardFooter>
                  <Category level={tutorial.level}>{tutorial.level}</Category>
                  <Instructor>{tutorial.instructor}</Instructor>
                </CardFooter>
              </CardContent>
            </TutorialCard>
          ))}
        </TutorialsGrid>

        {filteredTutorials.length === 0 && (
          <EmptyState>
            <h3>No tutorials found</h3>
            <p>Try a different search or filter.</p>
          </EmptyState>
        )}
      </Wrapper>

      {selectedTutorial && (
        <VideoModal
          tutorial={selectedTutorial}
          onClose={() => setSelectedTutorial(null)}
        />
      )}
    </Container>
  );
};

export default Tutorials;
