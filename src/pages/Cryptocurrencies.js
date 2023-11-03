import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input} from 'antd';
import { useGetCryptoQuery } from "../features/CryptoApi";
import { useEffect, useState } from "react";

function Cryptocurrencies({simplified}){
    const count = simplified ? 10 : 100;
    const { data : cryptoList, error, isLoading} = useGetCryptoQuery(count);
    const [crypto, setCrypto] = useState(cryptoList?.data?.coins);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setCrypto(cryptoList?.data?.coins);
        const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm));
        setCrypto(filteredData);
    }, [cryptoList, searchTerm])

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return(
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input placeholder="Search" onChange={(e)=> setSearchTerm(e.target.value)}/>
                </div>
            )}
            <Row gutter={[32,32]} className="crypto-card-container">
                {crypto?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
                        {console.log("Id is" + currency.uuid)}
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card 
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className="crypto-image" src={currency.iconUrl} alt="logo"/>}
                                hoverable
                            >
                                <p>Price : {millify(currency.price)}</p>
                                <p>Market Cap : {millify(currency.marketCap)}</p>
                                <p>Daily Change : {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies;