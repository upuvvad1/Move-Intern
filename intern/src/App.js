import React from 'react';
import axios from 'axios';
import './App.css';

class CurrencyRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                pair_symbol: props.data.pair_symbol,
                offer_bigfigure: props.data.offer_bigfigure,
                offer_points: props.data.offer_points,
                change: 'none'
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.offer_points > this.state.data.offer_points) {
            nextProps.data.change = 'UP';
            this.setState({ data: nextProps.data });
        }
        else {
            nextProps.data.change = 'DOWN';
            this.setState({ data: nextProps.data });
        }
    }
    render() {

        var tr_id = '';
        if (this.state.data.change === 'DOWN') {
            tr_id = 'TR_Down';
        }
        else {
            tr_id = 'TR_Up';
        }

        return (
            <tr className={tr_id}>
                <td>
                    {this.state.data.pair_symbol.toString()}
                </td>
                <td>
                    {this.state.data.offer_bigfigure.toString()}
                </td>
                <td id={tr_id}>
                    {this.state.data.offer_points.toString()}
                </td>
                <td>
                    {this.state.data.change.toString()}
                </td>
            </tr>

        );
    }
}

class LoadCurrencyFeed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currencyRecordList: [{
                'pair_symbol': '',
                'timestamp': '',
                'bid_bigfigure': '',
                'bid_points': '',
                'offer_bigfigure': '',
                'offer_points': '',
                'high': '',
                'low': '',
                'open': '',
                'status': ''
            }]
        };
    }


    componentWillUnMount() {
        clearInterval(this.timerID);
    }

    componentDidMount() {
        this.fetchData();
        this.timerID = setInterval(() => this.fetchData(), 20000);
    }

    fetchData() {
        axios.get('http://localhost:4000/getrate')
            .then(resp => {
                this.setState({
                    currencyRecordList: resp.data
                });
            });


    }

    render() {
        return (
            <div>
                <br/><br/><br/><br/><br/><br/>
                <center>
                    <table>
                        <thead>
                            <tr>
                                <th> Currency Pair Symbol </th>
                                <th> Offer Big Figure </th>
                                <th> Offer Points </th>
                                <th> Status </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.currencyRecordList.map(record => <CurrencyRecord key={record.pair_symbol} data={record} />)}
                        </tbody>
                    </table>
                </center>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <LoadCurrencyFeed />
            </div>
        );
    }
}

export default App;