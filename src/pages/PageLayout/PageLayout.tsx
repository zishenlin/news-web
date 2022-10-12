import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
	LaptopOutlined,
	NotificationOutlined,
	UserOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import { Row, Col, Breadcrumb, Layout, Menu, Input, Card } from 'antd';
import api from '@api/api';
import './PageLayout.less';

const { Header, Content, Sider, Footer } = Layout;
const { Meta } = Card;

const menuItems = [
	{ label: '熱門', key: 'hot', icon: <SearchOutlined /> },
	{ label: '台灣', key: 'taiwan', icon: <LaptopOutlined /> },
	{ label: '中國', key: 'china', icon: <NotificationOutlined /> },
	{ label: '全球', key: 'global', icon: <UserOutlined /> },
	{ label: '娛樂', key: 'entertainment', icon: <SearchOutlined /> },
	{ label: '商業', key: 'business', icon: <SearchOutlined /> },
	{ label: '運動', key: 'sports', icon: <SearchOutlined /> },
	{ label: '科技', key: 'technology', icon: <SearchOutlined /> },
];

interface Route {
	key: string;
	name: string;
}

interface News {
	source: { id: null | number; name: string };
	author: string;
	title: string;
	description: string;
	url: string;
	urlToImage: string;
	publishedAt: string;
	content: string;
}

function PageLayout() {
	const [searchParams, setSearchParams] = useSearchParams();

	const [currentRoute, setCurrentRoute] = useState({} as Route);
	const [newsData, setNewsData] = useState([] as News[]);

	const getNews = async () => {
		const res = await api.post(
			'https://newsapi.org/v2/top-headlines?country=tw&apiKey=6267ac9d385a400f8c539f3e1a1e9a64'
		);

		setNewsData(res?.data?.articles);
	};

	useEffect(() => {
		const route = searchParams.get('route') ?? 'hot';
		setCurrentRoute({
			name: menuItems.filter((i) => i.key === route)[0].label,
			key: route,
		});
		//getNews();
	}, []);

	useEffect(() => {
		setSearchParams({ route: currentRoute.key });
	}, [currentRoute, setSearchParams]);

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header className="header">
				<div className="logo" />
				<div className="search">
					<Input
						placeholder="input search text"
						allowClear
						style={{ width: 200 }}
					/>
				</div>
			</Header>
			<Layout>
				<Sider width={200} className="site-layout-background" theme="light">
					<Menu
						mode="inline"
						selectedKeys={[currentRoute.key]}
						style={{ height: '100%' }}
						items={menuItems}
						onClick={({ item, key, keyPath, domEvent }) => {
							console.log(item, key, keyPath, domEvent);
							setCurrentRoute({
								key,
								name: menuItems.filter((i) => i.key === key)[0].label,
							});
						}}
					/>
				</Sider>
				<Layout style={{ padding: '0 24px 24px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>News</Breadcrumb.Item>
						<Breadcrumb.Item>{currentRoute.name}</Breadcrumb.Item>
					</Breadcrumb>
					<Content
						className="site-layout-background"
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
							height: 'calc(100vh - 220px)',
							overflowX: 'hidden',
							overflowY: 'auto',
						}}
					>
						<h2>{currentRoute.name}</h2>
						<Row>
							{newsData.map((item, idx) => {
								return (
									<Col span={8} key={idx}>
										<a href={item.url} target="_blank" rel="noreferrer">
											<Card
												hoverable
												style={{ width: '90%', marginBottom: 20 }}
												cover={
													<img alt="image" src={item.urlToImage} height="200" />
												}
											>
												<Meta
													title={item.title}
													description={item.publishedAt}
												/>
											</Card>
										</a>
									</Col>
								);
							})}
						</Row>
					</Content>
				</Layout>
			</Layout>
			<Footer>
				<Row>
					<Col flex="1 1 200px">
						<Row justify="start">
							<Col span={2}>隱私權</Col>
							<Col span={2}>法律聲明</Col>
							<Col span={2}>關於</Col>
							<Col span={2}>說明</Col>
							<Col span={2}>意見反饋</Col>
						</Row>
					</Col>
					<Col
						flex="0 1 300px"
						style={{
							textAlign: 'right',
						}}
					>
						2021 Microsoft
					</Col>
				</Row>
			</Footer>
		</Layout>
	);
}

export default PageLayout;
