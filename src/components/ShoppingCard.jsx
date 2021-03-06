import React from 'react';
import PropTypes from 'prop-types';
import styledComponents, { css } from 'styled-components';
import CommerceContext from '../context/CommerceContext';

class ShoppingCard extends React.Component {
  render() {
    const { element } = this.props;
    const { actualCurrency, handleQuantity } = this.context;
    return (
      <CardWrapper>
        <ContentDetails>
          <Name>{ element.name }</Name>
          <Price className="price-tag">
            {
              `${element.prices.find((item) => item.currency.label === actualCurrency).currency.symbol}
                ${(element.prices.find((item) => item.currency.label === actualCurrency).amount).toFixed(2)}`
            }
          </Price>
          <div>
            {
              element.attributes.map((value, ind) => (
                <div key={ ind }>
                  <AttributeTitle>{ value.name.toUpperCase() }: </AttributeTitle>
                    <AttributeList>
                      {
                        value.items.map((items, index) => (
                          <AttributeItems
                            style={{
                              backgroundColor: value.name.toLowerCase() === 'color' && items.value,
                            }}
                            className={
                              (value.name.toLowerCase() === 'color' && Object.values(element.selectedAttribute).includes(items.value))
                              ? 'selected-attribute-color' : 
                              ((Object.values(element.selectedAttribute).includes(items.value)) && 'selected-attribute')
                            }
                            key={ index }
                            name={ items.value }
                            id={ value.id.toLowerCase().split(' ')[value.id.toLowerCase().split(' ').length - 1] }
                            onClick={ this.handleAttributes}
                            >
                            { value.name.toLowerCase() === 'color' ? '' : items.value }
                          </AttributeItems>
                        ))
                      }
                    </AttributeList>
                </div>
              ))
            }
          </div>
        </ContentDetails>
        <QuantityController>
          <Plus
            id="plus"
            value={ element.id }
            onClick={ ({ target }) => handleQuantity(target) }
            className="plus"
          >
            +
          </Plus>
            <Quantity>{ element.quantity }</Quantity>
          <Minus
            id="minus"
            value={ element.id }
            onClick={ ({ target }) => handleQuantity(target) }
            className="minus"
          >
            -
          </Minus>
        </QuantityController>
        <Image name={ element.gallery[0] } />
      </CardWrapper>
    );
  }
}

const CardWrapper = styledComponents.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 220px;
`;

const ContentDetails = styledComponents.section`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 140px
`;

const Name = styledComponents.p`
  align-items: center;
  display: flex;
  color: #1D1F22;
  flex: none;
  flex-grow: 0;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 160%;
  margin: 4px 0px;
  order: 0;
`;

const Price = styledComponents.p`
  color: #1D1F22;
  flex: none;
  flex-grow: 0;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 160%;
  margin: 4px 0px;
  order: 1;
  text-align: left;
`;

const AttributeItems = styledComponents.div`
  align-items: center;
  border: 1px solid #1D1F22;
  color: #1D1F22;
  cursor: pointer;
  display: flex;
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  justify-content: center;
  line-height: 160%;
  margin: 0px 5px;
  padding: 10px 5px;

  ${(props) => {
    switch(props.id) {
      case 'color':
        return css`
          height: 16px;
          width: 20px;
        `;
      default:
        return css`
        height: 28px;
        width: 32px;
        `;
    }
  }} 
`;

const AttributeList = styledComponents.div`
  align-items: center;
  display: flex;
  height: auto;
  width: auto;
`;

const AttributeTitle = styledComponents.div`
  align-items: center;
  color: #1D1F22;
  display: flex;
  flex: none;
  flex-grow: 0;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin: 8px 0px;
  order: 0;
`;

const QuantityController = styledComponents.div`
  padding-left: 5px;
  height: 80%;
`;

const Plus = styledComponents.button`
  align-items: center;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  height: 24px;
  justify-content: center;
  width: 24px;
	outline: inherit;
`;

const Quantity = styledComponents.p`
  bottom: 43.16%;
  color: #1D1F22;
  display: flex;
  flex: none;
  flex-grow: 0;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  justify-content: center;
  left: 33.33%;
  line-height: 160%;
  margin: 50px 0px;
  order: 1;
  position: static;
  right: 33.33%;
  text-align: right;
  top: 43.16%;
`;

const Minus = styledComponents.button`
  align-items: center;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  height: 24px;
  justify-content: center;
  width: 24px;
	outline: inherit;
`;

const Image = styledComponents.div`
  height: inherit;
  margin-left: 5px;
  width: 200px;

  ${(props) => {
    return css`
      background-image: url(${props.name});
      background-size: 100% 100%;
    `
  }}
`;

ShoppingCard.propTypes = {
  element: PropTypes.instanceOf(PropTypes.object),
  prices: PropTypes.instanceOf(PropTypes.object),
}.isRequired;


ShoppingCard.contextType = CommerceContext;
export default ShoppingCard;
