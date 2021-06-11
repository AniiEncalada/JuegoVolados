'use strict'

var initDays = 0;
var initYears = 0;
var initCars = 0;
var initTariff = 0;
var initLazy = 0;
var initUnavailable = 0;
var daysToReturn = [];
var netG=0;

class Principal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            init: true,
            days: 0,
            years: 0,
            cars: 0,
            tariff: 0,
            lazy: 0,
            unavailable: 0,
            arrayDays: [],
            arrayRentedDays: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.start = this.start.bind(this);
        this.getDays = this.getDays.bind(this);
    }

    start(e) {
        e.preventDefault();
        const { years, days, cars, tariff, lazy, unavailable } = this.state;
        initYears = parseInt(years);
        initDays = parseInt(days);
        initCars = parseInt(cars);
        initTariff = parseInt(tariff);
        initLazy = parseInt(lazy);
        initUnavailable = parseInt(unavailable);
        this.setState({ init: false });
        this.getDays();
    }

    getDays() {
        var arrayDays = [];
        for (let i = 1; i <= initYears; i++) {
            daysToReturn = [];
            const { cars } = this.state;
            initCars = parseInt(cars);
            for (let j = 1; j <= initDays; j++) {
                initCars += this.countDays(j);
                var random = Math.random().toFixed(5);
                var solicited = this.compareCars(random);
                var carsAvailable = (solicited <= initCars) ? solicited : initCars;
                this.getRentedDays(carsAvailable, j, i);
                var win = carsAvailable * initTariff;
                var lost = (solicited > carsAvailable) ? (solicited - carsAvailable) * initUnavailable : 0;
                var lazy = initCars * initLazy;
                var net = win - lost - lazy;
                netG += net;
                arrayDays.push({
                    year: i,
                    day: j,
                    cars: initCars,
                    random,
                    solicited,
                    win,
                    lost,
                    lazy,
                    net
                });
            }
        }
        netG /=initDays*initYears;
        this.setState({ arrayDays });
    }

    getRentedDays(carsAvailable, day, year) {
        const { arrayRentedDays } = this.state;
        for (let i = 0; i < carsAvailable; i++) {
            var random = Math.random().toFixed(5);
            var numberDays = this.compareDays(random);
            daysToReturn.push((numberDays + day));
            arrayRentedDays.push({
                year,
                show: i == 0 && day == 1 ? true : false,
                day,
                carsAvailable,
                car: i + 1,
                random,
                numberDays
            });
        }
        initCars = initCars - carsAvailable;
        this.setState({ arrayRentedDays });
    }

    countDays(day) {
        var count = 0;
        for (var i = 0; i < daysToReturn.length; ++i) {
            if (daysToReturn[i] == day)
                count++;
        }
        return count;
    }

    compareCars(random) {
        var requestedCars = 0;
        if (random < 0.1)
            return requestedCars;
        if (random < 0.2)
            return requestedCars = 1;
        if (random < 0.45)
            return requestedCars = 2;
        if (random < 0.75)
            return requestedCars = 3;
        if (random < 1)
            return requestedCars = 4;
    }

    compareDays(random) {
        var rentedDays = 1;
        if (random < 0.4)
            return rentedDays;
        if (random < 0.75)
            return rentedDays = 2;
        if (random < 0.90)
            return rentedDays = 3;
        if (random < 1)
            return rentedDays = 4;
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    componentDidMount() {

    }

    render() {
        const { init, arrayDays, arrayRentedDays, cars } = this.state;

        if (init) {
            return (
                <div className="row">
                    <div className="col-md-10 my-3 mx-auto">
                        <div className="card">
                            <div className="card-header">
                                <small><b>Ingreso de datos</b></small>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.start}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="days">Días</label>
                                            <input type="text" className="form-control"
                                                id="days" name="days" placeholder="Ingrese el número de días del año"
                                                onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="years">Años</label>
                                            <input type="text" className="form-control"
                                                id="years" name="years" placeholder="Ingrese el número de Años"
                                                onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="tariff">Tarifa</label>
                                            <input type="text" className="form-control"
                                                id="tariff" name="tariff" placeholder="Ingrese el valor de la tarifa"
                                                onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="cars">Autos vagos</label>
                                            <input type="text" className="form-control"
                                                id="lazy" name="lazy" placeholder="Ingrese el valor por autos vagos"
                                                onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="lazy">Autos no disponibles</label>
                                            <input type="text" className="form-control"
                                                id="unavailable" name="unavailable" placeholder="Ingrese el valor por autos no disponibles"
                                                onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="cars">Autos</label>
                                            <input type="text" className="form-control"
                                                id="cars" name="cars" placeholder="Ingrese el número de autos"
                                                onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <input type="submit" className="btn btn-secondary btn-sm" value="Iniciar" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10 my-3 mx-auto">
                        <p className="text-center"><b>Número inicial de autos:</b> {cars}</p>
                        <p className="text-center"><b>Ganancia neta del ejercicio:</b> ${netG.toFixed(2)}</p>
                        <button className="btn btn-sm btn-secondary" onClick={()=>this.setState({init: true})}>Volver</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 my-3 mx-auto">
                        <table className="table table-secondary">
                            <thead>
                                <tr>
                                    <th>N° Año</th>
                                    <th>N° Día</th>
                                    <th>Autos Disponibles</th>
                                    <th>Pseudoaleatorio</th>
                                    <th>Autos Solicitados</th>
                                    <th>Ganancias por día</th>
                                    <th>Pérdidas por día</th>
                                    <th>Costo por autos ociosos</th>
                                    <th>Ganancia Neta</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arrayDays.map((item, index) => {
                                        return <RowDay delay={(index + 1) * 1000 }
                                            key={index} row={item} />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 my-3 mx-auto">
                        <table className="table table-secondary">
                            <thead>
                                <tr>
                                    <th>N° Año</th>
                                    <th>N° Día</th>
                                    <th>N° Auto</th>
                                    <th>Pseudoaleatorio</th>
                                    <th>Días Rentados</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arrayRentedDays.map((item, index) => {
                                        return <RowRentedDay delay={((item.day * 1500) + (1500 / item.carsAvailable))}
                                            key={index} row={item} />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const domElement = document.getElementById('principal');
ReactDOM.render(<Principal />, domElement);