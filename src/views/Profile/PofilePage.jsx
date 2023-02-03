import Header from '../../components/TheHeader.jsx';
export default function ProfilePage() {
    return (
     <div className="absolute w-auto min-w-full min-h-full max-w-none">
      <Header />
            <div className="container mx-auto px-6 py-16">
               <div className="mx-auto ">
                   
                    <div className="lg:flex lg:items-center lg:justify-between">
                        <div className="min-w-0 flex-1">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            Profile  Settings
                            </h2>
                        </div>
                        <ol class="inline-flex items-center space-x-1 md:space-x-3">
                            <li class="inline-flex items-center">
                                <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                    <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    Home
                                </a>
                            </li>

                            <li>
                                <div class="flex items-center">
                                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Profile Settings</a>
                                </div>
                            </li>
                        </ol>
                    </div>

                   <div className="grid grid-cols-4 gap-4">
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                <fieldset>
                                <legend className="sr-only">Settings</legend>
                                <div className="text-base font-medium text-dark" aria-hidden="true">
                                    Settings
                                </div>
                                <div className="mt-4 space-y-4">
                                    <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                      
                                        <div class="flex flex-col pb-3">
                                            <dt class="mb-1 md:text-lg text-dark">Profile Informations</dt>
                                        </div>
                                        
                                        <div class="flex flex-col py-3">
                                            <dt class="mb-1 md:text-lg text-dark">Security </dt>
                                        </div>
                                      
                                        <div class="flex flex-col py-3">
                                            <dt class="mb-1 text-dark md:text-lg">Notifications</dt>
                                        </div>

                                        <div class="flex flex-col py-3">
                                            <dt class="mb-1 text-dark md:text-lg">Billings & Payments</dt>
                                        </div>
                                    </dl>
                                </div>
                                </fieldset>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="md:grid md:grid-cols-6">
                                <div className="md:col-span-12 md:mt-0">
                                    {/* Profile information  */}
                                    <form action="#" method="POST">
                                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

                                            <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                First name
                                                </label>
                                                <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Last name
                                                </label>
                                                <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-4">
                                                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                Email address
                                                </label>
                                                <input
                                                type="text"
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                Country
                                                </label>
                                                <select
                                                id="country"
                                                name="country"
                                                autoComplete="country-name"
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                >
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>Mexico</option>
                                                </select>
                                            </div>

                                            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                Tribe
                                                </label>
                                                <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                autoComplete="address-level2"
                                                className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3 lg:col-span-2 mt-5">
                                                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                               School
                                                </label>
                                                <input
                                                type="text"
                                                name="region"
                                                id="region"
                                                autoComplete="address-level1"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            </div>
                                        </div>

                                            <div>
                                        
                                        
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                            <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                            Save
                                            </button>
                                        </div>
                                        </div>
                                    </form> 
                                    {/* Profile Infromation */}

                                    {/* Security  */}
                                    <form action="#">
                                       <div className="shadow sm:overflow-hidden sm:rounded-md">
                                            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                                <div className="bg-white px-4 py-5 sm:p-6">
                                                    <div className="grid grid-cols-6 gap-6">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    {/* End Security */}
                                </div>
                            </div>
                        <div>
                     
                   </div>       

                        </div>
                    </div>  

                </div>
            </div>
      </div>
    )
  }



