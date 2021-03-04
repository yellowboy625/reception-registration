import React from 'react';
import './clock.css';

class Clock extends React.Component{
    componentDidMount() {
        setInterval(() => {
            this.getTime();
        })
    }
    constructor() {
        super();
        this.state = {
            time: "00:00:00",
        }
    }
    getTime() {
        setInterval(() => {
            let date = new Date();
            let hour = date.getHours();
            let minute = date.getMinutes();
            let seconds = date.getSeconds();
            hour = fullTime(hour);
            minute = fullTime(minute);
            seconds = fullTime(seconds); 
            this.setState({
                time: hour + ":" + minute + ":" + seconds
            });
            function fullTime(n) { return n < 10 ? "0" + n : n }

        }, 1000);
    }
    render() {
        return (
            <div className="container">
                <h3>{this.state.time}</h3>
            </div>
        );
    }
}

export default Clock;