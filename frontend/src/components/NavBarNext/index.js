import React from 'react';
import { Navbar, Link, Text, Avatar, Dropdown } from '@nextui-org/react';
import { AcmeLogo } from './AcmeLogo.js';

const NavigationBarNext = () => {
  const collapseItems = [
    {
      name: 'Home',
      route: '/',
    },
    // {
    //   name: 'Overview',
    //   route: '/overview',
    // },
    {
      name: 'Communities',
      route: '/communities',
    },
    // {
    //   name: 'Management',
    //   route: '/management',
    // },
    {
      name: 'About us',
      route: '/about',
    },
    {
      name: 'Log Out',
      route: '#',
    },
  ];

  const isActive = (route) => {
    return window.location.pathname === route;
  };

  return (
    <Navbar isBordered variant="fixed">
      <Navbar.Toggle showIn="xs" />
      <Navbar.Brand
        css={{
          '@xs': {
            w: '14%',
          },
        }}
      >
        <AcmeLogo />
        <Text b color="inherit" hideIn="xs">
          Football Stats
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="secondary"
        hideIn="xs"
        variant="highlight-rounded"
      >
        <Navbar.Link isActive={isActive('/')} href="/">
          Home
        </Navbar.Link>
        {/* <Navbar.Link isActive={isActive('/overview')} href="/overview">
          Overview
        </Navbar.Link> */}
        <Navbar.Link isActive={isActive('/communities')} href="/communities">
          Communities
        </Navbar.Link>
        {/* <Navbar.Link isActive={isActive('/management')} href="/management">
          Management
        </Navbar.Link> */}
        <Navbar.Link isActive={isActive('/about')} href="/about">
          About us
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content
        css={{
          '@xs': {
            w: '12%',
            jc: 'flex-end',
          },
        }}
      >
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                color="secondary"
                size="md"
                src={require('../../assets/white-bare-bear.jpg')}
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="secondary"
            onAction={(actionKey) => console.log({ actionKey })}
          >
            <Dropdown.Item key="profile" css={{ height: '$18' }}>
              <Text b color="inherit" css={{ d: 'flex' }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: 'flex' }}>
                zoey@example.com
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              My Settings
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
              Analytics
            </Dropdown.Item>
            <Dropdown.Item key="system">System</Dropdown.Item>
            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
              Help & Feedback
            </Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error">
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={item}
            activeColor="secondary"
            css={{
              color: index === collapseItems.length - 1 ? '$error' : '',
            }}
            isActive={isActive(item.route)}
          >
            <Link
              color="inherit"
              css={{
                minWidth: '100%',
              }}
              href={item.route}
            >
              {item.name}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBarNext;
