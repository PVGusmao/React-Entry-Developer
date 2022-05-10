import React from "react";
import styledComponents, { css } from "styled-components";
import CommerceContext from "../context/CommerceContext";
import backButton from "../images/backButton.svg";
import forwardButton from "../images/forwardButton.svg";

class CardList extends React.Component {
  render() {
    const { element } = this.props;
    const { actualCurrency, handleQuantity } = this.context;
    return (
      <>
        <ContentDetails>
        <Name>{element.name}</Name>
        <Brand>{element.brand}</Brand>
        <Price className="price-tag">
          {`${
            element.prices.find(
              (item) => item.currency.label === actualCurrency
            ).currency.symbol
          }
              ${(
                element.prices.find(
                  (item) => item.currency.label === actualCurrency
                ).amount * element.quantity
              ).toFixed(2)}`}
        </Price>
        <div>
          {element.attributes.map((value, ind) => (
            <div key={ind}>
              <AttributeTit>{value.name.toUpperCase()}: </AttributeTit>
              <AttributeList>
                {value.items.map((items, index) => (
                  <AttributeItems
                    style={{
                      backgroundColor:
                        value.name.toLowerCase() === "color" && items.value,
                    }}
                    className={
                      value.name.toLowerCase() === "color" &&
                      Object.values(element.selectedAttribute).includes(
                        items.value
                      )
                        ? "selected-attribute-color"
                        : Object.values(element.selectedAttribute).includes(
                            items.value
                          ) && "selected-attribute"
                    }
                    key={index}
                    name={items.value}
                    id={
                      value.id.toLowerCase().split(" ")[
                        value.id.toLowerCase().split(" ").length - 1
                      ]
                    }
                    onClick={this.handleAttributes}
                  >
                    {value.name.toLowerCase() === "color" ? "" : items.value}
                  </AttributeItems>
                ))}
              </AttributeList>
            </div>
          ))}
        </div>
        </ContentDetails>
        <QuantityController>
          <PlusMinusButtomWrapper>
            <Plus
              id="plus"
              value={element.id}
              onClick={({ target }) => handleQuantity(target)}
              className="plus"
              >
              +
            </Plus>
            <Quantity>{element.quantity}</Quantity>
            <Minus
              id="minus"
              value={element.id}
              onClick={({ target }) => handleQuantity(target)}
              className="minus"
              >
              -
            </Minus>
          </PlusMinusButtomWrapper>
        <ImageChangerWrapper>
          <Image name={element.gallery[0]} />
          <ImageChangerBack src={ backButton } alt="Previous" />
          <ImageChangerForward src={ forwardButton } alt="Next" />
        </ImageChangerWrapper>
        </QuantityController>
      </>
    );
  }
}

const ImageChangerWrapper = styledComponents.div`
  display: flex;
  position: relative;
  bottom: 0;
`
const ImageChangerBack = styledComponents.img`
  bottom: 10px;
  cursor: pointer;
  margin: 2px;
  position: absolute;
  right: 40px;
`
const ImageChangerForward = styledComponents.img`
  bottom: 10px;
  cursor: pointer;
  margin: 2px;
  position: absolute;
  right: 10px;
`

const PlusMinusButtomWrapper = styledComponents.div`
  margin: 0px 20px ; 
  height: 100%;
`

const ContentDetails = styledComponents.section`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 200px;
`;

const Name = styledComponents.p`
  align-items: center;
  color: #1D1F22;
  display: flex;
  font-family: 'Raleway';
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  height: 27px;
  left: 101px;
  line-height: 27px;
  top: 280px;
`;

const Brand = styledComponents.p`
  font-weight: 400;
  font-size: 30px;
  line-height: 27px;
  width: 100%;
`;

const Price = styledComponents.p`
  align-items: center;
  color: #1D1F22;
  display: flex;
  font-family: 'Raleway';
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  height: 24px;
  left: 100px;
  line-height: 24px;
  top: 370px;
  width: 100%;
`;

const AttributeItems = styledComponents.div`
  align-items: center;
  background: #FFFFFF;
  border: 1px solid #1D1F22;
  cursor: pointer;
  display: flex;
  height: 45px;
  justify-content: center;
  left: 0px;
  margin: 10px;
  top: 0px;
  width: 63px;

  ${(props) => {
    switch (props.id) {
      case "color":
        return css`
          height: 36px;
          width: 36px;
        `;
      default:
        return css`
          height: 42px;
          width: 52px;
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

const AttributeTit = styledComponents.div`
  align-items: center;
  color: #1D1F22;
  display: flex;
  flex: none;
  flex-grow: 0;
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-size: 18px;
  font-weight: 700;
  height: 18px;
  line-height: 18px;
  text-align: center;
`;

const QuantityController = styledComponents.div`
  align-items: center;
  display: flex;
  height: 100%;
  width: 300px; 
`;

const Plus = styledComponents.button`
  align-items: center;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  font-size: 30px;
  display: flex;
  height: 45px;
  justify-content: center;
  margin-top: 20px;
  width: 45px;
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
  font-size: 24px;
  justify-content: center;
  left: 33.33%;
  line-height: 160%;
  margin: 80px 0px;
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
  font-size: 30px;
  display: flex;
  height: 45px;
  justify-content: center;
  width: 45px;
	outline: inherit;
`;

const Image = styledComponents.div`
  height: 300px;
  position: relative;
  width: 200px;

  ${(props) => {
    return css`
      background-image: url(${props.name});
      background-size: 100% 100%;
    `;
  }}
`;

CardList.contextType = CommerceContext;
export default CardList;