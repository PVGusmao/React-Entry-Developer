import React from 'react';
import PropTypes from "prop-types";
import DetailCard from '../components/DetailCard';
import styledComponents from 'styled-components';
import CommerceContext from '../context/CommerceContext';
import Header from '../components/Header';

class ProductDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      details: [],
    }
  }

  componentDidMount() {
    const { location: { state } } = this.props;
    this.setState({
      details: state,
    })
  }

  render() {
    const { details } = this.state;
    const { showModal, handleModal } = this.context;
    return (
      <>
        <Header props={this.props} />
        {
          showModal && (<Shadow onClick={ handleModal } />)
        }
        <DetailCard details={ details } />
      </>
    );
  }
}

const Shadow = styledComponents.div`
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 1;
`;

ProductDetail.propTypes = {
  state: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

ProductDetail.contextType = CommerceContext;
export default ProductDetail;
