import { Component, SyntheticEvent } from "react";
import { DataService } from "../../services/DataService";

interface CustomEvent {
    target: HTMLInputElement
}
export interface ICreateCardState {
    name?: string,
    location?: string,
    description?: string,
    photoURL?: string,
    photo?: File
}
interface ICreateCardProps {
    dataService: DataService
}

export class CreateCard extends Component<ICreateCardProps, ICreateCardState> {

    state: ICreateCardState = {
        name:'',
        description:'',
        location: '',
        photoURL: ''
    }

    private setName(event: CustomEvent) {
        this.setState({ name: event.target.value });
    }
    private setLocation(event: CustomEvent) {
        this.setState({ location: event.target.value });
    }
    private setDescription(event: CustomEvent) {
        this.setState({ description: event.target.value });
    }

    private setPhotoUrl(event: CustomEvent) {
        if (event.target.files && event.target.files[0]) {
            this.setState({ photo: event.target.files[0] });
        }
    }

    private async handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        const stateClone = {...this.state};
        try {
            const id = await this.props.dataService.createCard(stateClone);
            alert(`created card with id ${id}`);
        } catch (error) {
            alert(`Error while creating card:  ${(error as any).message}`);
            console.error(error)
        }

    }

    render() {
            let photoCard;
            if (this.state.photo) {
                const localPhotoURL = URL.createObjectURL(this.state.photo)
                photoCard = <img alt='' src={localPhotoURL} />
            } else {
                photoCard = <div></div>
            }
            return <form onSubmit={e => this.handleSubmit(e)}>
                <label>Name:<br />
                    <input name='card name' value={this.state.name} onChange={e => this.setName(e)} />
                </label><br />
                <label>Location:<br />
                    <input name='card location' value={this.state.location} onChange={e => this.setLocation(e)} />
                </label><br />
                <label>Description:<br />
                    <input name='card location' value={this.state.description} onChange={e => this.setDescription(e)} />
                </label><br />
                <label>Photo:<br />
                    <input name='photo' type='file' onChange={e => this.setPhotoUrl(e)} />
                </label><br />
                {photoCard}<br />
                <input data-test="submit-button" type="submit" value="Create card" />
            </form>
    }

}
