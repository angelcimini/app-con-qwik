import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { apiService } from "~/api/fetch-data";
import type { Character } from "~/models/character";

export default component$(()=> {
    const location = useLocation();
    const id = location.params.id;
    const useResource = useResource$(()=> apiService(id));
    const navigate = useNavigate();

    return (
        <Resource
            value={useResource}
            onPending={()=> <p>Loading...</p>}
            onResolved={(character: Character) => {
                return (
                    <>
                        <button onClick$={()=>(navigate('/'))}>
                            Back
                        </button>
                        <div class="card-details">
                            <div class="details"> 
                                <img src={character.image} alt={character.name} class='img-character' />
                                <div class="container-details">
                                    <h4> {character.name} </h4>
                                    <p> {character.status} - {character.gender} </p>
                                    <p> Specie: {character.species} </p>
                                </div>
                            </div>
                        </div>
                    </>
                );
            }}
        />
    );
})