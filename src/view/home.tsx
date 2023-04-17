import { Layout, Tabs } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import Banner from 'components/system/banner'
import Backup from './backupShare'
import Recovery from './recovery'

const Home = () => {
  return (
    <Layout>
      <Banner />
      <Content style={{ marginTop: 48 }}>
        <Tabs
          type="card"
          items={[
            {
              label: 'Backup',
              key: 'Backup',
              children: <Backup />,
            },
            {
              label: 'Recovery',
              key: 'Recovery',
              children: <Recovery />,
            },
          ]}
        />
      </Content>
    </Layout>
  )
}

export default Home
