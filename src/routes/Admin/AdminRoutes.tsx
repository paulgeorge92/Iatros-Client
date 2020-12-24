import React, { useState, useContext, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { AdminContext } from '../../contexts/AdminContext';
import { useHistory, useRouteMatch, Switch, Route, Link } from 'react-router-dom';
import { LogoWhiteImage, AdminMenuItems as AdminMenuObj, AdminPath } from '../../constants';
import AdminDashboard from '../../Pages/Admin/Dashboard';
import ErrorPage404 from '../../Pages/Error/404';
import { MenuItem } from '../../models/MenuItem';

const { Header, Content, Sider } = Layout;
let AdminMenuItems = AdminMenuObj.menu;
let AdminRoutes = (props: any) => {
  let { path } = useRouteMatch();
  const history = useHistory();
  let appContext = useContext(AdminContext);
  history.listen((e) => {});
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedWidth, setCollpasedWidth] = useState(0);
  const [contentPadding, setContentPadding] = useState('24px');

  function getMenuIndex(menu: MenuItem[], parentIndex?: string | undefined, subIndex?: string | undefined): string[] | null {
    let currentPath = document.location.pathname.toLowerCase();
    let matchPath = function (path: string): boolean {
      let routepath = path.split('/');
      let currentRoute = currentPath.split('/');
      if (routepath.length === currentRoute.length) {
        let match = true;
        for (let k = 0; k < routepath.length; k++) {
          let _path = routepath[k];
          let _curPath = currentRoute[k];
          if (_path.startsWith(':')) continue;
          if (_path.toLowerCase() !== _curPath.toLowerCase()) {
            return false;
          }
        }
        if (match) {
          return true;
        }
      }
      return false;
    };
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].path && (`${AdminPath}/${menu[i].path}` === currentPath || matchPath(`${AdminPath}/${menu[i].path}`))) {
        let pIndex = '',
          sIndex = '',
          index = '';
        if (parentIndex) {
          pIndex = parentIndex;
          if (subIndex) {
            sIndex = `${parentIndex}-${subIndex}`;
            index = `${parentIndex}-${subIndex}-${menu[i].index.toString()}`;
          } else {
            sIndex = `${parentIndex}-${menu[i].index.toString()}`;
          }
          return [pIndex, sIndex, index];
        } else {
          return [menu[i].index.toString(), ''];
        }
      } else {
        let pIndex = '',
          sIndex = '';
        if (menu[i].subMenu?.length) {
          if (parentIndex) {
            pIndex = parentIndex;
            sIndex = (i + 1).toString();
          } else {
            pIndex = (i + 1).toString();
          }

          if (subIndex) {
            sIndex = subIndex;
          }
          let index = getMenuIndex([...(menu[i].subMenu || [])], pIndex, sIndex);
          if (index) {
            return index;
          }
        }
      }
    }
    return null;
  }

  let getcurrentPathIndex = () => {
    let currentPath = document.location.pathname.toLowerCase();

    if (currentPath === AdminPath) {
      return ['1', '1'];
    }

    let indexes = getMenuIndex(AdminMenuItems, '');
    if (indexes) {
      return indexes;
    }

    return ['1', '1'];
  };

  let toggleSideMenu = () => {
    setCollapsed(!collapsed);
  };

  let onBreakPointHit = (breakPoint: boolean) => {
    setCollpasedWidth(breakPoint ? 0 : 80);
    setContentPadding('40px 24px 24px');
  };

  let onMenuClick = () => {
    if (collapsedWidth === 0) {
      setCollapsed(true);
    }
  };

  let routes: any[] = [];

  let mapRoutes = (items: MenuItem[]) => {
    items.forEach((item: MenuItem) => {
      if (item.component) {
        routes.push(item);
      }
      if (item.subMenu && item.subMenu.length) {
        mapRoutes(item.subMenu);
      }
    });
  };
  mapRoutes(AdminMenuItems);

  let createMenu = (items: MenuItem[], index?: string) => {
    let menu = items.map((item) => {
      return item.showInMenu ? (
        !item.subMenu || item.subMenu.length === 0 || !item.showSubMenu ? (
          <Menu.Item key={`${(index ? index + '-' : '') + item.index}`} icon={item.icon} onClick={onMenuClick}>
            {item.name}
            <Link to={`${path}/${item.path}`}></Link>
          </Menu.Item>
        ) : (
          <Menu.SubMenu key={`${(index ? index + '-' : '') + item.index}`} icon={item.icon} title={item.name}>
            {createMenu(item.subMenu, (index ? index + '-' : '') + item.index)}
          </Menu.SubMenu>
        )
      ) : (
        <></>
      );
    });
    return menu;
  };

  useEffect(() => {
    if (!appContext.context.currentUser.id && !sessionStorage.getItem('userSession')) {
      history.push({
        pathname: `${path}/login`,
        state: { redirectUrl: document.location.pathname.toLowerCase() },
      });
    } else {
      var session = JSON.parse(sessionStorage.getItem('userSession') || '{}');
      if (session.mode === 'admin' && new Date(parseInt(session.expiry) || '0') <= new Date()) {
        history.push({
          pathname: `${path}/login`,
          state: { redirectUrl: document.location.pathname.toLowerCase() },
        });
      }
    }
    return () => {};
    // eslint-disable-next-line
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="site-layout-background" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo">
          <img src={LogoWhiteImage} style={{ height: '50px' }} alt="logo" />
        </div>
      </Header>
      <Layout style={{ marginTop: '64px' }}>
        <Sider breakpoint="lg" collapsedWidth={collapsedWidth} theme="light" collapsible collapsed={collapsed} onCollapse={toggleSideMenu} onBreakpoint={onBreakPointHit}>
          <Menu theme="light" selectedKeys={getcurrentPathIndex()} mode="inline" title="Dashboard">
            {
              createMenu(AdminMenuItems)
              /* AdminMenuItems.map((item) => {
                return item.showInMenu ? (
                  !item.subMenu || item.subMenu.length === 0 || !item.showSubMenu ? (
                    <Menu.Item key={`${item.index}`} icon={item.icon} onClick={onMenuClick}>
                      {item.name}
                      <Link to={`${path}/${item.path}`}></Link>
                    </Menu.Item>
                  ) : (
                    <Menu.SubMenu key={`${item.index}`} icon={item.icon} title={item.name}>
                      {item.subMenu.map((submenu) => {
                        return submenu.showInMenu ? (
                          <Menu.Item key={`${item.index}-${submenu.index}`} onClick={onMenuClick}>
                            {submenu.name}
                            <Link to={`${path}/${submenu.path}`}></Link>
                          </Menu.Item>
                        ) : (
                          <></>
                        );
                      })}
                    </Menu.SubMenu>
                  )
                ) : (
                  <></>
                );
              }) */
            }
          </Menu>
        </Sider>
        <Content className="site-layout-background" style={{ margin: '24px 16px', padding: contentPadding, minHeight: 280 }}>
          <Switch>
            <Route exact path={`${path}`}>
              <AdminDashboard />
            </Route>
            {routes.map((item) => {
              return (
                <Route exact path={`${path}/${item.path}`} key={`routes-${item.index}`}>
                  {item.component}
                </Route>
              );
            })}
            <Route>
              <ErrorPage404 homeUrl={AdminPath} />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminRoutes;
