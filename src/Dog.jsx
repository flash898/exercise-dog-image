import React from 'react';

class Dog extends React.Component {
  constructor() {
    super();

    this.state = {
      dogObj: undefined,
      loading: true,
      storedDog: [],
    }

    this.saveDog = this.saveDog.bind(this);
    this.renderDogElement = this.renderDogElement.bind(this);
  }

  async fetchDog() {
    this.setState(
      { loading: true },
      async () => {
        const requestApi = await fetch('https://dog.ceo/api/breeds/image/random');
        const requestObj = await requestApi.json();
        this.setState({
          loading: false,
          dogObj: requestObj,
        })
      }
    )
  }

  componentDidMount() {
    this.fetchDog();
  }

  saveDog() {
    this.setState(({ storedDog, dogObj }) => ({
      storedDog: [...storedDog, dogObj],
    }))

    this.fetchDog();
  }

  renderDogElement() {
    return (
      <div>
        <img src={this.state.dogObj.message} alt="dog" />
        <button type="button" onClick={this.saveDog}>
          Mostrar Doguinho!
        </button>
      </div>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <p>{loading ? <span>Loading..</span> : this.renderDogElement()}</p>
      </div>
    );
  }
}

export default Dog