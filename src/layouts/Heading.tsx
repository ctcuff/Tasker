import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';

const SubTitle = styled.div`
  align-self: flex-end;
  margin-left: 12px;
  color: #6c757d;
`;

const Header = styled.header`
  display: flex;
  padding: 18px;
`;

const StyledHeading = styled.h1`
  margin: 0;
  cursor: pointer;
`;

type HeadingProps = {
  children: any | any[];
  className?: string;
  subtext?: string;
};

const Heading = ({ children, className, subtext }: HeadingProps) => (
  <div className={className}>
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={({ site: { siteMetadata } }) => (
        <div>
          <Helmet>
            <title>{siteMetadata.title}</title>
          </Helmet>
          <Header>
            <StyledHeading onClick={() => (window.location.href = '/')}>
              {siteMetadata.title}
            </StyledHeading>
            {subtext && <SubTitle>{subtext}</SubTitle>}
          </Header>
        </div>
      )}
    />
    {children}
  </div>
);

export default Heading;
