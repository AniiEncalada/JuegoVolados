class RowRentedDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
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
                    <td>{row.show && row.year}</td>
                    <td>{row.car == 1 && row.day}</td>
                    <td>{row.car}</td>
                    <td>{row.random}</td>
                    <td>{row.numberDays}</td>
                </tr> : null
        )
    }
}