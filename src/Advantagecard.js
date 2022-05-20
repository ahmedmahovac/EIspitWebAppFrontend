const Advantagecard = ({icon, title, description}) => {
    return(
        <div className="dib ba b--light-blue bg-light-blue ma4 pa4 br3 shadow-3 dim grow mw5 ">
            <span className="material-icons">{icon}</span>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}

export default Advantagecard;