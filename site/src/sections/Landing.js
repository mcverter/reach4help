import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Heading, Flex, Box, Image, Link } from 'rebass';
import styled from 'styled-components';
import { SectionLink } from 'react-scroll-section';
import Section from '../components/Section';
import SocialLink from '../components/SocialLink';
import MouseIcon from '../components/MouseIcon';
import Triangle from '../components/Triangle';
import logo from '../images/logo.svg';

const colors = require('../../colors');

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['35vh', '80vh']}
      width={['95vw', '60vw']}
    />

    <Triangle
      color="secondary"
      height={['38vh', '80vh']}
      width={['50vw', '35vw']}
    />

    <Triangle
      color="primaryDark"
      height={['25vh', '35vh']}
      width={['75vw', '60vw']}
      invertX
    />

    <Triangle
      color="backgroundDark"
      height={['20vh', '20vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
);

const ButtonLink = styled(Link)`
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    background-color: ${colors.secondary};
  }
`;

const centerHorizontally = { marginRight: 'auto', marginLeft: 'auto' };

const LandingPage = () => (
  <Section.Container id="home" Background={Background}>
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
              socialLinks {
                fontAwesomeIcon
                id
                name
                url
              }
            }
          }
        }
      `}
      render={({ site }) => {
        const { title, headerDescription, socialLinks } = site.siteMetadata;
        return (
          <Fragment>
            <Image
              src={logo}
              alt="Reach4Help Logo"
              style={centerHorizontally}
              width={['100px', '150px', '200px']}
              mb={[3, 4, 4]}
            />
            <Heading
              textAlign="center"
              as="h1"
              color="primary"
              fontSize={[5, 6, 7]}
              mb={[2, 3, 3]}
            >
              {title}
            </Heading>

            <Heading
              as="h2"
              color="primary"
              fontSize={[3, 4, 5]}
              mb={[2, 3, 3]}
              textAlign="center"
              style={centerHorizontally}
            >
              {headerDescription}
            </Heading>

            <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
              {socialLinks.map(({ id, ...rest }) => (
                <Box mx={3} fontSize={5} key={id}>
                  <SocialLink {...rest} />
                </Box>
              ))}
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
              mt={[2, 3, 3]}
            >
              <ButtonLink
                mx={3}
                backgroundColor="primary"
                color="white"
                className="button"
                fontSize={[2, 3]}
                padding={2}
                href="https://map.reach4help.org"
              >
                View Mutual Aid Map
              </ButtonLink>
              <ButtonLink
                mx={3}
                backgroundColor="primary"
                color="white"
                className="button"
                fontSize={[2, 3]}
                padding={2}
                href="https://github.com/reach4help/reach4help/wiki#onboading-steps"
              >
                Get Involved
              </ButtonLink>
            </Flex>
            <SectionLink section="about">
              {({ onClick }) => <MouseIcon onClick={onClick} />}
            </SectionLink>
          </Fragment>
        );
      }}
    />
  </Section.Container>
);

export default LandingPage;
