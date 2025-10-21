import React, { useState } from "react";
import styled from "styled-components";
import { PlayCircleOutlineRounded, SearchRounded } from "@mui/icons-material";

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

const FilterSection = styled.div`
  display: flex;
  gap: 12px;
  padding: 0px 16px;
  flex-wrap: wrap;
`;

const FilterChip = styled.div`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.primary : theme.text_secondary + 50};
  background: ${({ theme, active }) =>
    active ? theme.primary + 20 : "transparent"};
  color: ${({ theme, active }) =>
    active ? theme.primary : theme.text_secondary};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TutorialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 0px 16px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 12px;
  }
`;

const TutorialCard = styled.div`
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0px 4px 20px ${({ theme }) => theme.primary + 30};
    transform: translateY(-4px);
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 180px;
  background: ${({ theme }) => theme.text_secondary + 20};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-position: center;
`;

const PlayIcon = styled.div`
  color: white;
  background: ${({ theme }) => theme.primary};
  border-radius: 50%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const CardDesc = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 8px;
`;

const Category = styled.span`
  background: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
`;

const Tutorials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

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
      category: "Form",
      duration: "8 min",
      level: "Beginner",
      thumbnail:
        "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400",
    },
    {
      id: 2,
      title: "Complete Beginner's Guide to Gym",
      description: "Everything you need to know to start your fitness journey.",
      category: "Beginner",
      duration: "15 min",
      level: "Beginner",
      thumbnail:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400",
    },
    {
      id: 3,
      title: "Meal Prep for Muscle Gain",
      description:
        "Simple meal prep strategies to fuel your workouts and build muscle.",
      category: "Nutrition",
      duration: "12 min",
      level: "Intermediate",
      thumbnail:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
    },
    {
      id: 4,
      title: "Advanced Deadlift Techniques",
      description:
        "Take your deadlift to the next level with these advanced tips.",
      category: "Advanced",
      duration: "10 min",
      level: "Advanced",
      thumbnail:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
    },
    {
      id: 5,
      title: "HIIT Cardio for Fat Loss",
      description:
        "High-intensity interval training routines for maximum fat burning.",
      category: "Intermediate",
      duration: "20 min",
      level: "Intermediate",
      thumbnail:
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400",
    },
    {
      id: 6,
      title: "Understanding Macros and Calories",
      description:
        "A complete guide to tracking macronutrients for your goals.",
      category: "Nutrition",
      duration: "18 min",
      level: "Beginner",
      thumbnail:
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400",
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
            <TutorialCard key={tutorial.id}>
              <Thumbnail img={tutorial.thumbnail}>
                <PlayIcon>
                  <PlayCircleOutlineRounded sx={{ fontSize: "48px" }} />
                </PlayIcon>
              </Thumbnail>
              <CardContent>
                <CardTitle>{tutorial.title}</CardTitle>
                <CardDesc>{tutorial.description}</CardDesc>
                <CardFooter>
                  <Category>{tutorial.category}</Category>
                  <span>{tutorial.duration}</span>
                </CardFooter>
              </CardContent>
            </TutorialCard>
          ))}
        </TutorialsGrid>

        {filteredTutorials.length === 0 && (
          <Desc style={{ textAlign: "center", marginTop: "40px" }}>
            No tutorials found. Try a different search or filter.
          </Desc>
        )}
      </Wrapper>
    </Container>
  );
};

export default Tutorials;
