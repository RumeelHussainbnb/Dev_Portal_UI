import dynamic from 'next/dynamic';
import { useState, useId, useRef } from 'react';
import { useRouter } from 'next/router';

// import Image from 'next/image';
import Select from 'react-select';
import { Container } from '../../../../components/layout';
import { Country, State, City } from 'country-state-city';
const Spinner = dynamic(() => import('../../../../components/spinner'));

import axios from '../../../../utils/http';

const NotificationSuccess = dynamic(() => import('../../../../components/notifications/success'));
const NotificationError = dynamic(() => import('../../../../components/notifications/error'));

const MvpForm = ({ router }) => {
  const inputFile = useRef(null);
  const routerData = router.query;
  const [data, setData] = useState({
    firstName: routerData.FirstName,
    lastName: routerData.LastName,
    country: { label: routerData.Country, name: routerData.Country },
    state: { label: routerData.State, name: routerData.State },
    city: routerData.City,
    martian: { label: routerData.MartianType, name: routerData.MartianType },
    language: routerData.Languages,
    expertise: routerData.Expertise,
    bioGraphy: routerData.BioGraphy
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [notifyError, setNotifyError] = useState(false);
  const [imageURL, setImageURl] = useState(routerData?.ImageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const updateMvp = async event => {
    event.preventDefault();
    // console.log('data => ', data);
    let parms = {
      id: routerData._id,
      ImageUrl: data.imageUrl,
      FirstName: data.firstName,
      LastName: data.lastName,
      Expertise: data.expertise,
      MartianType: data.martian.value,
      Country: data.country.label,
      City: data.city,
      Languages: data.language,
      BioGraphy: data.bioGraphy
    };
    try {
      const response = await axios.put(`/martian`, parms);
      if (response?.data?.success === true) {
        //Empty editor state
        setData({
          firstName: '',
          lastName: '',
          country: { label: '', name: '' },
          state: { label: '', name: '' },
          city: '',
          martian: { label: '', name: '' },
          language: '',
          expertise: '',
          bioGraphy: ''
        });
        setNotifySuccess(true);
        setTimeout(() => {
          router.back();
        }, '1500');
      }
    } catch (error) {
      //Empty editor state
      setData({
        firstName: '',
        lastName: '',
        country: { label: '', name: '' },
        state: { label: '', name: '' },
        city: '',
        martian: { label: '', name: '' },
        language: '',
        expertise: '',
        bioGraphy: ''
      });

      setNotifyError(true);
    }
  };

  const martianOptions = [
    {
      label: 'Comunity Martian',
      value: 'Comunity Martian'
    },

    {
      label: 'Tech Martian',
      value: 'Tech Martian'
    },

    {
      label: 'Student Ambassador',
      value: 'Student Ambassador'
    }
  ];

  const countries = Country.getAllCountries();

  const updatedCountries = countries.map(country => ({
    label: country.name,
    value: country.name
  }));

  const updatedStates = country => {
    let states = State.getStatesOfCountry(country.isoCode).map(state => ({
      label: state.name,
      value: state.id,
      ...state
    }));
    setStates(states);
  };

  const updatedCities = stateObject => {
    let latestCities = City.getCitiesOfState(data.country.isoCode, stateObject.isoCode).map(
      city => ({
        label: city.name,
        value: city.id,
        ...city
      })
    );
    setCities(latestCities);
  };

  const onIconClick = () => {
    inputFile.current.click();
  };
  const handleFileUpload = async e => {
    setIsLoading(true);

    let allowedExtensions = ['jpg', 'jpeg', 'png'];
    const { files } = e.target;

    if (files && files.length) {
      const filename = files[0].name;
      const firstFile = files[0];
      let parts = filename.split('.');
      const fileType = parts[parts.length - 1];

      //sucess
      if (allowedExtensions.includes(fileType)) {
        const response = await axios.get(`/martian/s3Url`);

        const imageResponse = await fetch(response.data.url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          body: firstFile
        });

        const imageUrl = response.data.url.split('?')[0];
        setImageURl(imageUrl);
        setData({ ...data, imageUrl: imageUrl });
      } else {
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="px-6">
      <main className="mx-auto mb-5 max-w-6xl shadow">
        <div className="relative overflow-hidden bg-white py-16 px-4 dark:bg-gray-800 sm:px-6 lg:px-8 lg:py-14">
          <div className=" mx-auto max-w-3xl">
            <div className="prose prose mx-auto max-w-max text-center prose-h1:mb-2 prose-p:text-lg dark:prose-invert">
              <h1>UPDATE MARTIAN</h1>
            </div>

            <div className="mx-auto mt-10 h-24 w-28 text-center" onClick={onIconClick}>
              <input
                style={{ display: 'none' }}
                // accept=".zip,.rar"
                ref={inputFile}
                onChange={handleFileUpload}
                type="file"
              />
              <div className="relative w-28">
                <div className="col-span-12 sm:col-span-4 lg:col-span-10">
                  {isLoading ? (
                    <Spinner />
                  ) : imageURL ? (
                    <img className="absolute h-28 w-28 rounded-full" src={imageURL} alt="" />
                  ) : (
                    <img
                      className="absolute h-28 w-28 rounded-full"
                      src="/martianImage.png"
                      alt=""
                    />
                  )}

                  {!isLoading && (
                    <div className="group absolute flex h-28 w-28 cursor-pointer items-center justify-center rounded-full opacity-60 transition duration-500 hover:bg-gray-200">
                      <img className="hidden w-5 group-hover:block" src="/upload.svg" alt="" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-12">
              <form
                action="#"
                method="POST"
                className="grid grid-cols-8 gap-y-8 gap-x-20"
                onSubmit={updateMvp}
              >
                <div className="col-span-12 sm:col-span-4 lg:col-span-5">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    First Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      value={data.firstName}
                      autoComplete="given-name"
                      onChange={e => setData({ ...data, firstName: e.target.value })}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                    />
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-4 lg:col-span-5">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Last Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      value={data.lastName}
                      autoComplete="given-name"
                      onChange={e => setData({ ...data, lastName: e.target.value })}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                    />
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-4 lg:col-span-5">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Country
                  </label>
                  <div className="mt-1">
                    <Select
                      placeholder="Select a country"
                      instanceId={useId()}
                      name="country"
                      label="country"
                      classNames={{
                        control: state =>
                          'py-1.5 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',
                        option: state =>
                          state.isSelected
                            ? ' dark:bg-gray-400 bg-white dark:text-gray-800 '
                            : 'bg-white'
                      }}
                      options={updatedCountries}
                      value={data.country.label ? data.country : ''}
                      onChange={countryObject => {
                        setData({
                          ...data,
                          country: countryObject
                          // state: { label: '', name: '' },
                          // city: { label: '', name: '' }
                        });
                        updatedStates(countryObject);
                      }}
                    />
                  </div>
                </div>
                {/* <div className="col-span-12 sm:col-span-4 lg:col-span-5">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    State
                  </label>
                  <div className="mt-1">
                    <Select
                      placeholder="Select a state"
                      instanceId={useId()}
                      name="state"
                      label="state"
                      classNames={{
                        control: state =>
                          'py-1.5 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',
                        option: state =>
                          'dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500'
                      }}
                      options={states}
                      value={data.state.label ? data.state : ''}
                      onChange={stateObject => {
                        setData({ ...data, state: stateObject, city: { label: '', name: '' } });
                        updatedCities(stateObject);
                      }}
                    />
                  </div>
                </div> */}

                <div className="col-span-12 sm:col-span-4 lg:col-span-5">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="city-name"
                      id="city-name"
                      value={data.city}
                      autoComplete="given-name"
                      onChange={e => setData({ ...data, city: e.target.value })}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                    />
                    {/* <Select
                      placeholder="Select a city"
                      instanceId={useId()}
                      name="city"
                      label="city"
                      classNames={{
                        control: state =>
                          'py-1.5  dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',
                        option: state =>
                          'dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500'
                      }}
                      options={cities}
                      value={data.city.label ? data.city : ''}
                      onChange={cityObject => {
                        setData({ ...data, city: cityObject });
                      }}
                    /> */}
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-4 lg:col-span-5">
                  <label
                    htmlFor="martian"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Martian
                  </label>
                  <div className="mt-1">
                    <Select
                      placeholder="Select a martian"
                      instanceId={useId()}
                      name="martian"
                      label="martian"
                      classNames={{
                        control: state =>
                          'py-1.5 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',
                        option: state =>
                          state.isSelected
                            ? ' dark:bg-gray-400 bg-white dark:text-gray-800 '
                            : 'bg-white'
                      }}
                      options={martianOptions}
                      value={data.martian.label ? data.martian : ''}
                      onChange={martianObject => {
                        setData({
                          ...data,
                          martian: martianObject
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-4 lg:col-span-5">
                  <label
                    htmlFor="language"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Language
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="language"
                      id="language"
                      value={data.language}
                      autoComplete="given-name"
                      onChange={e => setData({ ...data, language: e.target.value })}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                    />
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-4 lg:col-span-10">
                  <label
                    htmlFor="expertise"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Expertise
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="expertise"
                      name="expertise"
                      required
                      rows={2}
                      value={data.expertise}
                      onChange={e => setData({ ...data, expertise: e.target.value })}
                      className="block w-full rounded-md border border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                    />
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-4 lg:col-span-10">
                  <label
                    htmlFor="biography"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    BioGraphy
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="biography"
                      name="biography"
                      required
                      rows={2}
                      value={data.bioGraphy}
                      onChange={e => setData({ ...data, bioGraphy: e.target.value })}
                      className="block w-full rounded-md border border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                    />
                  </div>
                </div>

                <div className="mx-auto flex max-w-3xl justify-end">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-yellow-600 py-3 px-16 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:text-gray-200"
                  >
                    {' '}
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <NotificationError
        show={notifyError}
        setShow={setNotifyError}
        text="Posting Failed"
        subText="Please try again"
      />

      <NotificationSuccess
        show={notifySuccess}
        setShow={setNotifySuccess}
        text="Successfully posted!"
        subText="Thank you"
      />
    </div>
  );
};

export default function UpdateMartians({}) {
  const metaTags = {
    title: 'BNB Chain - Library Admin Martians',
    description: 'Library Admin Martians',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/mvp/update`,
    shouldIndex: false
  };
  const router = useRouter();

  return (
    <Container metaTags={metaTags}>
      <MvpForm router={router} />
    </Container>
  );
}
