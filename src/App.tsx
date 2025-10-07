import { AimOutlined } from '@ant-design/icons';
import { Avatar, Card, Spin, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

const { Meta } = Card;

interface IdeaItem {
  id: number;
  title: string;
  votes: number;
}

function App() {
  const [messageApi, contextHolder] = message.useMessage();

  const [data, setData] = useState<IdeaItem[]>([]);
  const [loadingVotes, setLoadingVotes] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/ideas`);
        if (res.data.status === 'ok') {
          setData(res.data.data);
        } else {
          throw Error();
        }
      } catch {
        messageApi.error('Не удалось получить идеи.');
      }
    };
    fetchData();
  }, [messageApi]);

  const handleVote = async (id: number) => {
    setLoadingVotes((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await axios.post(`/api/ideas/vote`, {
        ideaId: id,
      });
      if (res.data.status === 'ok') {
        setData((prev) =>
          prev.map((item) => (item.id === id ? { ...item, votes: item.votes + 1 } : item)),
        );
        messageApi.success('Вы проголосовали!');
      } else {
        throw Error(res.data.reason);
      }
    } catch (err) {
      if (err instanceof Error) {
        messageApi.error(err.message);
      } else {
        messageApi.error('Не удалось проголосовать.');
      }
    } finally {
      setLoadingVotes((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (!data.length) return <Spin />;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '16px',
      }}
    >
      {contextHolder}

      {data.map((item) => (
        <Card
          key={item.id}
          style={{
            minWidth: 240,
            maxWidth: 340,
            margin: 16,
            textAlign: 'center',
            paddingTop: 24,
          }}
          actions={[
            <AimOutlined
              key='vote'
              onClick={() => handleVote(item.id)}
              style={{ fontSize: 30, color: loadingVotes[item.id] ? 'gray' : '#1890ff' }}
            />,
          ]}
        >
          <Meta
            avatar={
              <Avatar size={64} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.id}`} />
            }
            title={item.title}
            description={
              <div style={{ marginTop: 8 }}>
                <strong>Голоса: {item.votes}</strong>
              </div>
            }
          />
        </Card>
      ))}
    </div>
  );
}

export default App;
