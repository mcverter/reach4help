import { Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  CreateOfferLocationUrl,
  CreateRequestLocationUrl,
} from 'src/modules/create/constants';
import {
  AboutPageLocation,
  HomePageLocation,
} from 'src/modules/landing-page/constants';
import {
  MyOfferPostsLocationUrl,
  MyRequestPostsLocationUrl,
} from 'src/modules/myRequests/constants';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

import { LanguageSelector } from '../SideBottomMenu/LanguageSelector';

const SideMenuLink: React.FC<{
  key: string;
  title: string;
  path: string;
  onClick: () => void;
}> = ({ key, title, path, onClick, ...other }) => (
  <Link to={path} onClick={onClick}>
    <StyledMenuItem key={key} {...other}>
      {title}
    </StyledMenuItem>
  </Link>
);
const { SubMenu } = Menu;

const SideTopMenu: React.FC<{
  closeDrawer: () => void;
  isLoggedIn: boolean;
}> = ({ closeDrawer, isLoggedIn }) => {
  const { t } = useTranslation();

  const SideTopMenuStyle = styled('div')`
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    margin-left: 2rem;

    .ant-menu {
      background: ${COLORS.white};
      font-weight: bold;

      .ant-menu-item {
        color: #000;
        &:after {
          display: none;
        }
        &:hover {
          color: #7f7f7f;
        }
        &:active {
          color: #eb7100;
        }
      }
      .ant-menu-submenu {
        .ant-menu-submenu-title {
          width: 200px;
          font-size: 24px;
          font-weight: 700;
          color: inherit;
        }
        .ant-menu-sub {
          background-color: inherit;
        }
      }

      a,
      .ant-menu-item-only-child {
        color: inherit;
      }

      a .ant-menu-item-selected {
        color: white;
        background: ${COLORS.link} !important;
      }
    }
  `;

  const StyledMenu = styled(Menu)`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    bottom: 5%;
    transition: 1s ease all;
  `;

  return (
    <SideTopMenuStyle>
      <StyledMenu mode="inline">
        <SideMenuLink
          key="Home"
          title="Home"
          path={HomePageLocation.path}
          onClick={closeDrawer}
        />
        <SideMenuLink
          key="HelpRequests"
          title="Help Requests"
          path={MyOfferPostsLocationUrl}
          onClick={closeDrawer}
        />
        <SideMenuLink
          key="VolunteerOffers"
          title="Volunteer Offers"
          path={MyOfferPostsLocationUrl}
          onClick={closeDrawer}
        />

        <SubMenu title="Create New">
          <Menu.Item>
            <StyledLink to={CreateRequestLocationUrl}>
              {t('navbar.create_new.options.request')}
            </StyledLink>
          </Menu.Item>
          <Menu.Item>
            <StyledLink to={CreateOfferLocationUrl}>
              {t('navbar.create_new.options.offer')}
            </StyledLink>
          </Menu.Item>
        </SubMenu>

        {isLoggedIn && (
          <SideMenuLink
            key="MyRequests"
            title="My Requests"
            path={MyRequestPostsLocationUrl}
            onClick={closeDrawer}
          />
        )}

        {isLoggedIn && (
          <SideMenuLink
            key="MyOffers"
            title="My Offers"
            path={MyOfferPostsLocationUrl}
            onClick={closeDrawer}
          />
        )}

        {!isLoggedIn ? (
          <SideMenuLink
            key="AboutUs"
            title="About Us"
            path={AboutPageLocation.path}
            onClick={closeDrawer}
          />
        ) : (
          <SideMenuLink
            key="AboutUs"
            title="About Us"
            path={AboutPageLocation.path}
            onClick={closeDrawer}
          />
        )}
        <LanguageSelectorContainer>
          <LanguageSelector />
        </LanguageSelectorContainer>
      </StyledMenu>
    </SideTopMenuStyle>
  );
};

const StyledMenuItem = styled(Menu.Item)`
  font-size: 24px;
  font-weight: 700;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: 500;
  font-size: 16px;
  position: relative;

  :hover {
    color: ${COLORS.primaryOrange};
  }
`;

const LanguageSelectorContainer = styled.div`
  display: flex;
  position: relative;
  margin-left: 4rem;
  & {
    color: green;
  }
`;

export default SideTopMenu;
