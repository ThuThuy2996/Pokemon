import React, { useEffect, useState } from 'react'
import './pokemon.css'
import { ViewDetail } from '../interfaces';

interface Props {
    id: number;
    name: string;
    image: string;
    abilities: {
        name: string;
        ability: string;
    }[] | undefined;
    viewDetail: ViewDetail;
    setDetail: React.Dispatch<React.SetStateAction<ViewDetail>>
}

const PokemonList: React.FC<Props> = (props) => {
    const { id, name, image, abilities, viewDetail, setDetail } = props;
    const [isSelected, setSelected] = useState<boolean>(false)
    useEffect(() => {
        setSelected(id === viewDetail?.id);
    }, [viewDetail]);

    const closeDetail = () => {
        setDetail({
            id: 0,
            isOpen: false,
        });
    };
    return (
        <div>
            {isSelected ? (
                <section className="detailed-box">
                    <div className="pokemon-list-detailed" >
                        <div className="detail-container">
                            <p className="detail-close" onClick={closeDetail}>
                                X
                            </p>
                            <div className="detail-info">
                                <img src={image} alt="pokemon" className="detail-img" />
                                <p className="detail-name"> {name}</p>
                            </div>
                            <div className="detail-skill">
                                <p className="detail-ability"> Ablities: </p>
                                {abilities?.map((ab: any) => {
                                    return <div className=""> {ab.ability.name}</div>;
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className={viewDetail.isOpen ? "pokemon-list-container-dis" : "pokemon-list-container"} >
                    <p className="pokemon-name"> {name} </p>
                    <img src={image} alt="pokemon" />
                </section>
            )}
        </div>
    )
}

export default PokemonList