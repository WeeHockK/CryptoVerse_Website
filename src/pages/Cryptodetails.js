import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useGetCryptoInfoQuery, useGetCryptoHistoryQuery } from '../features/CryptoApi';
import { Linechart } from '../components';

const { Title, Text } = Typography;
const { Option } = Select;

function CryptoDetails(){
    const { coinId } = useParams();
    const [timeperiod, setTimeperiod] = useState('7d');
    const { data, error, isLoading} = useGetCryptoInfoQuery(coinId);
    console.log(timeperiod);
    const { data:coinHistory} = useGetCryptoHistoryQuery({coinId, timeperiod});
    const cryptoDetails = data?.data?.coin;
    if(isLoading) return (<div>Loading...</div>);
    
    const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Approved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

    return(
        <Col className='coin-detail-container'>
            <Col className='coin-heading-container'>
                <Title level={2} className='coin-name'>
                    {cryptoDetails.name}({cryptoDetails.symbol}) Price
                </Title>
                <p>
                    {cryptoDetails.name} live price in USD.
                    View value statistices, market cap and supply.
                </p>
            </Col>
            <Select 
                defaultValue='7d' 
                className='select-timeperiod' 
                placeholder='Select Time Period'
                onChange={(value) => setTimeperiod(value)}
            >
                {time.map((date)=> 
                    <Option key={date}>
                        {date}
                    </Option>
                )}
            </Select >
            {<Linechart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name}/>}
            <Col className='stats-container'>
                <Col className='coin-value-statistics'>
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Title>
                        <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    </Col>
                    {stats.map(({ icon, title, value }) => (
                        <Col className="coin-stats">
                        <Col className="coin-stats-name">
                            <Text>{icon}</Text>
                            <Text>{title}</Text>
                        </Col>
                        <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col className="other-stats-info">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">Other Stats Info</Title>
                        <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    </Col>
                    {genericStats.map(({ icon, title, value }) => (
                        <Col className="coin-stats">
                        <Col className="coin-stats-name">
                            <Text>{icon}</Text>
                            <Text>{title}</Text>
                        </Col>
                        <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className="coin-desc-link">
                <Col className="coin-links">
                    <Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
                    {cryptoDetails.links?.map((link) => (
                        <Row className="coin-link" key={link.name}>
                        <Title level={5} className="link-name">{link.type}</Title>
                        <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    )
}

export default CryptoDetails;