import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { Outlet } from 'react-router';

export const AppLayout = () => {
  return (
    <Layout
      style={{
        width: '100%',
      }}>
      <Header>Header</Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};
