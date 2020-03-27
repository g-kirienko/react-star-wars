import React, {Component} from 'react';
import SwapiService from "../../services/swapi-service";
import Spiner from "../spinner";
import PlanetView from "./planet-view";

import './random-planet.css';

export default class RandomPlanet extends Component {
    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true
    };

    constructor() {
        super();
        this.updatePlanet();
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false
        });
    };

    updatePlanet() {
        const id = Math.floor(Math.random() * 25) + 2;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded);
    }

    render() {

        const {planet, loading} = this.state;
        const spinner = loading ? <Spiner/> : null;
        const content = !loading ? <PlanetView planet={planet}/> : null;

        return (
            <div className="random-planet jumbotron rounded">
                {spinner}
                {content}
            </div>
        );
    }
}

