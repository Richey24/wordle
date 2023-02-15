import gold from '../img/gold-medal.png';
import tribe from '../img/asher.png';
import silver from '../img/silver-medal.png'
import bronze from '../img/bronze-medal.png'
import { findFlagUrlByCountryName} from "country-flags-svg";

const flagUrl = findFlagUrlByCountryName("jamaica");


export default function TheLeaderboard(props) {
    const  style = { background: `linear-gradient(to left, #F55507 0%, #EB3E12 100%)`, };

    return <div className="min-h-screen">
        <video style={{ zIndex: -1 }} className="absolute w-auto min-w-full min-h-full max-w-none" src={`https://absa7kzimnaf.blob.core.windows.net/newcontainer/${props.bground}`} autoPlay muted loop id='thevid' />
        <section class=" text-center"  >
            <div class="" style={{ zIndex: 2 }}>
                <header class="px-5 py-4 border-b border-gray-100">
                    <h2 class="font-semibold text-white	 ">Bible Crossword Puzzle Daily Leaderboard</h2>
                </header>
                <div class="p-3">
                    <div style={{ width: "97vw", margin: "0px" }} class="overflow-x-auto">
                        <table class="table-auto w-full">
                            <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th class="p-2 whitespace-nowrap">
                                        <div style={{ fontSize: "25px" }} class="font-semibold text-left">Username</div>
                                    </th>
                                    <th class="p-2 whitespace-nowrap">
                                        <div style={{ fontSize: "25px" }} class="font-semibold text-left">Tribes</div>
                                    </th>
                                    <th class="p-2 whitespace-nowrap">
                                        <div style={{ fontSize: "25px" }} class="font-semibold text-left">School Affiliation</div>
                                    </th>
                                    <th class="p-2 whitespace-nowrap">
                                        <div style={{ fontSize: "25px" }} class="font-semibold text-left">Country</div>
                                    </th>
                                    <th class="p-2 whitespace-nowrap">
                                        <div style={{ fontSize: "25px" }} class="font-semibold text-left">Levels</div>
                                    </th>
                                    <th class="p-2 whitespace-nowrap">
                                        <div style={{ fontSize: "25px" }} class="font-semibold text-left">Scores</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="text-sm divide-y divide-gray-100">
                                
                            { props.users.map(
                                (data, key) => {
                                    return (
                                        <tr>
                                            <td class="p-2 whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <div style={{ fontSize: "25px" }} class="text-secondary font-bold ">{data.user.username}</div>
                                                </div>
                                            </td>
                                            <td class="p-2 whitespace-nowrap">
                                                <img class="rounded-full" src={tribe} width="100" height="100" alt="Asher" />
                                            </td>
                                            <td class="p-2 whitespace-nowrap">
                                                <div style={{ fontSize: "25px" }} class="text-left text-secondary font-bold ">{data.user.church}</div>
                                            </td>
        
                                            <td class="p-2 whitespace-nowrap">
                                                <img class="w-20 h-20 rounded" src={data.user.country[1]} alt="Large avatar" />
                                            </td>
                                            <td class="p-2 whitespace-nowrap">
                                                <div id="level" style={style} >Level {data.game_level}</div>
                                                {/* <div class="text-left text-red-500 font-bold">{data.game_level}</div> */}
                                            </td>
                                            <td class="p-2 whitespace-nowrap">
                                                <div id="level" style={style} >{data.score}</div>
                                            </td>
                                        </tr>
                                    );
                                }
                              )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    </div>
}

