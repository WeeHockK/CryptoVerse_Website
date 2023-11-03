import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import 'chartjs-adapter-date-fns';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
  );

const { Title : AntTitle  } = Typography;

function Linechart({ coinHistory, currentPrice, coinName}){
    console.log(coinHistory);
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString('en-US'));
      }
    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            },
        ],
    };

    const options = {
        scales: {
            y: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
    return(
        <>
            <Row className='chart-header'>
                <AntTitle level={2} className='chart-title'>
                    {coinName} Price Chart
                </AntTitle>
                <Col className='price-container'>
                    <AntTitle level={5} className='price-change'>
                        {coinHistory?.data?.change}%
                    </AntTitle>
                    <AntTitle level={5} className='current-price'>
                        Current {coinName} Price: $ {currentPrice}
                    </AntTitle>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    )
}

export default Linechart;