import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useState, useId, useRef, useEffect } from 'react';

import Image from 'next/image';
import Select from 'react-select';
import { Country } from 'country-state-city';
import { http } from '../../../../utils/http';
import { Container } from '../../../../components/layout';
import Loader from '../../../../components/Loader/Loader';

const MvpForm = () => {
  const router = useRouter();
  const inputFile = useRef(null);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    publicKey: '',
    country: { label: '', name: '' },
    state: { label: '', name: '' },
    city: '',
    martian: { label: '', name: '' },
    imageUrl: '',
    language: '',
    skills: [],
    bioGraphy: ''
  });
  const [imageURL, setImageURl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isPublicKeyError, setIsPublicKeyError] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [disableFields, setDisableFields] = useState(true);
  const [isMartian, setIsMartian] = useState(true);
  const [selectedFile, setSelectedFile] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setImageURl(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile[0]);
    setImageURl(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const getDataByPublicKey = event => {
    event.preventDefault();
    let isError = data?.publicKey?.trim() == '' ? true : false;
    setIsPublicKeyError(isError);
    if (!isError) {
      http
        .get(`/user/${data.publicKey}`)
        .then(response => {
          if (response.data) {
            setData({
              ...response.data,
              firstName: response.data?.FirstName,
              lastName: response.data?.LastName,

              email: response.data?.Email,
              publicKey: response.data?.PublicKey,
              country: { label: response.data?.Country, name: response.data?.Country },
              martianId: response.data?.MartianId || null,
              city: response.data?.City,
              martian: { label: response.data?.MartianType, name: response.data?.MartianType },
              imageUrl: response.data?.ProfilePicture,
              language: response.data?.Languages,
              skills: response.data?.Skills?.map(d => {
                return { label: d, value: d };
              }),
              bioGraphy: response.data?.Bio,
              roles: response.data?.Roles
            });
            setImageURl(response.data?.ProfilePicture);
            if (response.data?.MartianType) {
              setIsMartian(true);
              setDisableFields(true);
              toast.info('Martian Already Exist!');
            } else {
              setIsMartian(false);
              setDisableFields(true);
              toast.info('User Data Successfully Fetched!');
            }

            setIsNewUser(false);
          } else {
            setData({
              ...data,
              firstName: '',
              lastName: '',
              email: '',
              //publicKey: '',
              country: { label: '', name: '' },
              state: { label: '', name: '' },
              city: '',
              martian: { label: '', name: '' },
              imageUrl: '',
              language: '',
              skills: [],
              bioGraphy: ''
            });
            setImageURl();
            toast.info('No data found against public key');

            setIsNewUser(true);
            setDisableFields(false);
            setIsMartian(false);
          }
        })
        .catch(err => {
          toast.error('Error Occured!');

          setDisableFields(false);
        });
    }
  };
  const createMartian = async event => {
    event.preventDefault();
    setIsLoading(true);
    const imageUrl = await handleFileUpload();

    let parms = {};
    if (data?.roles?.indexOf('Martian') === -1) {
      data?.roles?.push('Martian');
    }
    let roles = data?.roles;
    try {
      //create case
      if (isNewUser) {
        parms = {
          ImageUrl: imageUrl,
          FirstName: data.firstName.trim(),
          LastName: data.lastName.trim(),
          Email: data.email,
          PublicKey: data.publicKey.toLowerCase(),
          Expertise: data.skills?.map(skills => skills?.label),
          MartianType: data.martian.label,
          Country: data.country.label,
          City: data.city,
          Languages: data.language,
          BioGraphy: data.bioGraphy,
          Roles: ['User', 'Martian']
        };
        const response = await http.post(`/user/createUser`, parms);
        if (response?.data?.success === true) {
          //Empty editor state
          setData({
            firstName: '',
            lastName: '',
            email: '',
            publicKey: '',
            country: { label: '', name: '' },
            state: { label: '', name: '' },
            city: '',
            martian: { label: '', name: '' },
            language: '',
            skills: [],
            bioGraphy: ''
          });
          setImageURl();
          toast.success('Successfully posted!');
          setDisableFields(false);
        }
      }
      //update Case
      else {
        parms = {
          ...data,
          ProfilePicture: data.imageUrl,
          FirstName: data.firstName,
          LastName: data.lastName,
          Email: data.email,
          PublicKey: data.publicKey.toLowerCase(),
          Skills: data.skills?.map(skills => skills?.label),
          MartianType: data.martian.label,
          Country: data.country.label,
          City: data.city,
          Languages: data.language,
          Bio: data.bioGraphy,
          Roles: roles
        };
        const response = await http.put(`/user/updateUserProfile/${data._id}`, parms);
        if (response?.data?.success === true) {
          //Empty editor state
          setData({
            firstName: '',
            lastName: '',
            email: '',
            publicKey: '',
            country: { label: '', name: '' },
            state: { label: '', name: '' },
            city: '',
            martian: { label: '', name: '' },
            language: '',
            skills: [],
            bioGraphy: ''
          });
          setImageURl('');
          toast.success('Successfully created!');
          setDisableFields(false);
        }
      }
    } catch (error) {
      //Empty editor state
      setData({
        firstName: '',
        lastName: '',
        email: '',
        publicKey: '',
        country: { label: '', name: '' },
        state: { label: '', name: '' },
        city: '',
        martian: { label: '', name: '' },
        language: '',
        skills: [],
        bioGraphy: ''
      });
      setImageURl('');
      toast.error('Posting Failed!');

      setDisableFields(false);
    }
    setIsLoading(false);
  };

  const martianOptions = [
    {
      label: 'Community Martian',
      value: 'Community Martian'
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

  const SkillsOptions = [
    {
      label: 'Node.JS',
      value: 'Node.JS'
    },
    {
      label: 'BlockChain',
      value: 'BlockChain'
    },
    {
      label: 'Java',
      value: 'Java'
    },
    {
      label: 'JavaScript',
      value: 'JavaScript'
    },
    {
      label: 'Python',
      value: 'Python'
    },
    {
      label: '.NET',
      value: '.NET'
    }
  ];

  const countries = Country.getAllCountries();

  const updatedCountries = countries.map(country => ({
    label: country.name,
    value: country.name
  }));

  const onIconClick = () => {
    inputFile.current.click();
  };
  const handleFileUpload = async e => {
    //file Validation Extentions

    if (selectedFile && selectedFile.length) {
      const filename = selectedFile[0].name;
      const firstFile = selectedFile[0];
      let parts = filename.split('.');
      const fileType = parts[parts.length - 1];

      const response = await http.get(`/martian/s3Url`);
      const imageResponse = await fetch(response.data.url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: firstFile
      });

      return response.data.url.split('?')[0];
      //setImageURl(imageUrl);
      //setData({ ...data, imageUrl: imageUrl });
    }
  };
  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    let allowedExtensions = ['jpg', 'jpeg', 'png'];
    const filename = e.target.files[0].name;

    let parts = filename.split('.');
    const fileType = parts[parts.length - 1];
    //sucess
    if (allowedExtensions.includes(fileType)) {
      // I've kept this example simple by using the first image instead of multiple
      setSelectedFile(e.target.files);
    } else {
      //through image type error
      toast.info('Invalid Image Type. [Supported jpg, jpeg, png]');
    }
  };

  //* styling of multiSelect
  const colourStyles = {
    control: (css, state) => ({
      ...css,
      ...(state.isDisabled && {
        pointerEvents: 'auto',
        cursor: 'not-allowed'
      })
    }),
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: '#FACC15'
      };
    },

    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: '#FF0000',
      ':hover': {
        backgroundColor: '#FF0000',
        color: 'white'
      }
    })
  };

  const styles = {
    control: (css, state) => ({
      ...css,
      ...(state.isDisabled && {
        pointerEvents: 'auto',
        cursor: 'not-allowed'
      })
    })
  };

  return (
    <div className="add-martian-wrapper">
      <main className="mx-auto mb-5 shadow">
        {isLoading && <Loader />}
        <div className="relative overflow-hidden bg-white py-8 px-2 dark:bg-gray-800 sm:px-2 lg:px-6 lg:py-10">
          <div className=" mx-auto">
            <div className="prose prose mx-auto max-w-max text-center prose-h1:mb-2 prose-p:text-lg dark:prose-invert">
              <h2>ADD MARTIAN</h2>
            </div>

            <div className="mx-auto mt-10 h-24 w-28 text-center" onClick={onIconClick}>
              <input
                className={`${disableFields ? 'cursor-not-allowed' : ''}`}
                disabled={disableFields}
                style={{ display: 'none' }}
                // accept=".zip,.rar"
                ref={inputFile}
                onChange={onSelectFile}
                type="file"
              />
              <div className="relative w-28">
                <div className="col-span-12 sm:col-span-4 lg:col-span-10">
                  {imageURL ? (
                    <div className="absolute h-28 w-28 rounded-full">
                      <Image src={imageURL} alt="" height={'112px '} width={'112px '} />
                    </div>
                  ) : (
                    <div className="absolute h-28 w-28 rounded-full">
                      <Image src="/martianImage.png" alt="" height={'112px '} width={'112px '} />
                    </div>
                  )}

                  <div className="group absolute flex h-28 w-28 cursor-pointer items-center justify-center rounded-full opacity-60 transition duration-500 hover:bg-gray-200">
                    <div className="hidden w-5 group-hover:block">
                      <Image src="/upload.svg" alt="" height={'112px '} width={'112px '} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <form
                action="#"
                method="POST"
                className="grid grid-cols-8 gap-y-8 gap-x-20"
                onSubmit={createMartian}
              >
                <div className="col-span-12 sm:col-span-4 lg:col-span-10">
                  <div className="public-key mt-1">
                    <input
                      id="publicKey"
                      name="publicKey"
                      required
                      value={data.publicKey}
                      onChange={e => {
                        setData({ ...data, publicKey: e.target.value.toLowerCase() });
                        let isError = e.target.value.trim() == '' ? true : false;
                        setIsPublicKeyError(isError);
                      }}
                      className="block w-full rounded-md border border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                    />
                    <button
                      onClick={getDataByPublicKey}
                      className="rounded-lg border border-yellow-700 bg-yellow-700 text-sm font-medium text-white hover:bg-yellow-800 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                      <span className="sr-only">Search</span>
                    </button>
                    {isPublicKeyError && (
                      <span className="absolute text-red-700">Please Add public key</span>
                    )}
                  </div>
                </div>
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
                      disabled={disableFields}
                      required
                      name="first-name"
                      id="first-name"
                      value={data.firstName}
                      autoComplete="given-name"
                      onChange={e => setData({ ...data, firstName: e.target.value })}
                      className={`block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 ${
                        disableFields ? 'cursor-not-allowed' : ''
                      }`}
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
                      required
                      disabled={disableFields}
                      name="last-name"
                      id="last-name"
                      value={data.lastName}
                      autoComplete="given-name"
                      onChange={e => setData({ ...data, lastName: e.target.value })}
                      className={`block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 ${
                        disableFields ? 'cursor-not-allowed' : ''
                      }`}
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
                      isDisabled={disableFields}
                      instanceId={useId()}
                      required
                      name="country"
                      label="country"
                      styles={styles}
                      classNames={{
                        singleValue: state =>
                          state.isDisabled ? 'dark:text-gray-800 text-gray-800' : '',
                        control: state =>
                          'py-1.5 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',

                        option: state =>
                          state.isSelected
                            ? ' dark:bg-gray-400 bg-white dark:text-gray-800 '
                            : 'bg-white select-value'
                      }}
                      options={updatedCountries}
                      value={data.country.label ? data.country : ''}
                      onChange={countryObject => {
                        setData({
                          ...data,
                          country: countryObject
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-4 lg:col-span-5">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      disabled={disableFields}
                      type="text"
                      required
                      name="city-name"
                      id="city-name"
                      value={data.city}
                      autoComplete="given-name"
                      onChange={e => setData({ ...data, city: e.target.value })}
                      className={`block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 ${
                        disableFields ? 'cursor-not-allowed' : ''
                      }`}
                    />
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
                      isDisabled={disableFields && isMartian}
                      placeholder="Select a martian"
                      required
                      instanceId={useId()}
                      name="martian"
                      label="martian"
                      styles={styles}
                      classNames={{
                        singleValue: state =>
                          state.isDisabled ? 'dark:text-gray-800 text-gray-800' : '',
                        control: state =>
                          'py-1.5 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',
                        option: state =>
                          state.isSelected
                            ? ' dark:bg-gray-400 bg-white dark:text-gray-800 '
                            : 'bg-white select-value'
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
                      disabled={disableFields}
                      type="text"
                      required
                      name="language"
                      id="language"
                      value={data.language}
                      autoComplete="given-name"
                      onChange={e => setData({ ...data, language: e.target.value })}
                      className={`block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 ${
                        disableFields ? 'cursor-not-allowed' : ''
                      }`}
                    />
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-4 lg:col-span-10">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      disabled={disableFields}
                      id="email"
                      name="email"
                      required
                      type="email"
                      value={data.email}
                      onChange={e => setData({ ...data, email: e.target.value })}
                      className={`block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 ${
                        disableFields ? 'cursor-not-allowed' : ''
                      }`}
                    />
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-4 lg:col-span-10">
                  <label
                    htmlFor="Skills"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Skills
                  </label>
                  <div className="mt-1">
                    <Select
                      closeMenuOnSelect={false}
                      classNames={{
                        singleValue: state =>
                          state.isDisabled ? 'dark:text-gray-800 text-gray-800' : '',
                        control: state =>
                          'py-1.5 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',
                        option: state =>
                          state.isSelected
                            ? ' dark:bg-gray-400 bg-white dark:text-gray-800 '
                            : 'bg-white select-value'
                      }}
                      isMulti
                      value={data.skills}
                      options={SkillsOptions}
                      isDisabled={disableFields}
                      placeholder="Select skills"
                      onChange={skillArray => {
                        setData({
                          ...data,
                          skills: skillArray
                        });
                      }}
                      styles={colourStyles}
                    />
                    {/* <textarea
                      disabled={disableFields}
                      id="expertise"
                      name="expertise"
                      required
                      rows={2}
                      value={data.expertise}
                      onChange={e => setData({ ...data, expertise: e.target.value })}
                      className="block w-full rounded-md border border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                    /> */}
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
                      disabled={disableFields}
                      id="biography"
                      name="biography"
                      rows={2}
                      value={data.bioGraphy}
                      onChange={e => setData({ ...data, bioGraphy: e.target.value })}
                      className={`block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 ${
                        disableFields ? 'cursor-not-allowed' : ''
                      }`}
                    />
                  </div>
                </div>

                <div className="button-wrapper">
                  <button
                    disabled={disableFields && isMartian}
                    type="submit"
                    >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => router.back()}
                    >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function ContentMartians({}) {
  const metaTags = {
    title: 'BNB Chain - Library Admin Martians',
    description: 'Library Admin Martians',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/martian/create`,
    shouldIndex: false
  };

  return (
    <Container metaTags={metaTags}>
      <MvpForm />
    </Container>
  );
}
