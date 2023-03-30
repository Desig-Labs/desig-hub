import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import Banner from 'components/banner'
import BackupShared from './backupShared'

const Home = () => {
  return (
    <Layout>
      <Banner />
      <Content style={{ marginTop: 48 }}>
        <BackupShared />
      </Content>
    </Layout>
  )
}

export default Home
