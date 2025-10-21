import React, { useState } from "react";
import styled from "styled-components";
import {
  EmailRounded,
  PhoneRounded,
  LocationOnRounded,
  SendRounded,
} from "@mui/icons-material";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

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
  text-align: center;
`;

const Desc = styled.div`
  padding: 0px 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 400;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 20px;
  @media (max-width: 968px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InfoCard = styled.div`
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

const IconWrapper = styled.div`
  background: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const InfoText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
`;

const RightSection = styled.div`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 12px;
  padding: 32px;
  background: ${({ theme }) => theme.card};
  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const FormTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Message = styled.div`
  margin-top: 12px;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  background: ${({ success, theme }) =>
    success ? theme.primary + 20 : theme.red + 20};
  color: ${({ success, theme }) => (success ? theme.primary : theme.red)};
  font-size: 14px;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", success: false });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFeedback({
        message: "Please fill in all required fields",
        success: false,
      });
      setTimeout(() => setFeedback({ message: "", success: false }), 3000);
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setFeedback({
        message: "Message sent successfully! We'll get back to you soon.",
        success: true,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
      setTimeout(() => setFeedback({ message: "", success: false }), 5000);
    }, 1500);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Get In Touch</Title>
        <Desc>
          Have questions or feedback? We'd love to hear from you. Send us a
          message and we'll respond as soon as possible.
        </Desc>

        <ContentWrapper>
          <LeftSection>
            <InfoCard>
              <IconWrapper>
                <EmailRounded />
              </IconWrapper>
              <InfoContent>
                <InfoTitle>Email Us</InfoTitle>
                <InfoText>
                  support@fittrack.com
                  <br />
                  Available 24/7
                </InfoText>
              </InfoContent>
            </InfoCard>

            <InfoCard>
              <IconWrapper>
                <PhoneRounded />
              </IconWrapper>
              <InfoContent>
                <InfoTitle>Call Us</InfoTitle>
                <InfoText>
                  +1 (555) 123-4567
                  <br />
                  Mon-Fri: 9AM - 6PM EST
                </InfoText>
              </InfoContent>
            </InfoCard>

            <InfoCard>
              <IconWrapper>
                <LocationOnRounded />
              </IconWrapper>
              <InfoContent>
                <InfoTitle>Visit Us</InfoTitle>
                <InfoText>
                  123 Fitness Street
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </InfoText>
              </InfoContent>
            </InfoCard>
          </LeftSection>

          <RightSection>
            <FormTitle>Send us a message</FormTitle>
            <Form onSubmit={handleSubmit}>
              <TextInput
                label="Name *"
                placeholder="Your name"
                name="name"
                value={formData.name}
                handleChange={handleChange}
              />

              <TextInput
                label="Email *"
                placeholder="your.email@example.com"
                name="email"
                value={formData.email}
                handleChange={handleChange}
              />

              <TextInput
                label="Subject"
                placeholder="How can we help?"
                name="subject"
                value={formData.subject}
                handleChange={handleChange}
              />

              <TextInput
                label="Message *"
                placeholder="Tell us more..."
                name="message"
                textArea
                rows={6}
                value={formData.message}
                handleChange={handleChange}
              />

              <Button
                text="Send Message"
                leftIcon={<SendRounded />}
                isLoading={loading}
                isDisabled={loading}
                type="submit"
              />

              {feedback.message && (
                <Message success={feedback.success}>{feedback.message}</Message>
              )}
            </Form>
          </RightSection>
        </ContentWrapper>
      </Wrapper>
    </Container>
  );
};

export default Contact;
