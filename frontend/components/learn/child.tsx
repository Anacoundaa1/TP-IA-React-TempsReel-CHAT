const Child = (props: any) => {


    const clickButton = () =>{
        props.setTime(new Date());
    }

    const clickButton2 = () =>{
        props.setCompteur(props.compteur + 1);
    }

    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure><img src="https://source.unsplash.com/random/200x200?sig=1" alt="Movie"/></figure>
            <div className="card-body">
                <h2 className="card-title">{props.nom} {props.prenom}</h2>
                <p>{props.time?.toISOString()}</p>
                <p>Modifié il y a {props.relativeTime} secondes</p>
                <div className="card-actions justify-end">
                    <button onClick={clickButton} className="btn btn-primary">Watch</button>
                </div>
                <div>
                    <h2>Compteur : {props.compteur}</h2>
                    <button onClick={clickButton2} className="btn btn-primary">Ajout au compteur</button>
                </div>
            </div>
        </div>
    )
}


export default Child;