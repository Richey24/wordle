import gold from '../img/gold-medal.png';
import tribe from '../img/asher.png';
import silver from '../img/silver-medal.png'
import bronze from '../img/bronze-medal.png'
// import bground from 'videos/test.mp4';


export default function TheLeaderboard(props){
    return <div className="min-h-screen">
         <video  style={{ zIndex: -1 }} className="absolute w-auto min-w-full min-h-full max-w-none" src={`/videos/${props.bground}`} autoPlay muted loop id='thevid' />
        <section class="container mx-auto px-6 py-16 text-center"  >
            <div class="mx-auto max-w-xl" style={{ zIndex: 2 }}>
                    <header class="px-5 py-4 border-b border-gray-100">
                        <h2 class="font-semibold text-white	 ">Bible Crossword Puzzle Daily Leaderboard</h2>
                    </header>
                    <div class="p-3">
                        <div class="overflow-x-auto">
                            <table class="table-auto w-full">
                                <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                    <tr>
                                        <th class="p-2 whitespace-nowrap">
                                            <div class="font-semibold text-left">Name</div>
                                        </th>
                                        <th class="p-2 whitespace-nowrap">
                                            <div class="font-semibold text-left">School Affiliation</div>
                                        </th>
                                        <th class="p-2 whitespace-nowrap">
                                            <div class="font-semibold text-left">Country</div>
                                        </th>
                                        <th class="p-2 whitespace-nowrap">
                                            <div class="font-semibold text-left">Tribes</div>
                                        </th>
                                        <th class="p-2 whitespace-nowrap">
                                            <div class="font-semibold text-left">Scores</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="text-sm divide-y divide-gray-100">
                                    <tr>
                                        <td class="p-2 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <div class="font-medium text-white font-bold ">Alex Shatov</div>
                                            </div>
                                        </td>
                                        <td class="p-2 whitespace-nowrap">
                                            <div class="text-left text-white font-bold ">Schoole Name</div>
                                        </td>

                                        <td class="p-2 whitespace-nowrap">
                                            <div class="text-left text-white font-bold ">Jamaica</div>
                                        </td>
                                        <td class="p-2 whitespace-nowrap">
                                              <img class="rounded-full" src={tribe} width="100" height="100" alt="Asher" />
                                        </td>
                                        <td class="p-2 whitespace-nowrap">
                                            <div class="text-left text-green-500 font-bold">1000</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        </section>
    </div>
}
