const Card = (props) => {
  return <li className={`card ${props.styleName}`}>{props.children}</li>;
};

export default Card;
