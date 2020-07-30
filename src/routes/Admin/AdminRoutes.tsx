import React, { useState, useContext, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { AdminContext } from '../../contexts/AdminContext';
import { useHistory, useRouteMatch, Switch, Route, Link } from 'react-router-dom';
import { LogoWhiteImage, AdminMenuItems, AdminPath } from '../../constants';
import AdminDashboard from '../../Pages/Admin/Dashboard';

const { Header, Content, Sider } = Layout;

let AdminRoutes = (props: any) => {
  let { path } = useRouteMatch();
  const history = useHistory();
  let userContext = useContext(AdminContext);

  const [collapsed, setCollapsed] = useState(false);
  const [collapsedWidth, setCollpasedWidth] = useState(0);

  let getcurrentPathIndex = () => {
    let currentPath = document.location.pathname.toLowerCase();
    if (currentPath === AdminPath) {
      return ['1', '1'];
    }
    for (let i = 0; i < AdminMenuItems.length; i++) {
      if (AdminMenuItems[i].path && `${AdminPath}/${AdminMenuItems[i].path}` === currentPath) {
        return [AdminMenuItems[i].index.toString(), AdminMenuItems[i].index.toString()];
      } else if (AdminMenuItems[i].subMenu?.length) {
        let subMenu: any = AdminMenuItems[i].subMenu || [];
        for (let j = 0; j < subMenu.length; j++) {
          if (`${AdminPath}/${subMenu[j].path}` === currentPath) {
            console.log(AdminMenuItems[i].index.toString(), subMenu[j].index.toString());
            return [AdminMenuItems[i].index.toString(), `${AdminMenuItems[i].index.toString()}-${subMenu[j].index.toString()}`];
          }
        }
      }
    }
    return ['1', '1'];
  };

  let toggleSideMenu = () => {
    setCollapsed(!collapsed);
  };

  let onBreakPointHit = (breakPoint: boolean) => {
    setCollpasedWidth(breakPoint ? 0 : 80);
  };

  useEffect(() => {
    if (!userContext.id && !sessionStorage.getItem('userSession')) {
      history.push(`${path}/login`);
    } else {
      var session = JSON.parse(sessionStorage.getItem('userSession') || '{}');
      if (session.mode === 'admin' && new Date(parseInt(session.expiry) || '0') <= new Date()) {
        history.push(`${path}/login`);
      }
    }
  });
  useEffect(() => {
    return () => {
      console.log('cleaned up');
    };
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
          <Menu theme="light" defaultSelectedKeys={[getcurrentPathIndex()[1]]} defaultOpenKeys={[getcurrentPathIndex()[0]]} mode="inline" title="Dashboard">
            {AdminMenuItems.map((item) => {
              return item.showInMenu ? (
                !item.subMenu || item.subMenu.length === 0 ? (
                  <Menu.Item key={item.index} icon={item.icon}>
                    {item.name}
                    <Link to={`${path}/${item.path}`}></Link>
                  </Menu.Item>
                ) : (
                  <Menu.SubMenu key={item.index} icon={item.icon} title={item.name}>
                    {item.subMenu.map((submenu) => {
                      return (
                        <Menu.Item key={`${item.index}-${submenu.index}`}>
                          {submenu.name}
                          <Link to={`${path}/${submenu.path}`}></Link>
                        </Menu.Item>
                      );
                    })}
                  </Menu.SubMenu>
                )
              ) : (
                <></>
              );
            })}
          </Menu>
        </Sider>
        <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
          <Switch>
            <Route exact path={`${path}`}>
              <AdminDashboard />
            </Route>
            {AdminMenuItems.map((item, index) => {
              return !item.subMenu || item.subMenu.length === 0 ? (
                <Route exact path={`${path}/${item.path}`} key={index}>
                  {item.component}
                </Route>
              ) : (
                item.subMenu.map((submenu, subIndex) => {
                  return (
                    <Route exact path={`${path}/${submenu.path}`} key={subIndex}>
                      {submenu.component}
                    </Route>
                  );
                })
              );
            })}
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminRoutes;
