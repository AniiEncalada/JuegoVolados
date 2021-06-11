function redondear(number, decimals) {
    return number.toFixed(decimals);
}

class RowDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    drawCars(number) {
        var images = [];
        for (let i = 0; i < number; i++) {
            images.push(<img className="car" key={i} src="../images/car.gif" alt="car" />);
        }
        return images;
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ show: true });
        }, this.props.delay)
    }

    render() {
        const { row } = this.props
        const { show } = this.state
        return (
            show ?
                <tr>
                    <td>{row.day == 1 && row.year}</td>
                    <td>{row.day}</td>
                    <td>{this.drawCars(row.cars)}</td>
                    <td>{row.random}</td>
                    <td>{row.solicited}</td>
                    <td>${redondear(row.win, 2)}</td>
                    <td>${redondear(row.lost, 2)}</td>
                    <td>${redondear(row.lazy, 2)}</td>
                    <td><b>${redondear(row.net, 2)}</b></td>
                </tr> : null
        )
    }
}