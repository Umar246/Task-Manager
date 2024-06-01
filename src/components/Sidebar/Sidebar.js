import React, { useState } from 'react';
import Routes from '../../pages/Admin/Routes';
import { MdAssignment } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Link } from 'react-router-dom';
import { FaTasks, FaUserFriends } from 'react-icons/fa';




const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    // Layout 1 (Parent Layout, 2sra layout bhi is k andr hai): Sidebar + Sidebar Menu + Logout Button
    <Layout >

      {/* Sider means sidebar */}
      <Sider trigger={null} collapsible collapsed={collapsed} theme="" className='bg-secondary '>
        <div className="demo-logo-vertical mt-3 " />
        <div className="d-flex flex-column vh-100"  >
          <div>
            <h5 className="px-3 text-black">Menu</h5>
            <h6 className="px-3 text-black mt-4 mb-0">Task</h6>
            <Menu
              className='bg-secondary text-white'
              style={{ marginTop: '10px', marginBottom: '0px' }}
              mode="inline"
              defaultSelectedKeys={['1']}

              items={[
                {
                  key: '1',
                  icon: <FaTasks style={{ color: '#000000' }} />,
                  label: <Link to={'/admin'} style={{ textDecoration: 'none', color: '#000000' }}> <span className='d-none d-md-inline '>Tasks</span> </Link>,
                },
                {
                  key: '2',
                  icon: <FaUserFriends style={{ color: '#000000' }} />,
                  label: <Link to={'/admin/users'} style={{ textDecoration: 'none', color: '#000000' }}> <span className='d-none d-md-inline ' >Users</span> </Link>,
                },
               

              ]}
            />
          </div>



          {/* Logout Button Custom */}
          <div className="mb-2 mt-auto text-center " >

            <Link to={'/auth/login'} className="shadow-lg btn btn-danger text-white w-75  mb-3">
              <CiLogout /> <span className='d-none d-md-inline'>{collapsed === false && "Logout"}</span>
            </Link>
          </div>


        </div>


      </Sider>

      {/* Layout 2: Header + Collapse Button + Content */}
      <Layout >
        <Header
          style={{
            padding: 0,
            backgroundColor: '#A1DDFF',
            color: '#000',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '30px',
              width: 64,
              height: 64,
              color: 'black',
            }}
          />


        </Header>
       

        <Content
          style={{
            overflow: 'scroll',
            height: 280,
            background: '#FAFAFA',

          }}
        >
         

              <Routes />
          
        </Content>
      </Layout>
    </Layout>
  );
};
export default Sidebar;