import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledWritingContainer = styled.main`
  max-width: 1100px;
  margin: 0 auto;
`;

const StyledWritingHeader = styled.header`
  margin-bottom: 60px;
  text-align: center;
`;

const StyledWritingTitle = styled.h1`
  color: var(--lightpurple);
  font-size: clamp(32px, 6vw, 48px);
  margin-bottom: 20px;
  font-weight: 600;
  line-height: 1.1;
`;

const StyledWritingMeta = styled.div`
  color: var(--light-slate);
  font-size: var(--fz-lg);
  margin-bottom: 30px;
`;

const StyledWritingType = styled.span`
  color: var(--green);
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  margin-left: 15px;
`;

const StyledWritingDescription = styled.p`
  color: var(--light-slate);
  font-size: var(--fz-lg);
  font-style: italic;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const StyledWritingContent = styled.div`
  margin-bottom: 100px;
  
  h1, h2, h3, h4, h5, h6 {
    margin: 2.5em 0 1em;
    color: var(--lightest-slate);
    font-weight: 600;
    line-height: 1.2;
  }

  h1 {
    font-size: clamp(24px, 4vw, 32px);
  }

  h2 {
    font-size: clamp(20px, 3vw, 28px);
  }

  h3 {
    font-size: clamp(18px, 2.5vw, 24px);
  }

  p {
    margin: 1.5em 0;
    line-height: 1.8;
    color: var(--light-slate);
    font-size: var(--fz-lg);
    text-align: justify;
  }

  blockquote {
    border-left: 4px solid var(--green);
    margin: 2em 0;
    padding: 1em 0 1em 2em;
    font-style: italic;
    color: var(--light-slate);
    background: rgba(96, 250, 248, 0.05);
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  code {
    background-color: var(--lightest-navy);
    color: var(--lightest-slate);
    border-radius: var(--border-radius);
    font-size: var(--fz-sm);
    padding: 0.2em 0.4em;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }
`;

const StyledBackButton = styled.div`
  margin-bottom: 40px;
  
  .breadcrumb {
    ${({ theme }) => theme.mixins.flexCenter};
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--light-slate);
    
    .arrow {
      margin-right: 10px;
      transition: var(--transition);
    }
    
    &:hover {
      color: var(--green);
      .arrow {
        transform: translateX(-5px);
      }
    }
  }
`;

const WritingTemplate = ({ data, location }) => {
  if (!data.markdownRemark) {
    return <div>Writing not found.</div>;
  }
  const { frontmatter, html } = data.markdownRemark;
  const { title, date, type, description } = frontmatter;

  return (
    <Layout location={location}>
      <Helmet title={title} />

      <StyledWritingContainer>
        <StyledBackButton>
          <Link to="/gallery" className="breadcrumb">
            <span className="arrow">&larr;</span>
            Back to Gallery
          </Link>
        </StyledBackButton>

        <StyledWritingHeader>
          <StyledWritingTitle>{title}</StyledWritingTitle>
          <StyledWritingMeta>
            <time>
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <StyledWritingType>{type}</StyledWritingType>
          </StyledWritingMeta>
          {description && (
            <StyledWritingDescription>{description}</StyledWritingDescription>
          )}
        </StyledWritingHeader>

        <StyledWritingContent dangerouslySetInnerHTML={{ __html: html }} />
      </StyledWritingContainer>
    </Layout>
  );
};

export default WritingTemplate;

WritingTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        date
        type
        slug
      }
    }
  }
`; 