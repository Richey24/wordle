import gold from '../img/gold-medal.png';
import tribe from '../img/asher.png';
import silver from '../img/silver-medal.png'
import bronze from '../img/bronze-medal.png'
// import bground from 'videos/test.mp4';


export default function TheLeaderboard(props){
    return <div className="min-h-screen">
        <video  style={{ zIndex: -1 }} className="absolute w-auto min-w-full min-h-full max-w-none" src="/videos/test.mp4" autoPlay muted loop id='thevid' />
        <section class="container mx-auto px-6 py-16 text-center"  >
            <div class="mx-auto max-w-lg" style={{ zIndex: 2 }}>
                    <header class="px-5 py-4 border-b border-gray-100">
                        <h2 class="font-semibold text-white	 ">Bible Crossword Puzzle Daily Leaderboard</h2>
                    </header>
                    <div class="p-3">
                        <div class="overflow-x-auto">
                            <table class="table-auto w-full">
                                <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                    <tr>
                                        <th class="p-2 whitespace-nowrap">
                                            <div class="font-semibold text-left">Names</div>
                                        </th>
                                        <th class="p-2 whitespace-nowrap">
                                            <div class="font-semibold text-left">Emails</div>
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
                                                <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                    <img class="rounded-full" src={gold} width="40" height="40" alt="Alex Shatov" />
                                                    </div>
                                                <div class="font-medium text-white font-bold ">Alex Shatov</div>
                                            </div>
                                        </td>
                                        <td class="p-2 whitespace-nowrap">
                                            <div class="text-left text-white font-bold ">alexshatov@gmail.com</div>
                                        </td>
                                        <td class="p-2 whitespace-nowrap">
                                        <img class="rounded-full" src={tribe} width="40" height="40" alt="Asher" />
                                        </td>
                                        <td class="p-2 whitespace-nowrap">
                                            <div class="text-left font-medium text-green-500">1000</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="p-2 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                    <img class="rounded-full" src={silver} width="40" height="40" alt="Alex Shatov" />
                                                    </div>
                                                <div class="font-medium text-white font-bold ">Ainz Gown</div>
                                            </div>
                                        </td>
                                        <td class="p-2 whitespace-nowrap">
                                            <div class="text-left text-white font-bold">aisha1234@gmail.com</div>
                                        </td>
                                        <td class="p-2 whitespace-nowrap">
                                        <img class="rounded-full" src={tribe} width="40" height="40" alt="Asher" />
                                        </td>

                                        <td class="p-2 whitespace-nowrap">
                                            <div class="text-left font-medium text-green-500">800</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="p-2 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                    <img class="rounded-full" src={bronze} width="40" height="40" alt="Alex Shatov" />
                                                    </div>
                                                <div class="font-medium text-white font-bold ">James Gordon</div>
                                            </div>
                                        </td>
                                        <td class="p-2 whitespace-nowrap">
                                            <div class="text-left text-white font-bold">jamsesg@gmail.com</div>
                                        </td>
                                        <td class="p-2 whitespace-nowrap">
                                        <img class="rounded-full" src={tribe} width="40" height="40" alt="Asher" />
                                        </td>

                                        <td class="p-2 whitespace-nowrap">
                                            <div class="text-left font-medium text-green-500">700</div>
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
