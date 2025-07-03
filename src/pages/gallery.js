import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from '@components';
import { useStaticQuery, graphql } from 'gatsby';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const StyledGallerySection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  @media (max-width: 480px) {
    padding: 60px 0;
  }
`;

const StyledTitle = styled.h2`
  display: flex;
  color: var(--lightpurple);
  align-items: center;
  position: relative;
  margin: 10px 0 40px;
  width: 100%;
  font-size: clamp(40px, 8vw, 80px);
  white-space: nowrap;

  &:after {
    content: '';
    display: block;
    position: relative;
    top: -10px;
    width: 300px;
    height: 1px;
    margin-left: 20px;
    background-color: var(--lightest-navy);

    @media (max-width: 1080px) {
      width: 200px;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const StyledSubtitle = styled.p`
  margin: 10px 0 0;
  max-width: 540px;
  color: var(--light-slate);
  font-size: var(--fz-lg);
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: var(--fz-md);
  }
`;

const StyledFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0 30px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 15px;
  }
`;

const StyledFilterButton = styled.button`
  background: transparent;
  border: 1px solid var(--green);
  color: var(--green);
  padding: 8px 16px;
  border-radius: var(--border-radius);
  font-size: var(--fz-sm);
  font-family: var(--font-mono);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background: rgba(96, 250, 248, 0.1);
  }

  &.active {
    background: var(--green);
    color: var(--navy);
  }
`;

const StyledGalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
  position: relative;
  margin-top: 50px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const StyledGalleryItem = styled.div`
  ${({ theme }) => theme.mixins.boxShadow};
  background: var(--light-navy);
  border-radius: var(--border-radius);
  padding: 2rem 1.75rem;
  transition: var(--transition);
  cursor: pointer;

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-7px);
    }
  }
`;

const StyledItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 15px;
`;

const StyledItemTitle = styled.h3`
  color: var(--lightpurple);
  font-size: var(--fz-xxl);
  margin: 0 0 10px 0;
  font-weight: 600;
`;

const StyledItemDescription = styled.p`
  color: var(--light-slate);
  font-size: 17px;
  line-height: 1.4;
  margin: 0;
`;

const StyledItemType = styled.span`
  display: inline-block;
  color: var(--green);
  font-size: var(--fz-xs);
  font-family: var(--font-mono);
  margin-top: 10px;
`;

const StyledEmptyState = styled.div`
  text-align: center;
  color: var(--light-slate);
  font-size: var(--fz-lg);
  margin-top: 50px;
  font-family: var(--font-mono);
`;

// Sample gallery data - you can replace this with your actual content
const galleryData = [
  {
    id: 1,
    title: '夏令时珍珠',
    description: '谨以此文献给一位曾经的友人，愿我们都能坦然拥抱真实的自己',
    type: '阿弗勒斯的倒影',
    slug: '/writings/summertime-pearl'
  },
  {
    id: 2,
    title: '夜的纹理',
    description: '献给Cyberpunk2077的Judy，来自恶魔结局的Valerie',
    type: '深林的回响',
    slug: '/writings/Texture-of-the-night'
  },

];

const GalleryPage = ({ location }) => {
  const [filter, setFilter] = useState('all');
  
  const filteredItems = filter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.type === filter);

  const handleItemClick = (item) => {
    if (item.file) {
      window.open(item.file, '_blank');
    } else if (item.slug) {
      window.location.href = item.slug;
    }
  };

  return (
    <Layout location={location}>
      <StyledMainContainer className="fillHeight">
        <StyledGallerySection>
          <StyledTitle>Gallery</StyledTitle>
          <StyledSubtitle>
            A collection of my paintings and writings, exploring creativity across different mediums and themes.
          </StyledSubtitle>
          
          <StyledFilterContainer>
            <StyledFilterButton 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All
            </StyledFilterButton>
            <StyledFilterButton 
              className={filter === 'painting' ? 'active' : ''}
              onClick={() => setFilter('painting')}
            >
              Paintings
            </StyledFilterButton>
            <StyledFilterButton 
              className={filter === '阿弗勒斯的倒影' ? 'active' : ''}
              onClick={() => setFilter('阿弗勒斯的倒影')}
            >
              阿弗勒斯的倒影
            </StyledFilterButton>
            <StyledFilterButton 
              className={filter === '深林的回响' ? 'active' : ''}
              onClick={() => setFilter('深林的回响')}
            >
              深林的回响
            </StyledFilterButton>
          </StyledFilterContainer>

          <StyledGalleryGrid>
            {filteredItems.map(item => (
              <StyledGalleryItem key={item.id} onClick={() => handleItemClick(item)}>
                {item.type === 'painting' && item.image && (
                  <StyledItemImage src={item.image} alt={item.title} />
                )}
                <StyledItemTitle>{item.title}</StyledItemTitle>
                <StyledItemDescription>{item.description}</StyledItemDescription>
                <StyledItemType>{item.type}</StyledItemType>
              </StyledGalleryItem>
            ))}
          </StyledGalleryGrid>

          {filteredItems.length === 0 && (
            <StyledEmptyState>
              No items found for the selected filter.
            </StyledEmptyState>
          )}
        </StyledGallerySection>
      </StyledMainContainer>
    </Layout>
  );
};

GalleryPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default GalleryPage; 