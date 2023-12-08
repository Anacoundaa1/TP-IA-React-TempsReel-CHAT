import { useEffect, useState } from 'react';
import Child from './child'

const Parent = () => {


    const [time,setTime] = useState<Date | null>();
    const [relativeTime,setRelativeTime] = useState(0);
    const [compteur,setCompteur] = useState(0);
    const [nbEnfants, setNbEnfants] = useState(1);
    const [tabEnfant,setTabEnfants] = useState<number[]>([]);

    const ajoutEnfant = () =>{
        setNbEnfants(nbEnfants +1);
    }

    const retirerEnfant = () =>{
        setNbEnfants(nbEnfants -1);
    }

    // Utilisez useEffect pour mettre à jour le tableau des enfants lorsque nbEnfants change
    useEffect(() => {
        const newTabEnfants: number[] = Array.from({ length: nbEnfants }).map((_, index) => index);
        setTabEnfants(newTabEnfants);
    }, [nbEnfants]);



    useEffect(() => {
        if(!time){
            return;
        }
        

        setRelativeTime(0);

        const interval = setInterval(() => {
            setRelativeTime(previousTime => previousTime + 1);
          }, 1000);

          return () => {
            clearInterval(interval);
          };

    },[time])

    return (
        <div className='container text-center mx-auto pt-20'>
            <h2 className='mb-10'>Parent</h2>
            <div className='flex justify-around my-10'>
                <button onClick={ajoutEnfant} className="btn btn-primary">+</button>
                <button onClick={retirerEnfant} className="btn btn-secondary">-</button>
            </div>
            {tabEnfant.map((_, index) => (
                <div key={index}>
                    <Child nom={"Nom du childe"} prenom={"Prénom du child"} setTime={setTime} time={time} relativeTime= {relativeTime} compteur={compteur} setCompteur={setCompteur}>
                        <p>OK cava</p>
                    </Child>
                </div>
            ))}
            
        </div>
    )
}


export default Parent
;


