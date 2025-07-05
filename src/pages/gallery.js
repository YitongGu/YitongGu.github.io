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
  margin: ${props => props.sub ? '8px 0 30px' : '50px 0 30px'};
  gap: ${props => props.sub ? '20px' : '30px'};

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: ${props => props.sub ? '15px' : '20px'};
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
  margin-right: 0;
(almost done)

  &:hover {
    background: rgba(96, 250, 248, 0.1);
  }

  &.active {
    background: var(--green);
    color: var(--navy);
  }

  &.sub {
    font-size: var(--fz-xs);
    padding: 6px 12px;
    margin-left: 8px;
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

const StyledWritingDescription = styled.div`
  text-align: center;
  color: var(--light-slate);
  font-size: var(--fz-lg);
  margin: 8px 0 10px 0;
  font-family: var(--font-mono);
`;

// Sample gallery data - you can replace this with your actual content
const galleryData = [
  {
    id: 1,
    title: '夏令时珍珠',
    description: '谨以此文献给一位曾经的友人。愿我们都能坦然拥抱真实的自己。',
    type: '阿弗勒斯的倒影',
    category: 'writings',
    slug: '/writings/summertime-pearl'
  },
  {
    id: 2,
    title: '夜的纹理',
    description: '献给夜之城Judy，来自空间站舱门内的Valerie',
    type: '林深之处的回响',
    category: 'writings',
    slug: '/writings/textured-nights'
  },
];

const GalleryPage = ({ location }) => {
  const [filter, setFilter] = useState(null);
  const [showWritingSubcategories, setShowWritingSubcategories] = useState(false);
  
  const filteredItems = filter === 'writings'
    ? galleryData.filter(item => item.category === 'writings')
    : filter
    ? galleryData.filter(item => item.type === filter)
    : [];

  const handleWritingsClick = () => {
    if (filter === 'writings') {
      setShowWritingSubcategories(!showWritingSubcategories);
    } else {
      setFilter('writings');
      setShowWritingSubcategories(true);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setFilter(subcategory);
  };

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
            <h>A collection of my paintings and writings, exploring creativity across different media and themes.</h>
          </StyledSubtitle>
          {filter === null && (
            <StyledFilterContainer>
              <StyledFilterButton 
                className={filter === 'painting' ? 'active' : ''}
                onClick={() => {
                  setFilter('painting');
                  setShowWritingSubcategories(false);
                }}
              >
                Paintings
              </StyledFilterButton>
              <StyledFilterButton 
                className={filter === 'writings' || filter === '阿弗勒斯的倒影' || filter === '林深之处的回响' ? 'active' : ''}
                onClick={handleWritingsClick}
              >
                Writings
              </StyledFilterButton>
            </StyledFilterContainer>
          )}

          {filter !== null && (
            <>
              <StyledFilterContainer>
                <StyledFilterButton 
                  className={filter === 'painting' ? 'active' : ''}
                  onClick={() => {
                    setFilter('painting');
                    setShowWritingSubcategories(false);
                  }}
                >
                  Paintings
                </StyledFilterButton>
                <StyledFilterButton 
                  className={filter === 'writings' || filter === '阿弗勒斯的倒影' || filter === '林深之处的回响' ? 'active' : ''}
                  onClick={handleWritingsClick}
                >
                  Writings
                </StyledFilterButton>
              </StyledFilterContainer>

              {(filter === 'writings' || filter === '阿弗勒斯的倒影' || filter === '林深之处的回响') && (
                <>
                  <StyledWritingDescription>
                    感谢阅读我的文字，我将他们分为了两类。<br />
                    <b>阿弗勒斯的倒影</b>：你如何凝望世界，你就如何触碰自己。<br />
                    <b>林深之处的回响</b>：你如何凝望自己，你就如何触碰世界。
                  </StyledWritingDescription>
                  <StyledFilterContainer sub>
                    <StyledFilterButton
                      className={`sub${filter === '阿弗勒斯的倒影' ? ' active' : ''}`}
                      onClick={() => handleSubcategoryClick('阿弗勒斯的倒影')}
                    >
                      阿弗勒斯的倒影
                    </StyledFilterButton>
                    <StyledFilterButton
                      className={`sub${filter === '林深之处的回响' ? ' active' : ''}`}
                      onClick={() => handleSubcategoryClick('林深之处的回响')}
                    >
                      林深之处的回响
                    </StyledFilterButton>
                  </StyledFilterContainer>
                </>
              )}

              {(filter === '阿弗勒斯的倒影' || filter === '林深之处的回响' || filter === 'painting') && (
                <>
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
                </>
              )}
            </>
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