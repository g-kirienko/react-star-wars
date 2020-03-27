import React, {Component} from 'react';
import SwapiService from "../../services/swapi-service";
import Spiner from "../spinner";
import ErrorIndicator from "../error-indicator";
import PersonView from "./person-view";

import './person-details.css';

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null,
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if(this.props.personId != prevProps.personId){
            this.updatePerson();
        }
    }

    onPersonLoaded = (person) => {
        this.setState({
            person,
            loading: false
        });
    };

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        });
    };

    updatePerson(){
        const { personId } = this.props;
        if(!personId){
            return;
        }

        this.swapiService
            .getPerson(personId)
            .then(this.onPersonLoaded)
            .catch(this.onError);
    }



    render() {
        if(!this.state.person){
            return  <span>Select a person from a list</span>
        }

        const {person, loading, error} = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spiner/> : null;
        const content = hasData ? <PersonView person={person}/> : null;


        return (
            <div className="person-details card">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}
