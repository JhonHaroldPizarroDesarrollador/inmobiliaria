import React from "react";
import ReactDOM from "react-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import Tareas from "components/Tareas/Tareas.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { realpathSync } from "fs";

import api from '../../api'

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class TareasList extends React.Component {
  
  state={
    classes: this.props,
    loading: true,
    error: null,
    data: {
      info: {},
      results: []
    },
    data2: undefined,
    nextPage: 1,
    tableHeaderColor: "primary"
  };

  componentDidMount() {
    this.fetchCharacters()
    //this.fetData()
  }

  fetData = async () => {
    this.setState({
      loading: true,
      error: null
    })
    try {
      const data2 = await api.tareas.list();
      this.setState({
        loading: false,
        data2: data2,
      })
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      })
    }
  }

  fetchCharacters = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/`
      );
      const data = await response.json();

      this.setState({
        loading: false,
        data: {
          info: data.info,
          results: [].concat(data.results)
        },
        nextPage: this.state.nextPage + 1,
        classes: [this.props]
      });
      
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    
    if (this.state.loading === true) {
      return "Loading!";
    }
    if (this.state.error) {
      //return "Error!";
    }

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card >
            <CardHeader  color="primary">
              <h4 className={this.state.classes.cardTitleWhite}>
                Paquetes de Trabajo
              </h4>
              <p className={this.state.classes.cardCategoryWhite}>
                Actualmente estás trackeando :
              </p>
            </CardHeader>
            <CardBody>
              <div className={this.state.classes.tableResponsive}>
                <Tareas
                  tableHeaderColor="primary"
                  tableHead={["No", "ID", "Proyecto", "Tarea", "Fecha Limite", "Falta", "Comentario", "play/pausa/stop"]}
                  tableData={
                    this.state.data.results.map((element) => {
                      return (
                        element
                      )
                    })
                  }
                />
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

TareasList.propTypes = {
classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  //tableData: PropTypes.arrayOf(PropTypes.string),
  character: PropTypes.object
};

//export default TareasList;
export default withStyles(styles)(TareasList);
