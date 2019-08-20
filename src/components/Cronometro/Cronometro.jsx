import React from "react";
import Button from "components/CustomButtons/Button.jsx";

class Cronometro extends React.Component {
  state = {
    isMarch: false
  };

  componentDidMount() {}
  start() {
    if (this.state.isMarch === false) {
      //var timeInicial = new Date();
      var control = setInterval(this.chronometer, 10);
      this.setState({
        isMarch: true
      });
    }
  }
  chronometer() {
    var timeActual = new Date();
    var timeInicial = new Date();
    var acumularTime = timeActual - timeInicial;
    var acumularTime2 = new Date();

    acumularTime2.setTime(acumularTime - 1);

    var cc = Math.round(acumularTime2.getMilliseconds() / 10);
    var ss = acumularTime2.getSeconds();
    var mm = acumularTime2.getMinutes();
    var hh = acumularTime2.getHours() - 1;

    if (cc < 10) {
      cc = "0" + cc;
    }
    if (ss < 10) {
      ss = "0" + ss;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (hh < 10) {
      hh = "0" + hh;
    }
    //pantalla.innerHTML = hh + " : " + mm + " : " + ss + " : " + cc;
  }

  stop() {
    if (this.state.isMarch === true) {
      clearInterval(this.control);
      this.setState({ isMarch: false });
    }
  }

  /*   resume() {
    if (this.state.isMarch == false) {
      this.setState({
        timeActu2: this.state.timeActu2.getTime(),
        acumularResume: this.state.timeActu2 - this.state.acumularTime
      });

      this.state.timeInicial.setTime(this.state.acumularResume);
      this.setState({
        control: setInterval(this.chronometer, 10),
        isMarch: true
      });
    }
  } */

  reset() {
    if (this.state.isMarch === true) {
      clearInterval(this.control);
      this.setState({
        isMarch: false
      });
      var acumularTime = 0;
    }

    //pantalla.innerHTML = "00 : 00 : 00 : 00";
  }

  render() {
    if (this.state.loading === true) {
      return "Loading!";
    }
    if (this.state.error) {
      //return "Error!";
    }

    return (
      <div className="chronometer">
        <div id="screen">00 : 00 : 00 : 00</div>
        <div className="buttons">
          <Button color="primary" round onClick={() => this.start()}>
            START &#9658;
          </Button>
          <Button color="primary" round onClick={() => this.stop()}>
            STOP &#8718;
          </Button>
        </div>
      </div>
    );
  }
}
export default Cronometro;
